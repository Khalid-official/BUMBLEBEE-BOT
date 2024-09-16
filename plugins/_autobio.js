let handler = m => m
handler.all = async function (m) {
    let setting = global.db.data.settings[this.user.jid]
    
    let _muptime
    if (process.send) {
        process.send('uptime')
        _muptime = await new Promise(resolve => {
            process.once('message', resolve)
            setTimeout(resolve, 1000)
        }) * 1000
    }
    let muptime = clockString(_muptime)

    // Bumblebee facts
    const bumblebeeFacts = [
    "*Bumblebee is one of the most loyal Autobots.*",
    "*Bumblebee can transform into a Camaro or a Volkswagen Beetle.*",
    "*Bumblebee has a strong sense of justice.*",
    "*In the movie, Bumblebee is shown to have a deep bond with Charlie.*",
    "*Bumblebee often uses his horn to communicate when his voice box is damaged.*",
    "*Bumblebee's voice box was damaged in the first film, which is why he uses radio signals to communicate.*",
    "*In 'Bumblebee,' he is depicted as having a more emotional and vulnerable side compared to other Transformers.*",
    "*Bumblebee has a special ability to disguise himself as a different vehicle to blend in with human society.*",
    "*He is one of the original Transformers from the '80s cartoon series and has been a fan favorite ever since.*",
    "*Bumblebee's car form is often seen as a symbol of freedom and youthfulness.*",
    "*In the Transformers universe, Bumblebee has been shown to have excellent combat skills despite his small size.*",
    "*Bumblebee's color scheme in the films is inspired by his classic yellow and black design from the original cartoons.*"
]


    // Pick a random fact
    const randomFact = bumblebeeFacts[Math.floor(Math.random() * bumblebeeFacts.length)]

    // Update bio
    let bio = `\n𝐂𝐨𝐧𝐬𝐭 𝐎𝐰𝐧𝐞𝐫 = 𝐫𝐞𝐪𝐮𝐢𝐫𝐞 ('./𝐊𝐡𝐚𝐥𝐢𝐝𝐎𝐟𝐜') ${muptime}\n\n
    
    Bumblebee🐝 Facts💯: ${randomFact}\n\n ┃ᴄᴏᴘʏʀɪɢʜᴛ© 2024`
    await this.updateProfileStatus(bio).catch(_ => _)
    setting.status = new Date() * 1
}

export default handler

function clockString(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [d, ' Day(s) ️', h, ' Hour(s) ', m, ' Minute(s)'].map(v => v.toString().padStart(2, 0)).join('')
}
