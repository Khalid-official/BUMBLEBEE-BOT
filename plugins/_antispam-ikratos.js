let spamDetection = {}; // Object to store user activity
let adminDecisions = {}; // Object to store admin responses

export async function before(m, { isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe) return true;

    let chat = global.db.data.chats[m.chat];
    let delet = m.key.participant;
    let bang = m.key.id;
    let bot = global.db.data.settings[this.user.jid] || {};
    let user = `@${m.sender.split`@`[0]}`;

    // Initialize user activity if not already present
    if (!spamDetection[m.chat]) spamDetection[m.chat] = {};
    if (!spamDetection[m.chat][m.sender]) spamDetection[m.chat][m.sender] = { count: 0, lastMessageTime: 0 };

    let now = Date.now();
    let userActivity = spamDetection[m.chat][m.sender];

    // Check if the user is spamming
    if (now - userActivity.lastMessageTime < 5000) { // 5000ms = 5 seconds
        userActivity.count += 1;
    } else {
        userActivity.count = 1;
    }

    userActivity.lastMessageTime = now;

    // Handle group chats
    if (m.isGroup) {
        if (userActivity.count > 5) { // Adjust the spam threshold as needed
            if (isBotAdmin) {
                // Notify spammer about temporary removal
                await this.sendMessage(m.chat, { text: `*Ops!*, \n*${user}, SPAM DETECTED!*\n*You will be removed from the group temporarily and re-added after one minute.*`, mentions: [m.sender] });
                
                // Delete the spam message
                await this.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }});
                
                // Kick the spammer
                let response = await this.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
                
                if (response[0].status === "404") return;

                // Prepare to handle admin responses
                adminDecisions[m.chat] = { [m.sender]: null }; // Initialize response tracking for the current chat
                
                // Re-add the spammer after one minute
                setTimeout(async () => {
                    try {
                        await this.groupParticipantsUpdate(m.chat, [m.sender], 'add');
                        
                        // Get the list of admins in the group
                        let groupMetadata = await this.groupMetadata(m.chat);
                        let admins = groupMetadata.participants.filter(participant => participant.isAdmin).map(admin => admin.jid);

                        // Notify all admins about the rejoining spammer
                        if (admins.length > 0) {
                            let adminMentions = admins.map(admin => `@${admin.split('@')[0]}`);
                            let decisionMessage = `*${user} has rejoined the group!*\n*Do you want to keep them in the group or kick them out?*\n\n*Reply with "Yes" to keep them or "No" to kick them.*`;
                            await this.sendMessage(m.chat, { text: decisionMessage, mentions: admins });

                            // Store the pending decision status for admins
                            adminDecisions[m.chat] = adminDecisions[m.chat] || {};
                            admins.forEach(admin => adminDecisions[m.chat][admin] = null);

                            // Wait for admin responses
                            setTimeout(async () => {
                                let decisions = adminDecisions[m.chat];
                                let yesVotes = Object.values(decisions).filter(response => response === 'Yes').length;
                                let noVotes = Object.values(decisions).filter(response => response === 'No').length;

                                if (yesVotes > noVotes) {
                                    await this.sendMessage(m.chat, { text: `*${user} has been allowed to stay in the group.*`, mentions: admins });
                                } else {
                                    await this.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
                                    await this.sendMessage(m.chat, { text: `*${user} has been kicked out of the group.*`, mentions: admins });
                                }
                                // Cleanup
                                delete adminDecisions[m.chat];
                            }, 300000); // 300000ms = 5 minutes
                        }
                    } catch (e) {
                        // If re-adding fails, send a group join invite to the spammer
                        try {
                            await this.sendMessage(m.sender, { text: `You were removed from the group for spamming. Here is the group invite link: [Invite Link]` });
                        } catch (e) {
                            console.error('Failed to send invite link:', e);
                        }
                    }
                }, 60000); // 60000ms = 1 minute

            } else {
                // Bot is not an admin, just delete the spam message
                await this.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang }});
            }
        }
    } else { // Handle private chats
        if (userActivity.count > 3) { // Adjust the spam threshold as needed
            await this.sendMessage(m.chat, { text: `*Ops!*,\n*${user}, YOU ARE SPAMMING AND HAVE BEEN BLOCKED!*`, mentions: [m.sender] });

            // Block the user
            await this.updateBlockStatus(m.sender, 'block');

            // Delete the spam messages
            await this.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang }});
        }
    }

    return true;
}

// Listener to handle admin responses
export async function onMessage(m) {
    if (m.isGroup) {
        let chatId = m.chat;
        let sender = m.sender;

        if (adminDecisions[chatId] && adminDecisions[chatId][sender] === null) {
            if (m.text === 'Yes' || m.text === 'No') {
                adminDecisions[chatId][sender] = m.text;
                let decision = m.text;

                // Notify the admin about the decision result
                if (decision === 'Yes') {
                    await this.sendMessage(chatId, { text: `*${sender.split('@')[0]}*, your decision to keep the user in the group has been recorded.` });
                } else {
                    await this.groupParticipantsUpdate(chatId, [m.sender], 'remove');
                    await this.sendMessage(chatId, { text: `*${sender.split('@')[0]}*, the user has been kicked out of the group.` });
                }
            }
        }
    }
}
