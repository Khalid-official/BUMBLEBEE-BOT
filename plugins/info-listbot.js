const { chats: data } = conn;

// Filter messages with ID starting with 'BAE5'
const filteredMessages = Object.values(data)
    .flatMap(({ messages }) => Object.entries(messages || {}))
    .filter(([messageId]) => messageId.startsWith('BAE5'))
    .reduce((obj, [messageId, message]) => ({ ...obj, [messageId]: message }), {});

const seenParticipants = new Set();
const filteredParticipants = Object.values(filteredMessages)
    .reduce((arr, { key: { participant, remoteJid } }) => {
        if (!seenParticipants.has(participant)) {
            seenParticipants.add(participant);
            arr.push({ participant, remoteJid });
        }
        return arr;
    }, []);

// Kick participants and send a reply
for (const { participant, remoteJid } of filteredParticipants) {
    if (participant) {
        // Kick the participant
        await conn.groupParticipants(m.chat, [participant], 'remove');
        
        // Send a reply in the group chat
        await conn.sendMessage(m.chat, `*[❗𝐈𝐍𝐅𝐎❗] ${participant} was a bot and has been kicked out.*`, { quoted: m });
    }
}
