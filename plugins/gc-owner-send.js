let handler = async (m, { conn, text }) => {
    if (!text) throw `*[❗𝐈𝐍𝐅𝐎❗] Please provide a group invitation link and the number to send it to.*\n\n📌 Example:\n!invite https://chat.whatsapp.com/XXXXXXX, 59172945992`;

    // Split the input into group link and number
    let [groupLink, number] = text.split(',').map(item => item.trim());

    if (!groupLink || !groupLink.startsWith('https://chat.whatsapp.com/')) {
        throw `*[❗𝐈𝐍𝐅𝐎❗] Please provide a valid WhatsApp group invitation link.*`;
    }
    if (!number || isNaN(number)) {
        throw `*[❗𝐈𝐍𝐅𝐎❗] Please provide a valid phone number (no spaces or '+' sign).*`;
    }

    // Format the number to match WhatsApp's format
    let formattedNumber = number + '@s.whatsapp.net';

    // Send the group invitation link to the specified number
    try {
        await conn.reply(
            formattedNumber,
            `≡ *GROUP INVITE*\n\n*[❗𝐈𝐍𝐅𝐎❗] 👋 Hello 🤗 user, I'm BUMBLEBEE BOT and You have been invited to the group, if the group link is not visible. copy the entire message and send it to the bots acccount and send your request the admins of the group will approve you. We are waiting for you😁❤️*\n\n${groupLink}`,
            m
        );
        m.reply(`*[❗𝐈𝐍𝐅𝐎❗] Invitation link sent to ${number} successfully.*`);
    } catch (error) {
        m.reply(`*[❗𝐈𝐍𝐅𝐎❗] Failed to send the invitation link to ${number}.*`);
    }
};

handler.help = ['invite <group link>, <number>'];
handler.tags = ['group'];
handler.command = /^send$/i; // Only responds to the 'invite' command
handler.owner = true; // Restrict this command to the bot owner

export default handler;
