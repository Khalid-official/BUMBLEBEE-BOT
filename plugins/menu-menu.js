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
⬡│☂︎ wa${usedPrefix}me/254736958034
⬡│☂︎ *🎟️ Premium:* ${user${usedPrefix}premiumTime > 0 ? '✅' : (isPrems ? '✅' : '❌') || ''} ''}
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
┬│☂︎ *🎟️ Premium:* ${user${usedPrefix}premiumTime > 0 ? '✅' : (isPrems ? '✅' : '❌') || ''} ''}
│╰──────────────···
╰─────═┅═──────────
${readMore}
⃝▣─「*🐝OWNERS-MESSAGE🐝*」─⬣
│*Hello 👋 user🤗, thiw is the official bumblebee bot${usedPrefix} The bot base is created from the transformers movies*
▣────────⬣

┠─═[ *🐝QUICK TEST🐝*]═─⋆
│╭─────────────···
┴│☂︎ *${usedPrefix}alive*
⬡│☂︎ *${usedPrefix}bot*
⬡│☂︎ *${usedPrefix}runtime*
⬡│☂︎ *${usedPrefix}ping*
⬡│☂︎ *${usedPrefix}infobot*
⬡│☂︎ *${usedPrefix}sc/script*
⬡│☂︎ *${usedPrefix}speedtest*
⬡│☂︎ *${usedPrefix}tyc/terms*
┬│☂︎ *${usedPrefix}statserver*
│╰─────────────···
╰───────═┅═────────

┠─═[ *🐝AI SEARCH🐝*]═─⋆
│╭─────────────···
┴│☂︎ *${usedPrefix}ai chatpgpt*
⬡│☂︎ *${usedPrefix}bee*
⬡│☂︎ *${usedPrefix}alexa*
┬│☂︎ *${usedPrefix}gpt*
│╰─────────────···
╰───────═┅═───────

┠─═[ *🐝 MENU 🐝*]═─⋆
│╭──────────────···
┴│☂︎ *${usedPrefix}listcmd*
⬡│☂︎ *${usedPrefix}nsfw*
⬡│☂︎ *${usedPrefix}audios*
┬│☂︎ *${usedPrefix}animes*
│╰──────────────···
╰───────═┅═───────

┠─═[ *🐝MIPILOT-MENU🐝* ]═─⋆
│╭──────────────···
┴│☂︎ *${usedPrefix}deletebot* 
⬡│☂︎ *${usedPrefix}serbot*
⬡│☂︎ *${usedPrefix}serbotbroadcast*
⬡│☂︎ *${usedPrefix}serbotcode*
⬡│☂︎ *${usedPrefix}serbotinfo*
┬│☂︎ *${usedPrefix}stopbot*
│╰──────────────···
╰───────═┅═───────

┠─═[ *🐝CONVERTER-MENU🐝* ]═─⋆
│╭──────────────···
┴│☂︎ *${usedPrefix}toanime*
⬡│☂︎ *${usedPrefix}tts*
⬡│☂︎ *${usedPrefix}tts2*
⬡│☂︎ *${usedPrefix}tovideo/tovid*
⬡│☂︎ *${usedPrefix}tourl*
⬡│☂︎ *${usedPrefix}tomp3*
⬡│☂︎ *${usedPrefix}toimg*
┬│☂︎ *${usedPrefix}togif*
│╰──────────────···
╰───────═┅═───────

┠─═[ *🐝ENABLE-DISABLE🐝* ]═─⋆
│╭──────────────···
┴│☂︎ *${usedPrefix}enable/disable welcome*
⬡│☂︎ *${usedPrefix}enable/disable hornymode*
⬡│☂︎ *${usedPrefix}enable/disable antilink*
⬡│☂︎ *${usedPrefix}enable/disable antilink2*
⬡│☂︎ *${usedPrefix}enable/disable detect*
⬡│☂︎ *${usedPrefix}enable/disable detect2*
⬡│☂︎ *${usedPrefix}enable/disable audios*
⬡│☂︎ *${usedPrefix}enable/disable autosticker*
⬡│☂︎ *${usedPrefix}enable/disable antibot*
⬡│☂︎ *${usedPrefix}enable/disable antiviewonce*
⬡│☂︎ *${usedPrefix}enable/disable antitoxic*
⬡│☂︎ *${usedPrefix}enable/disable antiarabes*
┬│☂︎ *${usedPrefix}enable/disable adminmode*
│╰──────────────···
╰───────═┅═───────

