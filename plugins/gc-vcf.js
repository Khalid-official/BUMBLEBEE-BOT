import fs from 'fs';

let handler = async (m, { isOwner, conn, participants }) => {
    if (!isOwner) {
        global.dfail('owner', m, conn);
        throw false;
    }

    let groupMetadata = await conn.groupMetadata(m.chat);
    let groupName = groupMetadata.subject;
    let totalContacts = participants.length;

    let vcfData = '';
    for (let mem of participants) {
        let number = mem.id.split('@')[0];
        let contactName = `${groupName}-${number}`;
        vcfData += `BEGIN:VCARD\nVERSION:3.0\nFN:${contactName}\nTEL;type=CELL:+${number}\nEND:VCARD\n`;
    }

    // Define file path
    let fileName = `group_contacts_${Date.now()}.vcf`;
    let filePath = `/tmp/${fileName}`;
    fs.writeFileSync(filePath, vcfData);

    await conn.sendMessage(m.chat, {
        document: { url: filePath },
        mimetype: 'text/x-vcard',
        fileName: fileName,
        caption: `*${groupName}* - *${totalContacts} Contacts*\nHere are the contacts in .vcf format.`
    }, { quoted: m });
};

handler.help = ['extractcontacts'];
handler.tags = ['group'];
handler.command = /^(extractcontacts|getvcf|vcf)$/i;
handler.owner = true;
handler.group = true;

export default handler;
