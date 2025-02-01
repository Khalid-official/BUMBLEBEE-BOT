let handler = async (m, { conn, args, isOwner, command, isGroup }) => {
    if (command === 'setdesc' || command === 'setdesk') {
        if (!isGroup) return m.reply('*[❗ERROR❗] This command can only be used in groups!*');
        await conn.groupUpdateDescription(m.chat, `${args.join(" ")}`);
        m.reply('https://github.com/Khalid-official *[❗INFO❗] Successfully changed the group description*');
    } else if (command === 'setusername') {
        if (!isOwner) return m.reply('*[❗ERROR❗] Only the bot owner can use this command!*');
        let newName = args.join(" ");
        if (!newName) return m.reply('*[❗ERROR❗] Please provide a new username!*');
        
        try {
            await conn.updateProfileName(newName);
            m.reply(`*[✅ SUCCESS]* Bot username updated to: *${newName}*`);
        } catch (e) {
            m.reply('*[❌ ERROR]* Failed to update bot username. Make sure the bot has the necessary permissions.');
        }
    }
};

handler.help = ['setdesc <text>', 'setusername <new_name>'];
handler.tags = ['group', 'owner'];
handler.command = /^setdesk|setdesc|setusername$/i;
handler.group = false; // `setdesc` works only in groups
handler.owner = true;  // `setusername` is for owner use only

export default handler;
