import {  
    youtubedl, 
    youtubedlv2,
    youtubeSearch 
} from '@bochilteam/scraper' 

var handler = async (m, { conn, args, usedPrefix, command }) => { 
    if (!args[0]) throw '[❗𝐈𝐍𝐅𝐎❗] 𝗘𝗻𝘁𝗲𝗿 𝘁𝗵𝗲 𝗻𝗮𝗺𝗲 𝗼𝗿 𝘁𝗵𝗲 𝘁𝗶𝘁𝗹𝗲 𝗼𝗳 𝘁𝗵𝗲 𝘀𝗼𝗻𝗴 𝘂𝘀𝗶𝗻𝗴 𝘁𝗵𝗲 𝗳𝗼𝗹𝗹𝗼𝘄𝗶𝗻𝗴 𝗰𝗼𝗺𝗺𝗮𝗻𝗱 *\n\n*—◉ 𝗘𝘅𝗮𝗺𝗽𝗹𝗲:*\n*play Hello Adele*' 
    let q = '128kbps' 
    let searchText = args.join(' ') // Join args to create the search text

    // Search for YouTube videos by the search text
    const searchResults = await youtubeSearch(searchText)
    if (!searchResults || searchResults.video.length === 0) throw '*[❗𝐈𝐍𝐅𝐎❗] No results found*'
    
    // Get the first video from the search results
    const v = searchResults.video[0].url 
   
    // Get info from the video
    const yt = await youtubedl(v).catch(async () => await youtubedlv2(v)) 
    const dl_url = await yt.audio[q].download() 
    const ttl = await yt.title 
    const size = await yt.audio[q].fileSizeH 
 
    await m.reply('*[❗𝐈𝐍𝐅𝐎❗] YouTube audio/mp3 download requests are being processed, please be patient...*') 

    // Display file info along with thumbnail 
    const info = ` 
▢ Title: ${ttl} 
▢ Size: ${size} 
▢ Url: ${v}\n\n*_🐝Gen® By Bumblebee Bot🐝_*` 

    // Send message and audio file to the user with the new caption
    await conn.sendMessage(m.chat, {  
        document: { url: dl_url },  
        mimetype: 'audio/mpeg',  
        fileName: `${ttl}.mp3`, 
        caption: info 
    }, {quoted: m}) 
    await conn.sendMessage(m.chat, {  
        audio: { url: dl_url },  
        mimetype: 'audio/mpeg',  
        fileName: `${ttl}.mp3`, 
        caption: info 
    }, {quoted: m}) 
} 

// Tags and command handler
handler.tags = ['downloader'] 
handler.command = /^play|song|getaud|audio$/i 
export default handler
