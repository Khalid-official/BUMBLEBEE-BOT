import moment from 'moment-timezone'

let handler = async (m, { conn }) => {
    const times = {
        'America/Lima': moment().tz('America/Lima').format('DD/MM HH:mm'),
        'America/Mexico_City': moment().tz('America/Mexico_City').format('DD/MM HH:mm'),
        'America/La_Paz': moment().tz('America/La_Paz').format('DD/MM HH:mm'),
        'America/Santiago': moment().tz('America/Santiago').format('DD/MM HH:mm'),
        'America/Argentina/Buenos_Aires': moment().tz('America/Argentina/Buenos_Aires').format('DD/MM HH:mm'),
        'America/Bogota': moment().tz('America/Bogota').format('DD/MM HH:mm'),
        'America/Guayaquil': moment().tz('America/Guayaquil').format('DD/MM HH:mm'),
        'America/Costa_Rica': moment().tz('America/Costa_Rica').format('DD/MM HH:mm'),
        'America/Havana': moment().tz('America/Havana').format('DD/MM HH:mm'),
        'America/Guatemala': moment().tz('America/Guatemala').format('DD/MM HH:mm'),
        'America/Tegucigalpa': moment().tz('America/Tegucigalpa').format('DD/MM HH:mm'),
        'America/Managua': moment().tz('America/Managua').format('DD/MM HH:mm'),
        'America/Panama': moment().tz('America/Panama').format('DD/MM HH:mm'),
        'America/Montevideo': moment().tz('America/Montevideo').format('DD/MM HH:mm'),
        'America/Caracas': moment().tz('America/Caracas').format('DD/MM HH:mm'),
        'America/Asuncion': moment().tz('America/Asuncion').format('DD/MM HH:mm'),
        'America/New_York': moment().tz('America/New_York').format('DD/MM HH:mm'),
        'Asia/Jakarta': moment().tz('Asia/Jakarta').format('DD/MM HH:mm'),
        'America/Sao_Paulo': moment().tz('America/Sao_Paulo').format('DD/MM HH:mm'),
        'Africa/Malabo': moment().tz('Africa/Malabo').format('DD/MM HH:mm'),
        'Asia/Almaty': moment().tz('Asia/Almaty').format('DD/MM HH:mm'),
        'Asia/Baghdad': moment().tz('Asia/Baghdad').format('DD/MM HH:mm'),
        'Asia/Bangkok': moment().tz('Asia/Bangkok').format('DD/MM HH:mm'),
        'Asia/Beirut': moment().tz('Asia/Beirut').format('DD/MM HH:mm'),
        'Asia/Calcutta': moment().tz('Asia/Calcutta').format('DD/MM HH:mm'),
        'Asia/Chongqing': moment().tz('Asia/Chongqing').format('DD/MM HH:mm'),
        'Asia/Dubai': moment().tz('Asia/Dubai').format('DD/MM HH:mm'),
        'Asia/Hong_Kong': moment().tz('Asia/Hong_Kong').format('DD/MM HH:mm'),
        'Asia/Kolkata': moment().tz('Asia/Kolkata').format('DD/MM HH:mm'),
        'Asia/Kuala_Lumpur': moment().tz('Asia/Kuala_Lumpur').format('DD/MM HH:mm'),
        'Asia/Manila': moment().tz('Asia/Manila').format('DD/MM HH:mm'),
        'Asia/Nicosia': moment().tz('Asia/Nicosia').format('DD/MM HH:mm'),
        'Asia/Pyongyang': moment().tz('Asia/Pyongyang').format('DD/MM HH:mm'),
        'Asia/Singapore': moment().tz('Asia/Singapore').format('DD/MM HH:mm'),
        'Asia/Taipei': moment().tz('Asia/Taipei').format('DD/MM HH:mm'),
        'Asia/Tokyo': moment().tz('Asia/Tokyo').format('DD/MM HH:mm'),
        'Australia/Sydney': moment().tz('Australia/Sydney').format('DD/MM HH:mm'),
        'Europe/Amsterdam': moment().tz('Europe/Amsterdam').format('DD/MM HH:mm'),
        'Europe/Berlin': moment().tz('Europe/Berlin').format('DD/MM HH:mm'),
        'Europe/London': moment().tz('Europe/London').format('DD/MM HH:mm'),
        'Europe/Paris': moment().tz('Europe/Paris').format('DD/MM HH:mm'),
        'Europe/Rome': moment().tz('Europe/Rome').format('DD/MM HH:mm'),
        'Europe/Stockholm': moment().tz('Europe/Stockholm').format('DD/MM HH:mm'),
        'Pacific/Auckland': moment().tz('Pacific/Auckland').format('DD/MM HH:mm'),
        'Pacific/Fiji': moment().tz('Pacific/Fiji').format('DD/MM HH:mm'),
        'Pacific/Tahiti': moment().tz('Pacific/Tahiti').format('DD/MM HH:mm'),
        'America/Los_Angeles': moment().tz('America/Los_Angeles').format('DD/MM HH:mm'),
        'America/Toronto': moment().tz('America/Toronto').format('DD/MM HH:mm'),
        'Asia/Seoul': moment().tz('Asia/Seoul').format('DD/MM HH:mm'),
        'Asia/Ho_Chi_Minh': moment().tz('Asia/Ho_Chi_Minh').format('DD/MM HH:mm'),
        'Africa/Cairo': moment().tz('Africa/Cairo').format('DD/MM HH:mm'),
        'Africa/Johannesburg': moment().tz('Africa/Johannesburg').format('DD/MM HH:mm'),
    };

    let text = `\`\`\`
「 WORLD-CLOCK ⏰ 」
⏱️Peru            : ${times['America/Lima']}
⏱️Mexico          : ${times['America/Mexico_City']}
⏱️Bolivia         : ${times['America/La_Paz']}
⏱️Chile           : ${times['America/Santiago']}
⏱️Argentina       : ${times['America/Argentina/Buenos_Aires']}
⏱️Colombia        : ${times['America/Bogota']}
⏱️Ecuador         : ${times['America/Guayaquil']}
⏱️Costa Rica      : ${times['America/Costa_Rica']}
⏱️Cuba            : ${times['America/Havana']}
⏱️Guatemala       : ${times['America/Guatemala']}
⏱️Honduras        : ${times['America/Tegucigalpa']}
⏱️Nicaragua       : ${times['America/Managua']}
⏱️Panama          : ${times['America/Panama']}
⏱️Uruguay         : ${times['America/Montevideo']}
⏱️Venezuela       : ${times['America/Caracas']}
⏱️Paraguay        : ${times['America/Asuncion']}
⏱️New York        : ${times['America/New_York']}
⏱️Jakarta         : ${times['Asia/Jakarta']}
⏱️Brazil          : ${times['America/Sao_Paulo']}
⏱️G.N.Q           : ${times['Africa/Malabo']}
⏱️Almaty          : ${times['Asia/Almaty']}
⏱️Baghdad         : ${times['Asia/Baghdad']}
⏱️Bangkok         : ${times['Asia/Bangkok']}
⏱️Beirut          : ${times['Asia/Beirut']}
⏱️Calcutta        : ${times['Asia/Calcutta']}
⏱️Chongqing       : ${times['Asia/Chongqing']}
⏱️Dubai           : ${times['Asia/Dubai']}
⏱️Hong Kong       : ${times['Asia/Hong_Kong']}
⏱️Kolkata         : ${times['Asia/Kolkata']}
⏱️Kuala Lumpur    : ${times['Asia/Kuala_Lumpur']}
⏱️Manila          : ${times['Asia/Manila']}
⏱️Nicosia         : ${times['Asia/Nicosia']}
⏱️Pyongyang       : ${times['Asia/Pyongyang']}
⏱️Singapore       : ${times['Asia/Singapore']}
⏱️Taipei          : ${times['Asia/Taipei']}
⏱️Tokyo           : ${times['Asia/Tokyo']}
⏱️Sydney          : ${times['Australia/Sydney']}
⏱️Amsterdam       : ${times['Europe/Amsterdam']}
⏱️Berlin          : ${times['Europe/Berlin']}
⏱️London          : ${times['Europe/London']}
⏱️Paris           : ${times['Europe/Paris']}
⏱️Rome            : ${times['Europe/Rome']}
⏱️Stockholm       : ${times['Europe/Stockholm']}
⏱️Auckland        : ${times['Pacific/Auckland']}
⏱️Fiji            : ${times['Pacific/Fiji']}
⏱️Tahiti          : ${times['Pacific/Tahiti']}
⏱️Los Angeles     : ${times['America/Los_Angeles']}
⏱️Toronto         : ${times['America/Toronto']}
⏱️Seoul           : ${times['Asia/Seoul']}
⏱️Ho Chi Minh     : ${times['Asia/Ho_Chi_Minh']}
⏱️Cairo           : ${times['Africa/Cairo']}
⏱️Johannesburg    : ${times['Africa/Johannesburg']}
\`\`\`
${String.fromCharCode(8206).repeat(850)}
Current server time zone:\n[ ${Intl.DateTimeFormat().resolvedOptions().timeZone} ]\n${moment().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('DD/MM/YY HH:mm:ss')}`;

    await conn.sendMessage(m.chat, { text: text }, { quoted: m });
}

handler.help = ['horario']
handler.tags = ['info']
handler.command = /^(worldclock)$/i

export default handler
