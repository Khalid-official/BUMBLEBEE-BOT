import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems }) => {
try {
let pp = imagen6
let vn = './media/menu.mp3'
let img = await(await fetch('https://i.imgur.com/JP52fdP.jpg')).buffer()
let d = new Date(new Date + 3600000)
let locale = 'es'
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
let _uptime = process.uptime() * 1000
let uptime = clockString(_uptime)
let user = global.db.data.users[m.sender]
let { money, joincount } = global.db.data.users[m.sender]
let { exp, limit, level, role } = global.db.data.users[m.sender]
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length 
let more = String.fromCharCode(8206)
let readMore = more.repeat(850)   
let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
var doc = ['pdf','zip','vnd.openxmlformats-officedocument.presentationml.presentation','vnd.openxmlformats-officedocument.spreadsheetml.sheet','vnd.openxmlformats-officedocument.wordprocessingml.document']
var document = doc[Math.floor(Math.random() * doc.length)]    
let str = `╭─═[ *🐝INFO USER🐝* ]═─⋆
│╭─────────────···
┴│☂︎ *👋Hello🤗* ${taguser}
⬡│☂︎ *Bot🚀Owner:* Khalid-official 
⬡│☂︎ wa.me/254736958034
⬡│☂︎ *🎟️ Premium:* ${user.premiumTime > 0 ? '✅' : (isPrems ? '✅' : '❌') || ''} ''}
┬╰──────────────···
┠─═[ *🐝TODAY🐝* ]═─⋆
│╭──────────────···
⬡│☂︎ *📅Day:* %week %weton
⬡│☂︎ *🗓️Date:* ${date}
┬│☂︎ *⌚Time:* %time
│╰──────────────···
┠─═[ *🐝INFO BOT🐝* ]═──⋆
│╭──────────────···
┴│☂︎ *🦜Name Bot:* *𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓*
⬡│☂︎ *🎐Mode:* public ✅ 
⬡│☂︎ *🎗️Prefix:* [ *%_p* ]
⬡│☂︎ *⏳Uptime:* ${uptime}
┬│☂︎ *🔮Database:* ${rtotalreg}
│╰──────────────···
╰──────────═┅═──────

┠─═[ *🐝EXPERIENCE🐝* ]═─⋆
│╭──────────────···
┴│☂︎ *🎖️ Level:* ${level}
⬡│☂︎ *🧰 Experience:* ${exp}
⬡│☂︎ *⚓ Rank:* ${role}
⬡│☂︎ *💎 Diamonds:* ${limit}
⬡│☂︎ *👾 BumbleCoins:* ${money}
⬡│☂︎ *🪙 Tokens:* ${joincount}
┬│☂︎ *🎟️ Premium:* ${user.premiumTime > 0 ? '✅' : (isPrems ? '✅' : '❌') || ''} ''}
│╰──────────────···
╰─────═┅═──────────
${readMore}
⃝▣─「*🐝OWNERS-MESSAGE🐝*」─⬣
│*Hello 👋 user🤗, this is the official BumbleBee bot. The bot base is created from the transformers movies*
▣────────⬣

┠─═[ *🐝QUICK TEST🐝*]═─⋆
│╭─────────────···
┴│☂︎ *.alive*
⬡│☂︎ *.bot*
⬡│☂︎ *.runtime*
⬡│☂︎ *.ping*
⬡│☂︎ *.infobot*
⬡│☂︎ *.sc/script*
┬│☂︎ *.statserver*
│╰─────────────···
╰───────═┅═────────

┠─═[ *🐝 MENU 🐝*]═─⋆
│╭──────────────···
⬡│☂︎ *.nsfw*
┬│☂︎ *.animes*
│╰──────────────···
╰───────═┅═───────

┠─═[ *🐝CONVERTER-MENU🐝* ]═─⋆
│╭──────────────···
┴│☂︎ *.toanime*
⬡│☂︎ *.tts*
⬡│☂︎ *.tovideo/tovid*
⬡│☂︎ *.tourl*
┬│☂︎ *.togif*
│╰──────────────···
╰───────═┅═───────

┠─═[ *🐝ENABLE-DISABLE🐝* ]═─⋆
│╭──────────────···
┴│☂︎ *.enable/disable welcome*
⬡│☂︎ *.enable/disable hornymode*
⬡│☂︎ *.enable/disable antilink*
⬡│☂︎ *.enable/disable antilink2*
⬡│☂︎ *.enable/disable detect*
⬡│☂︎ *.enable/disable detect2*
⬡│☂︎ *.enable/disable audios*
⬡│☂︎ *.enable/disable autosticker*
⬡│☂︎ *.enable/disable antibot*
⬡│☂︎ *.enable/disable antiviewonce*
⬡│☂︎ *.enable/disable antitoxic*
⬡│☂︎ *.enable/disable antiarabes*
┬│☂︎ *.enable/disable adminmode*
│╰──────────────···
╰───────═┅═───────

┠─═[ *🐝DOWNLOADER-MENU🐝* ]═─⋆
│╭─────────────···
┴│☂︎ *.modapk*
⬡│☂︎ *.gdrive*
⬡│☂︎ *.gitclone*
⬡│☂︎ *.gimage*
⬡│☂︎ *.mediafire*
⬡│☂︎ *.Pinterest*
⬡│☂︎ *.play*
⬡│☂︎ *.song*
⬡│☂︎ *.ringtone*
┬│☂︎ *.twitter*
│╰─────────────···
╰────────═┅═────────

┠─═[ *🐝FUN-MENU🐝* ]═─⋆
│╭─────────────···
┴│☂︎ *.character*
⬡│☂︎ *.gay*
⬡│☂︎ *.hate*
⬡│☂︎ *.love*
⬡│☂︎ *.marry*
⬡│☂︎ *.personality*
⬡│☂︎ *.pickupline*
⬡│☂︎ *.propose*
⬡│☂︎ .*question*
⬡│☂︎ *.simi*
⬡│☂︎ *top*
⬡│☂︎ *.tops*
⬡│☂︎ *.truth*
⬡│☂ *.waste*
┬│☂︎ *.zodiac*
│╰──────────────···
╰───────═┅═───────

┠─═[ *🎮GAME-MENU🐝* ]═─⋆
│╭─────────────···
┴│☂︎ *.ttt*
⬡│☂︎ *.guessflag*
⬡│☂︎ *.maths*
⬡│☂︎ *.pista*
⬡│☂︎ *.riddle*
⬡│☂︎ *.slot*
⬡│☂︎ *.suitpvp*
⬡│☂︎ *.wordfind* 
┬│☂︎ *.tryluck*
│╰────────────···
╰───────═┅═───────

┠─═[ *🐝GROUP-MENU🐝* ]═─⋆
│╭─────────────···
┴│☂︎ *.add*
⬡│☂︎ *.admins/staff*
⬡│☂︎ *.dp*
⬡│☂︎ *.classification*
⬡│☂︎ *.dashboard*
⬡│☂︎ *.delete*
⬡│☂︎ *.inactive*
⬡│☂︎ *.info*
⬡│☂︎ *.infogroup*
⬡│☂︎ *.kick*
⬡│☂︎ *.link*
⬡│☂︎ *.listnum/kicknum*
⬡│☂ *.warn*
⬡│☂︎ *.promote*
⬡│☂︎ *.revoke*
⬡│☂︎ *.setbye*
⬡│☂︎ *.setname*
⬡│☂︎ *.setppgroup*
⬡│☂︎ *.setwelcome*
⬡│☂︎ *.tagall*
⬡│☂︎ *.unwarn*
⬡│☂ *.vcf*
⬡│☂︎ *.warn*
⬡│☂︎ *invite*
┬│☂︎ *.totag*
│╰─────────────···
╰───────═┅═───────

┠─═[ *🐝INFO-MENU🐝* ]═─⋆
│╭─────────────···
┴│☂︎ *.clear*
⬡│☂︎ *.database*
⬡│☂︎ *.groups*
┬│☂︎ *.listprem*
│╰─────────────···
╰───────═┅═───────

┠─═[ *🐝INTERNET-MENU🐝* ]═─⋆
│╭─────────────···
┴│☂︎ *.gimage*
⬡│☂︎ *.google*
⬡│☂︎ *.itunes*
⬡│☂︎ *.lyrics*
⬡│☂︎ *.movie*
⬡│☂︎ *.playstore*
⬡│☂︎ *.stickersearch*
⬡│☂︎ *.Wikipedia*
┬│☂︎ *.yts*
│╰─────────────···
╰───────═┅═───────

┠─═[ *🐝MAKER-OWNER🐝* ]═─⋆
│╭─────────────···
┴│☂︎ *.blur*
⬡│☂︎ *.cartoon/tocartoon*
⬡│☂︎ *.gay*
⬡│☂︎ *.horncard*
⬡│☂︎ *.itssostupid*
⬡│☂︎ *.simpcard*
⬡│☂︎ *.toanime*
┬│☂︎ *.animes*
│╰─────────────···
╰───────═┅═───────

┠─═[ *🐝OWNER-MENU🐝* ]═─⋆
│╭─────────────···
┴│☂︎ *.addowner*
⬡│☂︎ *.delowner*
⬡│☂︎ *.addmsg*
⬡│☂︎ *.autoadmin*
⬡│☂︎ *.backup*
⬡│☂︎ *.banchat*
⬡│☂︎ *.banlist*
⬡│☂︎ *.banuser*
⬡│☂︎ *.bcgc*
⬡│☂︎ *.block*
⬡│☂︎ *.unblock*
⬡│☂︎ *.blocklist*
⬡│☂︎ *.broadcast*
⬡│☂︎ *.broadcastchats*
⬡│☂ *.bc*
︎⬡│☂︎ *.bcgc2*
⬡│☂︎ *.cleartmp*
⬡│☂︎ *delmsg/del*
⬡│☂︎ *.killgc/kickall*
⬡│☂︎ *.demoteall*
⬡│☂︎ *.promoteall*
⬡│☂︎ *.delprem*
⬡│☂︎ *.df*
⬡│☂︎ *.exec2*
⬡│☂︎ *.fetch*
⬡│☂︎ *.getdb*
⬡│☂︎ *.getmsg*
⬡│☂︎ *.getplugin*
⬡│☂︎ *.getsession*
⬡│☂︎ *.infinity*
⬡│☂︎ *.inspect*
⬡│☂︎ *.join*
⬡│☂︎ *.leave*
⬡│☂︎ *.listmsg*
⬡│☂︎ *.logout*
⬡│☂︎ *.monitor* 
⬡│☂︎ *.msg*
⬡│☂︎ *.report*
⬡│☂︎ *resetprefix*
⬡│☂︎ *.resetuser*
⬡│☂︎ *.restart*
⬡│☂︎ *.saveimage*
⬡│☂︎ *.setppbot*
⬡│☂ *.send 
⬡│☂︎ *.setprefix*
⬡│☂︎ *.sf*
⬡│☂︎ *.supportwa*
⬡│☂︎ *.unbanchat*
⬡│☂︎ *.unblock*
⬡│☂︎ *.update*
⬡│☂︎ *.viewimage*
┬│☂︎ *.virus/c2/traba1-8/traba*
│╰─────────────···
╰───────═┅═───────

┠─═[ *🐝RANDOM-MENU🐝* ]═─⋆
│╭─────────────···
┴│☂︎ *.blackpink*
⬡│☂︎ *.cr7*
⬡│☂︎ *.cat*
⬡│☂︎ *.dog*
⬡│☂︎ *.itzy*
⬡│☂︎ *.lolivid*
⬡│☂︎ *.messi*
⬡│☂︎ *.merrychristmas*
⬡│☂︎ *.neko*
⬡│☂︎ *.waifu*︎
│╰─────────────···
╰───────═┅═───────

┠─═[ *🐝RPG-MENU🐝* ]═─⋆
│╭─────────────···
┴│☂︎ *.addxp*
⬡│☂︎ *.adventure*
⬡│☂︎ *.balance*
⬡│☂︎ *.daily*
⬡│☂︎ *.daily2
⬡│☂︎ *.heal*
⬡│☂︎ *.hunt*
⬡│☂︎ *.leaderboard*
⬡│☂︎ *.levelup*
⬡│☂︎ *.mine*
⬡│☂︎ *.myns*
⬡│☂︎ *.profile*
⬡│☂︎ *.rob*
⬡│☂︎ *.buy*
⬡│☂︎ *.mine2*
⬡│☂ *.transfer*
︎⬡│☂︎ *.unreg*
⬡│☂︎ *.verify/reg*
┬│☂︎ *.work*
│╰─────────────···
╰───────═┅═───────

┠─═[ *🐝STICKER-MENU🐝* ]═─⋆
│╭─────────────···
┴│☂︎ *.scricle/circle*
⬡│☂︎ *.dado*
⬡│☂︎ *.getsticker*
⬡│☂︎ *.slap*
⬡│☂︎ *.smeme*
⬡│☂︎ *.sremovebg*
⬡│☂︎ *.sticker*
┬│☂︎ *.take/steal*
│╰─────────────···
╰───────═┅═───────

┠─═[ *🐝TOOLS-MENU🐝* ]═─⋆
│╭─────────────···
┴│☂︎ *.calc*
⬡│☂︎ *.carbon*
⬡│☂︎ *.climate*
⬡│☂︎ *.dropmail*
⬡│☂︎ *.element*
⬡│☂︎ *.fakereply*
⬡│☂︎ *.getbio*
⬡│☂︎ *.hd*
⬡│☂︎ *.inspect*
⬡│☂︎ *.nowa*
⬡│☂︎ *.ocr*
⬡│☂︎ *.qrcode*
⬡│☂*.vv/readvo/readviewonce*
⬡│☂︎ *.ssweb*
⬡│☂︎ *.styletext*
⬡│☂︎ *.symbols*
⬡│☂︎ *.technews*
⬡│☂︎ *.tinyurl*
⬡│☂︎ *.topdf*
⬡│☂︎ *.translate*
⬡│☂︎ *.waste*
⬡│☂︎ *.shazam*
┬│☂︎ *.worldclock*
│╰─────────────···
╰───────═┅═───────

┠─═[ *🐝NSFW-MENU🐝* ]═─⋆
│╭─────────────···
┴│☂︎ *.pack*
⬡│☂︎ *.pack2*
⬡│☂︎ *.pack3*
⬡│☂︎ *.videolesbixxx*
⬡│☂︎ *.boobs*
⬡│☂︎ *.ecchi*
⬡│☂︎ *.furro*
⬡│☂︎ *.imagelesbians*
⬡│☂︎ *.panties*
⬡│☂︎ *.pene*
⬡│☂︎ *.porn*
⬡│☂︎ *.randomxxx*
⬡│☂︎ *.breasts*
⬡│☂︎ *.yaoi*
⬡│☂︎ *.yaoi2*
⬡│☂ *.yuri*
︎⬡│☂︎ *.yuri2*
⬡│☂︎ *.trapito*
⬡│☂︎ *.hentai*
⬡│☂︎ *.nsfwloli*
⬡│☂︎ *.nsfworgy*
⬡│☂︎ *.nsfwfoot*
⬡│☂︎ *.nsfwass*
⬡│☂︎ *.nsfwbdsm*
⬡│☂︎ *.nsfwcum*
⬡│☂︎ *.nsfwero*
⬡│☂︎ *.nsfwfedom*
⬡│☂︎ *.nsfwglass*
⬡│☂︎ *.nsfwpdf* 
┬│☂︎ *.hentaisearch*
│╰─────────────···
╰───────═┅═───────`.trim()
if (m.isGroup) {
//await conn.sendFile(m.chat, vn, 'menu.mp3', null, m, true, { type: 'audioMessage', ptt: true})
let fkontak2 = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }  
conn.sendMessage(m.chat, { image: pp, caption: str.trim(), mentions: [...str.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')}, { quoted: fkontak2 })  
} else {    
//await conn.sendFile(m.chat, vn, 'menu.mp3', null, m, true, { type: 'audioMessage', ptt: true})
let fkontak2 = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }  
conn.sendMessage(m.chat, { image: pp, caption: str.trim(), mentions: [...str.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')}, { quoted: fkontak2 })}
} catch {
conn.reply(m.chat, '*[❗𝐈𝐍𝐅𝐎❗]THE MENU HAS AN ERROR AND IT IS NOT POSSIBLE TO SEND IT REPORT IT TO THE OWNER OF THE BOT*', m)
}}
handler.command = /^(menu|menú|memu|memú|help|info|comandos|allmenu|2help|menu1.2|ayuda|commands|commandos|cmd)$/i
handler.exp = 50
handler.fail = null
export default handler
function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}

/*let buttons = [
{ buttonId: '#donar', buttonText: { displayText: '📮 𝙳𝙾𝙽𝙰𝚁 📮' }, type: 1 },
//{ buttonId: '#terminosycondiciones', buttonText: { displayText: '📋 𝚃𝙴𝚁𝙼𝙸𝙽𝙾𝚂 𝚈 𝙲𝙾𝙽𝙳𝙸𝙲𝙸𝙾𝙽𝙴𝚂 📋' }, type: 1 }]
{ buttonId: '#infobot', buttonText: { displayText: '🐾 𝙸𝙽𝙵𝙾𝙱𝙾𝚃 🐾' }, type: 1 }]
let buttonMessage = {
image: pp,
caption: str.trim(),
mentions: [m.sender],
footer: `*${wm}*`,
buttons: buttons,
headerType: 4,
contextInfo: {
mentionedJid: [m.sender],
externalAdReply: {
showAdAttribution: true,
mediaType: 'VIDEO',
mediaUrl: null,
title: '👑𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓👑',
body: null,
thumbnail: img,
sourceUrl: `https://www.paypal.me/TheShadowBrokers133`
}}}
conn.sendMessage(m.chat, buttonMessage, { quoted: m })*/