┠─═[ *🐝DOWNLOADER-MENU🐝* ]═─⋆
│╭─────────────···
┴│☂︎ *${usedPrefix}apk*
⬡│☂︎ *${usedPrefix}download (yt link)*
⬡│☂︎ *${usedPrefix}facbook (link)*
⬡│☂︎ *${usedPrefix}gdrive*
⬡│☂︎ *${usedPrefix}gitclone*
⬡│☂︎ *${usedPrefix}igstalk*
⬡│☂︎ *${usedPrefix}igstory*
⬡│☂︎ *${usedPrefix}gimage*
⬡│☂︎ *${usedPrefix}mediafire*
⬡│☂︎ *${usedPrefix}Pinterest*
⬡│☂︎ *${usedPrefix}play*
⬡│☂︎ *${usedPrefix}playdoc*
⬡│☂︎ *${usedPrefix}pptiktok*
⬡│☂︎ *${usedPrefix}ringtone*
⬡│☂︎ *${usedPrefix}stickerpack*
⬡│☂ *${usedPrefix}tiktok*
︎⬡│☂︎ *${usedPrefix}twitter*
⬡│☂︎ *${usedPrefix}ytmeta*
┬│☂︎ *${usedPrefix}ytv*
│╰─────────────···
╰────────═┅═────────

┠─═[ *🐝FUN-MENU🐝* ]═─⋆
│╭─────────────···
┴│☂︎ *${usedPrefix}character*
⬡│☂︎ *${usedPrefix}dare*
⬡│☂︎ *${usedPrefix}gay*
⬡│☂︎ *${usedPrefix}hate*
⬡│☂︎ *${usedPrefix}love*
⬡│☂︎ *${usedPrefix}marry*
⬡│☂︎ *${usedPrefix}personality*
⬡│☂︎ *${usedPrefix}pickupline*
⬡│☂︎ *${usedPrefix}propose*
⬡│☂︎ ${usedPrefix}*question*
⬡│☂︎ *${usedPrefix}reto*
⬡│☂︎ *${usedPrefix}simi*
⬡│☂︎ *top*
⬡│☂︎ *${usedPrefix}tops*
⬡│☂︎ *${usedPrefix}truth*
⬡│☂ *${usedPrefix}waste*
┬│☂︎ *${usedPrefix}zodiac*
│╰──────────────···
╰───────═┅═───────

┠─═[ *🎮GAME-MENU🐝* ]═─⋆
│╭─────────────···
┴│☂︎ *${usedPrefix}ttt*
⬡│☂︎ *bible*
⬡│☂︎ *${usedPrefix}guessflag*
⬡│☂︎ *${usedPrefix}maths*
⬡│☂︎ *${usedPrefix}pista*
⬡│☂︎ *${usedPrefix}riddle*
⬡│☂︎ *${usedPrefix}slot*
⬡│☂︎ *${usedPrefix}suitpvp*
⬡│☂︎ *${usedPrefix}wordfind* 
┬│☂︎ *${usedPrefix}tryluck*
│╰────────────···
╰───────═┅═───────

┠─═[ *🐝GROUP-MENU🐝* ]═─⋆
│╭─────────────···
┴│☂︎ *${usedPrefix}active*
⬡│☂︎ *${usedPrefix}add*
⬡│☂︎ *${usedPrefix}admins/staff*
⬡│☂︎ *${usedPrefix}dp*
⬡│☂︎ *${usedPrefix}classification*
⬡│☂︎ *${usedPrefix}configtime*
⬡│☂︎ *${usedPrefix}dashboard*
⬡│☂︎ *${usedPrefix}delete*
⬡│☂︎ *${usedPrefix}edit*
⬡│☂︎ *${usedPrefix}inactive*
⬡│☂︎ *${usedPrefix}info*
⬡│☂︎ *${usedPrefix}infogroup*
⬡│☂︎ *${usedPrefix}kick*
⬡│☂︎ *${usedPrefix}link*
⬡│☂︎ *${usedPrefix}listnum/kicknum*
⬡│☂ *${usedPrefix}warn*
︎⬡│☂︎ *${usedPrefix}listonline*
⬡│☂︎ *${usedPrefix}poll*
⬡│☂︎ *${usedPrefix}promote*
⬡│☂︎ *${usedPrefix}revoke*
⬡│☂︎ *${usedPrefix}setbye*
⬡│☂︎ *${usedPrefix}setname*
⬡│☂︎ *${usedPrefix}setppgroup*
⬡│☂︎ *${usedPrefix}setwelcome*
⬡│☂︎ *${usedPrefix}setwelcome*
⬡│☂︎ *${usedPrefix}tagall*
⬡│☂︎ *${usedPrefix}unwarn*
⬡│☂︎ *${usedPrefix}warn*
⬡│☂︎ *invite*
┬│☂︎ *${usedPrefix}totag*
│╰─────────────···
╰───────═┅═───────

