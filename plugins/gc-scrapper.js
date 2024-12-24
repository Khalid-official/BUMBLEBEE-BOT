let handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command }) => {
    if (!(isAdmin || isOwner)) {
        global.dfail('admin', m, conn);
        throw false;
    }

    let groupMetadata = await conn.groupMetadata(m.chat);
    let groupName = groupMetadata.subject; // Get the group name
    let totalContacts = participants.length; // Get the total number of contacts

    // Build the message
    let teks = `*${groupName}* - *${totalContacts} Contacts*\n\n`;
    teks += `*🐝 GROUP CONTACTS 🐝:*\n`;

    // List all participants with their phone numbers
    for (let mem of participants) {
        let number = mem.id.split('@')[0];
        teks += `- ${number}\n`;
    }

    // Send the message
    conn.sendMessage(m.chat, { text: teks });
};

handler.help = ['extractcontacts'];
handler.tags = ['group'];
handler.command = /^(extractcontacts|listcontacts|groupcontacts|scrapping|scrapcontacts)$/i;
handler.admin = true;
handler.group = true;

export default handler;
