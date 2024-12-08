const { downloadContentFromMessage } = require('@adiwajshing/baileys'); // Import necessary function

if (m.key.remoteJid === 'status@broadcast') {
    await mconn.conn.readMessages([m.key]); // Mark the status as read
} else if (m.message && m.message.extendedTextMessage) {
    const replyMessage = m.message.extendedTextMessage.text; // Get the reply text
    const quotedMsg = m.message.extendedTextMessage.contextInfo.quotedMessage; // Get the quoted message

    // Check if the user replied to a status with "save"
    if (replyMessage.toLowerCase() === 'save' && quotedMsg) {
        const messageType = Object.keys(quotedMsg)[0]; // Get the type of the quoted message
        if (messageType === 'imageMessage' || messageType === 'videoMessage') {
            const media = quotedMsg[messageType];
            const stream = await downloadContentFromMessage(media, messageType.replace('Message', ''));
            let buffer = Buffer.from([]);
            
            // Download the media
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }

            const fileName = `status_${Date.now()}.${messageType === 'imageMessage' ? 'jpg' : 'mp4'}`;
            const filePath = `./downloads/${fileName}`;

            // Save the media to the bot's private chat
            const chatId = mconn.user.id.split(':')[0] + '@s.whatsapp.net';
            await mconn.conn.sendMessage(chatId, { 
                document: buffer, 
                fileName: fileName, 
                mimetype: messageType === 'imageMessage' ? 'image/jpeg' : 'video/mp4' 
            });

            console.log(`Status saved and sent to private chat: ${filePath}`);
        } else {
            console.log('The quoted message is not a media file.');
        }
    }
}