┠─═[ *🐝INFO-MENU🐝* ]═─⋆
│╭─────────────···
┴│☂︎ *${usedPrefix}clear*
⬡│☂︎ *${usedPrefix}creator*
⬡│☂︎ *${usedPrefix}database*
⬡│☂︎ *${usedPrefix}groupmenu*
⬡│☂︎ *${usedPrefix}groupofc*
┬│☂︎ *${usedPrefix}listprem*
│╰─────────────···
╰───────═┅═───────

┠─═[ *🐝INTERNET-MENU🐝* ]═─⋆
│╭─────────────···
┴│☂︎ *${usedPrefix}animeinfo*
⬡│☂︎ *${usedPrefix}gimage*
⬡│☂︎ *${usedPrefix}githubsearch*
⬡│☂︎ *${usedPrefix}google*
⬡│☂︎ *${usedPrefix}itunes*
⬡│☂︎ *${usedPrefix}lyrics*
⬡│☂︎ *${usedPrefix}movie*
⬡│☂︎ *${usedPrefix}playstore*
⬡│☂︎ *${usedPrefix}stickersearch*
⬡│☂︎ *${usedPrefix}Wikipedia*
┬│☂︎ *${usedPrefix}yts*
│╰─────────────···
╰───────═┅═───────

┠─═[ *🐝MAKER-OWNER🐝* ]═─⋆
│╭─────────────···
┴│☂︎ *${usedPrefix}blur*
⬡│☂︎ *${usedPrefix}cartoon/tocartoon*
⬡│☂︎ *${usedPrefix}gay*
⬡│☂︎ *${usedPrefix}horncard*
⬡│☂︎ *${usedPrefix}itssostupid*
⬡│☂︎ *${usedPrefix}logo*
⬡│☂︎ *${usedPrefix}phmaker*
⬡│☂︎ *${usedPrefix}pixel*
⬡│☂︎ *${usedPrefix}simpcard*
⬡│☂︎ *${usedPrefix}toanime*
⬡│☂︎ *${usedPrefix}ytcomment* 
┬│☂︎ *${usedPrefix}animes*
│╰─────────────···
╰───────═┅═───────

┠─═[ *🐝OWNER-MENU🐝* ]═─⋆
│╭─────────────···
┴│☂︎ *${usedPrefix}addowner*
⬡│☂︎ *${usedPrefix}delowner*
⬡│☂︎ *${usedPrefix}addmsg*
⬡│☂︎ *${usedPrefix}autoadmin*
⬡│☂︎ *${usedPrefix}autoadmin*
⬡│☂︎ *${usedPrefix}backup*
⬡│☂︎ *${usedPrefix}banchat*
⬡│☂︎ *${usedPrefix}banlist*
⬡│☂︎ *${usedPrefix}banuser*
⬡│☂︎ *${usedPrefix}bcgc*
⬡│☂︎ *${usedPrefix}block*
⬡│☂︎ *${usedPrefix}unblock*
⬡│☂︎ *${usedPrefix}blocklist*
⬡│☂︎ *${usedPrefix}broadcast*
⬡│☂︎ *${usedPrefix}broadcastchats*
⬡│☂ *${usedPrefix}bc*
︎⬡│☂︎ *${usedPrefix}bcgc2*
⬡│☂︎ *${usedPrefix}cleartmp*
⬡│☂︎ *delmsg/del*
⬡│☂︎ *${usedPrefix}killgc/kickall*
⬡│☂︎ *${usedPrefix}demoteall*
⬡│☂︎ *${usedPrefix}promoteall*
⬡│☂︎ *${usedPrefix}delprem*
⬡│☂︎ *${usedPrefix}df*
⬡│☂︎ *${usedPrefix}exec2*
⬡│☂︎ *${usedPrefix}fetch*
⬡│☂︎ *${usedPrefix}getdb*
⬡│☂︎ *${usedPrefix}getmsg*
⬡│☂︎ *${usedPrefix}getplugin*
⬡│☂︎ *${usedPrefix}getsession*
⬡│☂︎ *${usedPrefix}infinity*
⬡│☂︎ *${usedPrefix}inspect*
⬡│☂︎ *${usedPrefix}join*
⬡│☂︎ *${usedPrefix}leave*
⬡│☂︎ *${usedPrefix}listmsg*
⬡│☂︎ *${usedPrefix}logout*
⬡│☂︎ *${usedPrefix}monitor* 
⬡│☂︎ *${usedPrefix}msg*
⬡│☂︎ *${usedPrefix}report*
⬡│☂︎ *${usedPrefix}resetprefix*
⬡│☂︎ *${usedPrefix}resetuser*
⬡│☂︎ *${usedPrefix}restart*
⬡│☂︎ *${usedPrefix}saveimage*
⬡│☂︎ *${usedPrefix}setppbot*
⬡│☂︎ *${usedPrefix}setprefix*
⬡│☂︎ *${usedPrefix}sf*
⬡│☂︎ *${usedPrefix}supportwa*
⬡│☂︎ *${usedPrefix}unbanchat*
⬡│☂︎ *${usedPrefix}unblock*
⬡│☂︎ *${usedPrefix}update*
⬡│☂︎ *${usedPrefix}viewimage*
┬│☂︎ *${usedPrefix}virus/c2/traba1-8/traba*
│╰─────────────···
╰───────═┅═───────

