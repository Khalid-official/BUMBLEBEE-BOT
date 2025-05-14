const handler = async (m, { conn }) => {
    const start = performance.now();
    const name = await conn.getName(m.sender);

    // Simulate processing delay (for speed test effect)
    await new Promise(resolve => setTimeout(resolve, 100));

    const end = performance.now();
    const speed = (end - start).toFixed(3);
    const uptime = clockString(process.uptime() * 1000);

    const info = `
🐝 *PING BOT STATUS* 🐝
=======================
🔸 *User:* ${name}
🔸 *Uptime:* ${uptime}
🔸 *Response Speed:* ${speed} ms
=======================
`.trim();

    await conn.sendMessage(m.chat, { text: info }, { quoted: m });
};

handler.help = ['ping', 'speed'];
handler.tags = ['info', 'tools'];
handler.command = /^(ping|speed|pong)$/i;

export default handler;

function clockString(ms) {
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}
