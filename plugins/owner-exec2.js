import cp, { exec as _exec } from 'child_process'
import { promisify } from 'util'
let exec = promisify(_exec).bind(cp)
let handler = async (m, { conn, isOwner, command, text, usedPrefix, args, isROwner }) => {
if (!isROwner) return  
if (global.conn.user.jid != conn.user.jid) return
m.reply('https://github.com/Khalid-official *[❗𝐈𝐍𝐅𝐎❗]  Executing order...*')
let o
try {
o = await exec(command.trimStart()  + ' ' + text.trimEnd())
} catch (e) {
o = e
} finally {
let { stdout, stderr } = o
if (stdout.trim()) m.reply(stdout)
if (stderr.trim()) m.reply(stderr)
}}
handler.customPrefix = /^[$]/
handler.command = new RegExp
export default handler