┠─═[ *🐝RANDOM-MENU🐝* ]═─⋆
│╭─────────────···
┴│☂︎ *${usedPrefix}anime*
⬡│☂︎ *${usedPrefix}blackpink*
⬡│☂︎ *${usedPrefix}cr7*
⬡│☂︎ *${usedPrefix}cat*
⬡│☂︎ *${usedPrefix}dog*
⬡│☂︎ *${usedPrefix}itzy*
⬡│☂︎ *${usedPrefix}kpop*
⬡│☂︎ *${usedPrefix}loli*
⬡│☂︎ *${usedPrefix}lolivid*
⬡│☂︎ *${usedPrefix}messi*
⬡│☂︎ *${usedPrefix}navidad*
⬡│☂︎ *${usedPrefix}neko*
⬡│☂︎ *${usedPrefix}ppcp*
⬡│☂︎ *${usedPrefix}waifu*︎ 
┬│☂︎ *${usedPrefix}courses*
│╰─────────────···
╰───────═┅═───────

┠─═[ *🐝RPG-MENU🐝* ]═─⋆
│╭─────────────···
┴│☂︎ *${usedPrefix}addxp*
⬡│☂︎ *${usedPrefix}adventure*
⬡│☂︎ *${usedPrefix}balance*
⬡│☂︎ *${usedPrefix}daily*
⬡│☂︎ *${usedPrefix}daily2
⬡│☂︎ *${usedPrefix}heal*
⬡│☂︎ *${usedPrefix}hunt*
⬡│☂︎ *${usedPrefix}leaderboard*
⬡│☂︎ *${usedPrefix}levelup*
⬡│☂︎ *${usedPrefix}mine*
⬡│☂︎ *${usedPrefix}myns*
⬡│☂︎ *${usedPrefix}profile*
⬡│☂︎ *${usedPrefix}rob*
⬡│☂︎ *${usedPrefix}buy*
⬡│☂︎ *${usedPrefix}mine2*
⬡│☂ *${usedPrefix}transfer*
︎⬡│☂︎ *${usedPrefix}unreg*
⬡│☂︎ *${usedPrefix}verify/reg*
┬│☂︎ *${usedPrefix}work*
│╰─────────────···
╰───────═┅═───────

┠─═[ *🐝STICKER-MENU🐝* ]═─⋆
│╭─────────────···
┴│☂︎ *${usedPrefix}scricle/circle*
⬡│☂︎ *${usedPrefix}dado*
⬡│☂︎ *${usedPrefix}getsticker*
⬡│☂︎ *${usedPrefix}kiss*
⬡│☂︎ *${usedPrefix}pat*
⬡│☂︎ *${usedPrefix}qc*
⬡│☂︎ *${usedPrefix}semoji*
⬡│☂︎ *${usedPrefix}slap*
⬡│☂︎ *${usedPrefix}smeme*
⬡│☂︎ *${usedPrefix}sremovebg*
⬡│☂︎ *${usedPrefix}sticker*
⬡│☂︎ *${usedPrefix}stickerfilter*
⬡│☂︎ *${usedPrefix}smaker*
⬡│☂︎ *${usedPrefix}attp*
⬡│☂︎ *${usedPrefix}attp2*
⬡│☂*${usedPrefix}attp3*
︎⬡│☂︎ *${usedPrefix}ttp5*
⬡│☂︎ *${usedPrefix}ttp4*
⬡│☂︎ *${usedPrefix}ttp3*
⬡│☂︎ *${usedPrefix}ttp2*
⬡│☂︎ *${usedPrefix}ttp
┬│☂︎ *${usedPrefix}take/steal*
│╰─────────────···
╰───────═┅═───────

┠─═[ *🐝TOOLS-MENU🐝* ]═─⋆
│╭─────────────···
┴│☂︎ *${usedPrefix}calc*
⬡│☂︎ *${usedPrefix}carbon*
⬡│☂︎ *${usedPrefix}climate*
⬡│☂︎ *${usedPrefix}dalle*
⬡│☂︎ *${usedPrefix}dropmail*
⬡│☂︎ *${usedPrefix}element*
⬡│☂︎ *${usedPrefix}fakereply*
⬡│☂︎ *${usedPrefix}getbio*
⬡│☂︎ *${usedPrefix}hd*
⬡│☂︎ *${usedPrefix}inspect*
⬡│☂︎ *${usedPrefix}mute*
⬡│☂︎ *${usedPrefix}nowa*
⬡│☂︎ *${usedPrefix}ocr*
⬡│☂︎ *${usedPrefix}qrcode*
⬡│☂︎ *${usedPrefix}readqr*
⬡│☂*${usedPrefix}vv/readvo/readviewonce*
︎⬡│☂︎ *${usedPrefix}resize*
⬡│☂︎ *${usedPrefix}ssweb*
⬡│☂︎ *${usedPrefix}styletext*
⬡│☂︎ *${usedPrefix}symbols*
⬡│☂︎ *${usedPrefix}technews*
⬡│☂︎ *${usedPrefix}tinyurl*
⬡│☂︎ *${usedPrefix}topdf*
⬡│☂︎ *${usedPrefix}translate*
⬡│☂︎ *${usedPrefix}waste*
⬡│☂︎ *${usedPrefix}shazam*
┬│☂︎ *${usedPrefix}worldclock*
│╰─────────────···
╰───────═┅═───────

┠─═[ *🐝GROUP-MENU🐝* ]═─⋆
│╭─────────────···
┴│☂︎ *${usedPrefix}pack*
⬡│☂︎ *${usedPrefix}pack2*
⬡│☂︎ *${usedPrefix}pack3*
⬡│☂︎ *${usedPrefix}videolesbixxx*
⬡│☂︎ *${usedPrefix}boobs*
⬡│☂︎ *${usedPrefix}ecchi*
⬡│☂︎ *${usedPrefix}furro*
⬡│☂︎ *${usedPrefix}imagelesbians*
⬡│☂︎ *${usedPrefix}panties*
⬡│☂︎ *${usedPrefix}pene*
⬡│☂︎ *${usedPrefix}porn*
⬡│☂︎ *${usedPrefix}randomxxx*
⬡│☂︎ *${usedPrefix}breasts*
⬡│☂︎ *${usedPrefix}yaoi*
⬡│☂︎ *${usedPrefix}yaoi2*
⬡│☂ *${usedPrefix}yuri*
︎⬡│☂︎ *${usedPrefix}yuri2*
⬡│☂︎ *${usedPrefix}trapito*
⬡│☂︎ *${usedPrefix}hentai*
⬡│☂︎ *${usedPrefix}nsfwloli*
⬡│☂︎ *${usedPrefix}nsfworgy*
⬡│☂︎ *${usedPrefix}nsfwfoot*
⬡│☂︎ *${usedPrefix}nsfwass*
⬡│☂︎ *${usedPrefix}nsfwbdsm*
⬡│☂︎ *${usedPrefix}nsfwcum*
⬡│☂︎ *${usedPrefix}nsfwero*
⬡│☂︎ *${usedPrefix}nsfwfedom*
⬡│☂︎ *${usedPrefix}nsfwglass*
⬡│☂︎ *${usedPrefix}nsfwpdf* 
┬│☂︎ *${usedPrefix}hentaisearch*
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
