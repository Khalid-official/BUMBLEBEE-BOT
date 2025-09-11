process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1'
import './config.js' 
// import { startSub } from '../lib/loadJadi.js'
import { createRequire } from 'module'
import path, { join } from 'path'
import {fileURLToPath, pathToFileURL} from 'url'
import { platform } from 'process'
import * as ws from 'ws'
import LidResolver from '../lib/fixlids.js';
import fs, { watchFile, unwatchFile, writeFileSync, readdirSync, statSync, unlinkSync, existsSync, readFileSync, copyFileSync, watch, rmSync, readdir, stat, mkdirSync, rename, writeFile } from 'fs'
import yargs from 'yargs'
import { spawn } from 'child_process'
import lodash from 'lodash'
import chalk from 'chalk'
import syntaxerror from 'syntax-error'
import { tmpdir } from 'os'
import { format } from 'util'
import P from 'pino'
import pino from 'pino'
import Pino from 'pino'
import { Boom } from '@hapi/boom'
import { makeWASocket, protoType, serialize } from '../lib/simple.js'
import {Low, JSONFile} from 'lowdb'
import { mongoDB, mongoDBV2 } from '../lib/mongoDB.js'
import store from '../lib/store.js'
import readline from 'readline'
import NodeCache from 'node-cache'
import pkg from 'google-libphonenumber'
const { PhoneNumberUtil } = pkg
const phoneUtil = PhoneNumberUtil.getInstance()
const { makeInMemoryStore, DisconnectReason, useMultiFileAuthState, MessageRetryMap, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, Browsers } = await import('@whiskeysockets/baileys')
const { CONNECTING } = ws
const { chain } = lodash
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000
protoType()
serialize()
global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
  return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString();
}; global.__dirname = function dirname(pathURL) {
  return path.dirname(global.__filename(pathURL, true));
}; global.__require = function require(dir = import.meta.url) {
  return createRequire(dir);
};
global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({...query, ...(apikeyqueryname ? {[apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]} : {})})) : '')
global.timestamp = { start: new Date }
const __dirname = global.__dirname(import.meta.url);
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
global.prefix = new RegExp('^[' + (opts['prefix'] || '*/i!#$%+£¢€¥^°=¶∆×÷π√✓©®&.\\-.@').replace(/[|\\{}()[\]^$+*.\-\^]/g, '\\$&') + ']')
global.db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : new JSONFile('database.json'))
global.DATABASE = global.db; 
global.loadDatabase = async function loadDatabase() {
if (global.db.READ) {
return new Promise((resolve) => setInterval(async function() {
if (!global.db.READ) {
clearInterval(this);
resolve(global.db.data == null ? global.loadDatabase() : global.db.data);
}}, 1 * 1000));
}
if (global.db.data !== null) return;
global.db.READ = true;
await global.db.read().catch(console.error);
global.db.READ = null;
global.db.data = {
users: {},
chats: {},
stats: {},
msgs: {},
sticker: {},
settings: {},
...(global.db.data || {}),
};
global.db.chain = chain(global.db.data);
};
loadDatabase();


/* ------------------------------------------------*/

/**
 * Procesa texto para resolver LIDs en menciones (@) - VERSION MEJORADA
 */
async function processTextMentions(text, groupId) {
  if (!text || !groupId || !text.includes('@')) return text;

  const mentionRegex = /@(\d{8,20})/g;
  const mentions = [...text.matchAll(mentionRegex)];

  if (!mentions.length) return text;

  let processedText = text;
  const processedMentions = new Set(); // Evitar procesar la misma mención múltiples veces

  for (const mention of mentions) {
    const [fullMatch, lidNumber] = mention;

    // Evitar duplicados
    if (processedMentions.has(lidNumber)) continue;
    processedMentions.add(lidNumber);

    const lidJid = `${lidNumber}@lid`;

    try {
      const resolvedJid = await global.lidResolver.resolveLid(lidJid, groupId);
      if (resolvedJid && resolvedJid !== lidJid) {
        const resolvedNumber = resolvedJid.split('@')[0];

        // Reemplazar TODAS las ocurrencias de esta mención en el texto
        const globalRegex = new RegExp(`@${lidNumber}`, 'g');
        processedText = processedText.replace(globalRegex, `@${resolvedNumber}`);
      }
    } catch (error) {
      console.log(chalk.gray(`Error processing LID mention ${lidNumber}:`, error.message));
    }
  }

  return processedText;
}

/**
 * Intercepta y procesa mensajes antes del handler
 */
async function interceptMessages(messages) {
  if (!Array.isArray(messages)) return messages;

  const processedMessages = [];
  for (const message of messages) {
    try {
      const processedMessage = await global.lidResolver.processMessage(message);
      processedMessages.push(processedMessage);
    } catch (error) {
      console.log(chalk.gray('Error intercepting message:', error));
      processedMessages.push(message);
    }
  }

  return processedMessages;
}

/**
 * Obtener información de usuario por LID
 */
global.getUserInfoByLid = function(lidNumber) {
  if (!global.lidResolver) return null;
  return global.lidResolver.getUserInfo(lidNumber);
};

/**
 * Obtener información de usuario por JID
 */
global.getUserInfoByJid = function(jid) {
  if (!global.lidResolver) return null;
  return global.lidResolver.getUserInfoByJid(jid);
};

/**
 * Obtener LID de un JID (búsqueda inversa)
 */
global.findLidByJid = function(jid) {
  if (!global.lidResolver) return null;
  return global.lidResolver.findLidByJid(jid);
};

/**
 * Listar todos los usuarios en caché
 */
global.getAllCachedUsers = function() {
  if (!global.lidResolver) return [];
  return global.lidResolver.getAllUsers();
};

/**
 * Obtener estadísticas del caché LID
 */
global.getLidStats = function() {
  if (!global.lidResolver) return null;
  return global.lidResolver.getStats();
};

/**
 * Analizar y corregir números telefónicos en caché
 */
global.analyzePhoneNumbers = function() {
  if (!global.lidResolver) return null;
  return global.lidResolver.analyzePhoneNumbers();
};

/**
 * Corregir automáticamente números telefónicos
 */
global.autoCorrectPhoneNumbers = function() {
  if (!global.lidResolver) return null;
  return global.lidResolver.autoCorrectPhoneNumbers();
};

/**
 * Obtener usuarios por país
 */
global.getUsersByCountry = function() {
  if (!global.lidResolver) return {};
  return global.lidResolver.getUsersByCountry();
};

/**
 * Validar si un string es un número telefónico
 */
global.validatePhoneNumber = function(phoneNumber) {
  if (!global.lidResolver) return false;
  return global.lidResolver.phoneValidator.isValidPhoneNumber(phoneNumber);
};

/**
 * Detectar si un LID es realmente un número telefónico
 */
global.detectPhoneInLid = function(lidString) {
  if (!global.lidResolver) return { isPhone: false };
  return global.lidResolver.phoneValidator.detectPhoneInLid(lidString);
};

/**
 * Forzar guardado del caché LID
 */
global.forceSaveLidCache = function() {
  if (!global.lidResolver) return false;
  global.lidResolver.forceSave();
  return true;
};

/**
 * Función para mostrar estadísticas del caché LID
 */
global.getLidCacheInfo = function() {
  if (!global.lidResolver) {
    return 'LID system not initialized';
  }

const stats = global.lidResolver.getStats();
const analysis = global.lidResolver.analyzePhoneNumbers();

return `📱 *LID CACHE STATISTICS*

📊 *General:*
• Total entries: ${stats.total}
• Valid entries: ${stats.valid}
• Not found: ${stats.notFound}
• With errors: ${stats.errors}
• In processing: ${stats.processing}

📞 *Phone Numbers:*
• Detected: ${stats.phoneNumbers}
• Corrected: ${stats.corrected}
• Problematic: ${analysis.stats.phoneNumbersProblematic}

🗂️ *Cache:*
• File: ${stats.cacheFile}
• Exists: ${stats.fileExists ? 'Yes' : 'No'}
• Pending changes: ${stats.isDirty ? 'Yes' : 'No'}
• JID mappings: ${stats.jidMappings}

🌍 *Detected Countries:*
${Object.entries(global.lidResolver.getUsersByCountry())
  .slice(0, 5)
  .map(([country, users]) => `• ${country}: ${users.length} users`)
  .join('\n')}`;
};

/**
 * Función para forzar corrección de números telefónicos
 */
global.forcePhoneCorrection = function() {
  if (!global.lidResolver) {
    return 'LID system not initialized';
  }

  try {
    const result = global.lidResolver.autoCorrectPhoneNumbers();

    if (result.corrected > 0) {
      return `They were corrected ${result.corrected} phone numbers automatically.`;
    } else {
      return 'No phone numbers were found that require correction.';
    }
  } catch (error) {
    return `Error in automatic correction: ${error.message}`;
  }
};

global.creds = 'creds.json'
global.authFile = 'BumbleSession'
global.authFileJB  = 'BumbleJadiBot'
/*global.rutaBot = join(__dirname, authFile)
global.rutaJadiBot = join(__dirname, authFileJB)

if (!fs.existsSync(rutaJadiBot)) {
fs.mkdirSync(rutaJadiBot)
}
*/
const {state, saveState, saveCreds} = await useMultiFileAuthState(global.authFile)
const msgRetryCounterMap = new Map()
const msgRetryCounterCache = new NodeCache({ stdTTL: 0, checkperiod: 0 })
const userDevicesCache = new NodeCache({ stdTTL: 0, checkperiod: 0 })
const { version } = await fetchLatestBaileysVersion()
let phoneNumber = global.botNumberCode
const methodCodeQR = process.argv.includes("qr")
const methodCode = !!phoneNumber || process.argv.includes("code")
const MethodMobile = process.argv.includes("mobile")
let rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
terminal: true,
})

const question = (texto) => {
rl.clearLine(rl.input, 0)
return new Promise((resolver) => {
rl.question(texto, (respuesta) => {
rl.clearLine(rl.input, 0)
resolver(respuesta.trim())
})})
}

let opcion
if (methodCodeQR) {
opcion = '1'
}
if (!methodCodeQR && !methodCode && !fs.existsSync(`./${authFile}/creds.json`)) {
do {
let lineM = '┄╴───┈┈┈┈──┈┈┈┈───┈╴♡'
opcion = await question(`╭${lineM}  
│ ${chalk.blueBright('╭┄┈┅┈┄┈┅┈┄┅┈┄┈┅┄┈┅┈┄')}
│ ${chalk.blueBright('┊')} ${chalk.blue.bgBlue.bold.cyan("LINKING METHOD")}
│ ${chalk.blueBright('╰┄┈┅┈┄┈┅┈┄┅┈┄┈┅┄┈┅┈┄')}   
│ ${chalk.blueBright('╭┄┈┅┈┄┈┅┈┄┅┈┄┈┅┄┈┅┈┄')}     
│ ${chalk.blueBright('┊')} ${chalk.bold.redBright(`⇢  Opción 1:`)} ${chalk.greenBright("QR Code")}
│ ${chalk.blueBright('┊')} ${chalk.bold.redBright(`⇢  Opción 2:`)} ${chalk.greenBright("8-digit code")}
│ ${chalk.blueBright('╰┄┈┅┈┄┈┅┈┄┅┈┄┈┅┄┈┅┈┄')}
│ ${chalk.blueBright('╭┄┈┅┈┄┈┅┈┄┅┈┄┈┅┄┈┅┈┄')}     
│ ${chalk.blueBright('┊')} ${chalk.italic.magenta("Write only the number of")}
│ ${chalk.blueBright('┊')} ${chalk.italic.magenta("The option to connect")}
│ ${chalk.blueBright('╰┄┈┅┈┄┈┅┈┄┅┈┄┈┅┄┈┅┈┄')} 
│ ${chalk.italic.red(`Burst!!! 💥`)}
╰${lineM}\n${chalk.bold.magentaBright('---> ')}`)
if (!/^[1-2]$/.test(opcion)) {
console.log(chalk.bold.redBright(`NO NUMBERS ARE ALLOWED THAT ARE NOT ${chalk.bold.greenBright("1")} O ${chalk.bold.greenBright("2")}, NO SPECIAL LETTERS OR SYMBOLS.\n${chalk.bold.yellowBright("TIP: COPY THE OPTION NUMBER AND PASTE IT INTO THE CONSOLE.")}`))
}} while (opcion !== '1' && opcion !== '2' || fs.existsSync(`./${authFile}/creds.json`))
}

const filterStrings = [
"Q2xvc2luZyBzdGFsZSBvcGVu", // "Closing stable open"
"Q2xvc2luZyBvcGVuIHNlc3Npb24=", // "Closing open session"
"RmFpbGVkIHRvIGRlY3J5cHQ=", // "Failed to decrypt"
"U2Vzc2lvbiBlcnJvcg==", // "Session error"
"RXJyb3I6IEJhZCBNQUM=", // "Error: Bad MAC" 
"RGVjcnlwdGVkIG1lc3NhZ2U=" // "Decrypted message" 
]

console.info = () => {} 
console.debug = () => {} 
['log', 'warn', 'error'].forEach(methodName => redefineConsoleMethod(methodName, filterStrings))

const connectionOptions = {
logger: pino({ level: 'silent' }),
printQRInTerminal: opcion == '1' ? true : methodCodeQR ? true : false,
mobile: MethodMobile, 
browser: ['Windows', 'Chrome'],
auth: {
creds: state.creds,
keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
},
markOnlineOnConnect: false, 
generateHighQualityLinkPreview: true, 
syncFullHistory: false,
getMessage: async (key) => {
try {
let jid = jidNormalizedUser(key.remoteJid);
let msg = await store.loadMessage(jid, key.id);
return msg?.message || "";
} catch (error) {
return "";
}},
msgRetryCounterCache: msgRetryCounterCache || new Map(),
userDevicesCache: userDevicesCache || new Map(),
//msgRetryCounterMap,
defaultQueryTimeoutMs: undefined,
cachedGroupMetadata: (jid) => globalThis.conn.chats[jid] ?? {},
version: version, 
keepAliveIntervalMs: 55000, 
maxIdleTimeMs: 60000, 
};

global.conn = makeWASocket(connectionOptions)
global.lidResolver = new LidResolver(global.conn);

// Ejecutar análisis y corrección automática al inicializar (SILENCIOSO)
setTimeout(async () => {
  try {
    if (global.lidResolver) {
      // Ejecutar corrección automática de números telefónicos (sin logs)
      global.lidResolver.autoCorrectPhoneNumbers();
    }
  } catch (error) {
    console.log(chalk.gray('Error in initial analysis:', error.message));
  }
}, 5000);
if (!fs.existsSync(`./${authFile}/creds.json`)) {
if (opcion === '2' || methodCode) {
opcion = '2'
if (!conn.authState.creds.registered) {
let addNumber
if (!!phoneNumber) {
addNumber = phoneNumber.replace(/[^0-9]/g, '')
} else {
do {
phoneNumber = await question(chalk.bgBlack(chalk.bold.greenBright(`Please enter your WhatsApp number..\n${chalk.bold.yellowBright("TIP: Copy the WhatsApp number and paste it into the console.")}\n${chalk.bold.yellowBright("Example: +54123456789")}\n${chalk.bold.magentaBright('---> ')}`)))
phoneNumber = phoneNumber.replace(/\D/g,'')
if (!phoneNumber.startsWith('+')) {
phoneNumber = `+${phoneNumber}`
}
} while (!await isValidPhoneNumber(phoneNumber))
rl.close()
addNumber = phoneNumber.replace(/\D/g, '')
setTimeout(async () => {
let codeBot = await conn.requestPairingCode(addNumber)
codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot
console.log(chalk.bold.white(chalk.bgMagenta('LINKING CODE:')), chalk.bold.white(chalk.white(codeBot)))
}, 2000)
}}}
}

conn.isInit = false
conn.well = false

if (!opts['test']) {
if (global.db) setInterval(async () => {
if (global.db.data) await global.db.write()
if (opts['autocleartmp'] && (global.support || {}).find) (tmp = [os.tmpdir(), 'tmp', "BumbleJadiBot"], tmp.forEach(filename => cp.spawn('find', [filename, '-amin', '2', '-type', 'f', '-delete'])))}, 30 * 1000)}
//if (opts['server']) (await import('./server.js')).default(global.conn, PORT)
async function getMessage(key) {
if (store) {
} return {
conversation: 'SimpleBot',
}}
async function connectionUpdate(update) {  
const {connection, lastDisconnect, isNewLogin} = update
global.stopped = connection
if (isNewLogin) conn.isInit = true
const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
await global.reloadHandler(true).catch(console.error)

global.timestamp.connect = new Date
}
if (global.db.data == null) loadDatabase()
if (update.qr != 0 && update.qr != undefined || methodCodeQR) {
if (opcion == '1' || methodCodeQR) {
console.log(chalk.bold.yellow(`\n💥 SCAN THE QR CODE EXPIRES IN 45 SECONDS`))}
}
if (connection == 'open') {
console.log(chalk.bold.greenBright(`\n❒⸺⸺⸺⸺【• CONNECTED •】⸺⸺⸺⸺❒\n│\n│ 🟢 You have successfully connected to WhatsApp.\n│\n❒⸺⸺⸺⸺【• CONNECTED •】⸺⸺⸺⸺❒`))}
let reason = new Boom(lastDisconnect?.error)?.output?.statusCode
if (connection === 'close') {
if (reason === DisconnectReason.badSession) {
console.log(chalk.bold.cyanBright("⚠️ OFFLINE, DELETE THE ${global.authFile} FOLDER AND SCAN THE QR CODE ⚠️"))
} else if (reason === DisconnectReason.connectionClosed) {
console.log(chalk.bold.magentaBright("╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ☹\n┆ ⚠️ CONNECTION CLOSED, RECONNECTING....\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ☹"))
await global.reloadHandler(true).catch(console.error)
} else if (reason === DisconnectReason.connectionLost) {
console.log(chalk.bold.blueBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ☂\n┆ ⚠️ CONNECTION LOST TO SERVER, RECONNECTING....\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ☂`))
await global.reloadHandler(true).catch(console.error)
} else if (reason === DisconnectReason.connectionReplaced) {
console.log(chalk.bold.yellowBright("╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ✗\n┆ ⚠️ CONNECTION REPLACED, ANOTHER NEW SESSION HAS BEEN OPENED, PLEASE CLOSE THE CURRENT SESSION FIRST.\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ✗"))
} else if (reason === DisconnectReason.loggedOut) {
console.log(chalk.bold.redBright(`\n⚠️ NO CONNECTION, DELETE THE FOLDER ${global.authFile} AND SCAN THE QR CODE ⚠️`))
await global.reloadHandler(true).catch(console.error)
} else if (reason === DisconnectReason.restartRequired) {
console.log(chalk.bold.cyanBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ✓\n┆ ❇️ CONNECTING TO THE SERVER...\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ✓`))
await global.reloadHandler(true).catch(console.error)
} else if (reason === DisconnectReason.timedOut) {
console.log(chalk.bold.yellowBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ▸\n┆ ⌛ CONNECTION TIMED OUT, RECONNECTING....\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄ ▸`))
await global.reloadHandler(true).catch(console.error) //process.send('reset')
} else {
console.log(chalk.bold.redBright(`\n⚠️❗ UNKNOWN DISCONNECTION REASON: ${reason || 'Not found'} >> ${connection || 'Not found'}`))
}}
}
process.on('uncaughtException', console.error);

// <---• Iniciador de Sub-Bots •--->
// await startSub()

let isInit = true;
let handler = await import('./handler.js');
global.reloadHandler = async function(restatConn) {
try {
const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error);
if (Object.keys(Handler || {}).length) handler = Handler;
} catch (e) {
console.error(e);
}
if (restatConn) {
const oldChats = global.conn.chats;
try {
global.conn.ws.close();
} catch { }
conn.ev.removeAllListeners();
global.conn = makeWASocket(connectionOptions, {chats: oldChats});
isInit = true;
}
if (!isInit) {
conn.ev.off('messages.upsert', conn.handler)
conn.ev.off('connection.update', conn.connectionUpdate)
conn.ev.off('creds.update', conn.credsUpdate)
}

conn.handler = handler.handler.bind(global.conn)
conn.connectionUpdate = connectionUpdate.bind(global.conn)
conn.credsUpdate = saveCreds.bind(global.conn, true)

const currentDateTime = new Date()
const messageDateTime = new Date(conn.ev)
if (currentDateTime >= messageDateTime) {
const chats = Object.entries(conn.chats).filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats).map((v) => v[0])
} else {
const chats = Object.entries(conn.chats).filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats).map((v) => v[0])}

conn.ev.on('messages.upsert', conn.handler)
conn.ev.on('connection.update', conn.connectionUpdate)
conn.ev.on('creds.update', conn.credsUpdate)
isInit = false
return true
}

const pluginFolder = global.__dirname(join(__dirname, '../plugins/index'))
const pluginFilter = (filename) => /\.js$/.test(filename)
global.plugins = {}
async function filesInit() {
for (const filename of readdirSync(pluginFolder).filter(pluginFilter)) {
try {
const file = global.__filename(join(pluginFolder, filename))
const module = await import(file)
global.plugins[filename] = module.default || module
} catch (e) {
conn.logger.error(e)
delete global.plugins[filename]
}}}
filesInit().then((_) => Object.keys(global.plugins)).catch(console.error)

global.reload = async (_ev, filename) => {
if (pluginFilter(filename)) {
const dir = global.__filename(join(pluginFolder, filename), true)
if (filename in global.plugins) {
if (existsSync(dir)) conn.logger.info(` IT HAS BEEN UPDATED - '${filename}' SUCCESSFULLY`)
else {
conn.logger.warn(`A FILE WAS DELETED : '${filename}'`)
return delete global.plugins[filename];
}
} else conn.logger.info(`A NEW PLUGINS WAS DETECTED : '${filename}'`)
const err = syntaxerror(readFileSync(dir), filename, {
sourceType: 'module',
allowAwaitOutsideFunction: true,
});
if (err) conn.logger.error(`A SYNTAX ERROR WAS DETECTED | '${filename}'\n${format(err)}`);
else {
try {
const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`));
global.plugins[filename] = module.default || module;
} catch (e) {
conn.logger.error(`THERE IS AN ERROR REQUIRES THE PLUGINS '${filename}\n${format(e)}'`);
} finally {
global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)));
}}}};
Object.freeze(global.reload);
watch(pluginFolder, global.reload);
await global.reloadHandler();
async function _quickTest() {
const test = await Promise.all([
spawn('ffmpeg'),
spawn('ffprobe'),
spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
spawn('convert'),
spawn('magick'),
spawn('gm'),
spawn('find', ['--version']),
].map((p) => {
return Promise.race([
new Promise((resolve) => {
p.on('close', (code) => {
resolve(code !== 127);
});
}),
new Promise((resolve) => {
p.on('error', (_) => resolve(false));
})]);
}));
const [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test;
const s = global.support = {ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find};
Object.freeze(global.support);
}

// Limpiar y optimizar caché LID cada 30 minutos
setInterval(async () => {
  if (stopped === 'close' || !conn || !conn?.user || !global.lidResolver) return;

  try {
    const stats = global.lidResolver.getStats();

    // Si el caché tiene más de 800 entradas, hacer limpieza
    if (stats.total > 800) {
      // Eliminar entradas antiguas (más de 7 días) que no se han encontrado
      const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
      let cleanedCount = 0;

      for (const [key, entry] of global.lidResolver.cache.entries()) {
        if (entry.timestamp < sevenDaysAgo && (entry.notFound || entry.error)) {
          global.lidResolver.cache.delete(key);
          if (entry.jid && global.lidResolver.jidToLidMap.has(entry.jid)) {
            global.lidResolver.jidToLidMap.delete(entry.jid);
          }
          cleanedCount++;
        }
      }

      if (cleanedCount > 0) {
        global.lidResolver.markDirty();
      }
    }

    // Ejecutar corrección automática ocasionalmente
    if (Math.random() < 0.1) { // 10% de probabilidad
      const correctionResult = global.lidResolver.autoCorrectPhoneNumbers();
    }
  } catch (error) {
    console.log(chalk.gray('Error en limpieza de caché LID:', error.message));
  }
}, 30 * 60 * 1000); // Cada 30 minutos

// Manejo mejorado de salida del proceso
const gracefulShutdown = () => {
  if (global.lidResolver?.isDirty) {
    try {
      global.lidResolver.forceSave();
    } catch (error) {
      console.log(chalk.gray('Error saving LID cache:', error.message));
    }
  }
};

process.on('exit', gracefulShutdown);

process.on('SIGINT', () => {
  gracefulShutdown();
  process.exit(0);
});

process.on('SIGTERM', () => {
  gracefulShutdown();
  process.exit(0);
});

// Manejo de errores no capturadas relacionadas con LID
process.on('unhandledRejection', (reason, promise) => {
  if (reason && reason.message && reason.message.includes('lid')) {
    console.log(chalk.gray('Unhandled error related to LID:', reason));
  }
});

function clearTmp() {
const tmpDir = join(__dirname, 'tmp')
const filenames = readdirSync(tmpDir)
filenames.forEach(file => {
const filePath = join(tmpDir, file)
unlinkSync(filePath)})
}
function purgeSession() {
let prekey = []
let directorio = readdirSync("./BumbleSession")
let filesFolderPreKeys = directorio.filter(file => {
return file.startsWith('pre-key-')
})
prekey = [...prekey, ...filesFolderPreKeys]
filesFolderPreKeys.forEach(files => {
unlinkSync(`./BumbleSession/${files}`)
})
} 
function purgeSessionSB() {
try {
const listaDirectorios = readdirSync(`./${authFileJB}/`);
let SBprekey = [];
listaDirectorios.forEach(directorio => {
if (statSync(`./${authFileJB}/${directorio}`).isDirectory()) {
const DSBPreKeys = readdirSync(`./${authFileJB}/${directorio}`).filter(fileInDir => {
return fileInDir.startsWith('pre-key-')
})
SBprekey = [...SBprekey, ...DSBPreKeys];
DSBPreKeys.forEach(fileInDir => {
if (fileInDir !== 'creds.json') {
unlinkSync(`./${authFileJB}/${directorio}/${fileInDir}`)
}})
}})
if (SBprekey.length === 0) {
console.log(chalk.bold.green(`\n╭» 🟡 BumbleJadiBot 🟡\n│→ NOTHING TO DELETE \n╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️♻️`))
} else {
console.log(chalk.bold.cyanBright(`\n╭» ⚪ BumbleJadiBot ⚪\n│→ NON-ESSENTIAL FILES DELETED\n╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️♻️`))
}} catch (err) {
console.log(chalk.bold.red(`\n╭» 🔴 BumbleJadiBot 🔴\n│→ AN ERROR OCCURRED\n╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️♻️\n` + err))
}}
function purgeOldFiles() {
const directories = ['./BumbleSession/', './BumbleJadiBot/']
directories.forEach(dir => {
readdirSync(dir, (err, files) => {
if (err) throw err
files.forEach(file => {
if (file !== 'creds.json') {
const filePath = path.join(dir, file);
unlinkSync(filePath, err => {
if (err) {
console.log(chalk.bold.red(`\n╭» 🔴 ARCHIVE 🔴\n│→ ${file} IT WASN'T ABLE TO DELETE\n╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️❌\n` + err))
} else {
console.log(chalk.bold.green(`\n╭» 🟣 ARCHIVE 🟣\n│→ ${file} DELETED SUCCESSFULLY\n╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️♻️`))
} }) }
}) }) }) }
function redefineConsoleMethod(methodName, filterStrings) {
const originalConsoleMethod = console[methodName]
console[methodName] = function() {
const message = arguments[0]
if (typeof message === 'string' && filterStrings.some(filterString => message.includes(atob(filterString)))) {
arguments[0] = ""
}
originalConsoleMethod.apply(console, arguments)
}}
setInterval(async () => {
if (stopped === 'close' || !conn || !conn.user) return
await clearTmp()
console.log(chalk.bold.cyanBright(`\n╭» 🟢 MULTIMEDIA 🟢\n│→ FILES FROM TMP FOLDER DELETED\n╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️♻️`))}, 1000 * 60 * 4) // 4 min 

setInterval(async () => {
if (stopped === 'close' || !conn || !conn.user) return
await purgeOldFiles()
console.log(chalk.bold.cyanBright(`\n╭» 🟠 FILES 🟠\n│→ RESIDUAL FILES DELETED\n╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️♻️`))}, 1000 * 60 * 10)

setInterval(async () => {
if (stopped === 'close' || !conn || !conn?.user) return;
  const bumblebeeFacts = [
  "🐝 ʙᴜᴍʙʟᴇʙᴇᴇ ᴏꜰᴛᴇɴ ᴜsᴇs ʜɪs ᴇɴᴠɪʀᴏɴᴍᴇɴᴛ ᴛᴏ ɢᴀɪɴ ᴀ ᴛᴀᴄᴛɪᴄᴀʟ ᴀᴅᴠᴀɴᴛᴀɢᴇ ɪɴ ʙᴀᴛᴛʟᴇ. 🍯",
  "🐝 ʙᴜᴍʙʟᴇʙᴇᴇ's sᴍᴀʟʟᴇʀ sɪᴢᴇ ᴀʟʟᴏᴡs ʜɪᴍ ᴛᴏ sʟɪᴘ ᴘᴀsᴛ ᴇɴᴇᴍʏ ᴅᴇꜰᴇɴsᴇs. 🍯",
  "🐝 ʙᴜᴍʙʟᴇʙᴇᴇ ᴄᴀɴ ɢᴏ ꜰʀᴏᴍ ɪɴᴠɪsɪʙʟᴇ ᴛᴏ ᴀᴛᴛᴀᴄᴋ ɪɴ sᴇᴄᴏɴᴅs, sᴜʀᴘʀɪsɪɴɢ ʜɪs ꜰᴏᴇs. 🍯",
  "🐝 ᴡʜɪʟᴇ ꜰɪɢʜᴛɪɴɢ, ʙᴜᴍʙʟᴇʙᴇᴇ ᴏꜰᴛᴇɴ ᴅɪsᴘʟᴀʏs ɪɴᴄʀᴇᴅɪʙʟᴇ ᴄᴏᴜʀᴀɢᴇ ᴛʜᴀᴛ ɪɴsᴘɪʀᴇs ʜɪs ᴛᴇᴀᴍ. 🍯",
  "🐝 ʙᴜᴍʙʟᴇʙᴇᴇ's ꜰɪɢʜᴛɪɴɢ ʟᴏʏᴀʟᴛʏ ᴏꜰᴛᴇɴ ᴅʀɪᴠᴇs ʜɪᴍ ᴛᴏ ʀɪsᴋ ʜɪs ʟɪꜰᴇ ꜰᴏʀ ᴏᴛʜᴇʀs. 🍯",
  "🐝 ʙᴜᴍʙʟᴇʙᴇᴇ ᴏꜰᴛᴇɴ ᴛᴀᴋᴇs ᴏɴ ᴇɴᴇᴍɪᴇs ᴍᴜᴄʜ ʟᴀʀɢᴇʀ ᴛʜᴀɴ ʜɪᴍ, ᴜsɪɴɢ ʙʀᴀɪɴ ᴏᴠᴇʀ ʙʀᴀᴡɴ. 🍯",
  "🐝 ᴅᴇsᴘɪᴛᴇ ɪɴᴊᴜʀɪᴇs, ʙᴜᴍʙʟᴇʙᴇᴇ ᴋᴇᴇᴘs ꜰɪɢʜᴛɪɴɢ ᴛᴏ ᴘʀᴏᴛᴇᴄᴛ ʜɪs ᴄᴀᴜsᴇ. 🍯",
  "🐝 ʙᴜᴍʙʟᴇʙᴇᴇ ᴍᴀʏ ʙᴇ sᴍᴀʟʟ, ʙᴜᴛ ʜᴇ ɪs ᴀ ꜰᴇʀᴏᴄɪᴏᴜs ᴡᴀʀʀɪᴏʀ ɪɴ ʙᴀᴛᴛʟᴇ. 🍯",
  "🐝 ʙᴜᴍʙʟᴇʙᴇᴇ ᴜsᴇs ᴀɢɪʟɪᴛʏ ᴀɴᴅ sᴘᴇᴇᴅ ᴛᴏ ᴏᴜᴛᴍᴀɴᴇᴜᴠᴇʀ ᴇɴᴇᴍɪᴇs. 🍯",
  "🐝 ʙᴜᴍʙʟᴇʙᴇᴇ ᴄᴀɴ ᴄᴏᴍʙɪɴᴇ ʜᴀɴᴅ-ᴛᴏ-ʜᴀɴᴅ ᴄᴏᴍʙᴀᴛ ᴡɪᴛʜ ᴡᴇᴀᴘᴏɴʀʏ ꜰᴏʀ ᴍᴀxɪᴍᴜᴍ ɪᴍᴘᴀᴄᴛ. 🍯",
  "🐝 ᴅᴜʀɪɴɢ ꜰɪɢʜᴛs, ʙᴜᴍʙʟᴇʙᴇᴇ ᴏꜰᴛᴇɴ sᴀᴄʀɪꜰɪᴄᴇs ʜɪᴍsᴇʟꜰ ᴛᴏ ᴘʀᴏᴛᴇᴄᴛ ʜɪs ᴀʟʟɪᴇs. 🍯",
  "🐝 ʙᴜᴍʙʟᴇʙᴇᴇ's ᴄᴏᴍʙᴀᴛ sᴛʏʟᴇ ɪs ᴀ ʙʟᴇɴᴅ ᴏꜰ ᴀᴄʀᴏʙᴀᴛɪᴄs ᴀɴᴅ sᴜʀᴘʀɪsᴇ ᴀᴛᴛᴀᴄᴋs. 🍯",
  "🐝 ʙᴜᴍʙʟᴇʙᴇᴇ ɴᴇᴠᴇʀ ɢɪᴠᴇs ᴜᴘ, ᴇᴠᴇɴ ᴡʜᴇɴ ꜰᴀᴄɪɴɢ ʟᴀʀɢᴇʀ ᴀɴᴅ sᴛʀᴏɴɢᴇʀ ꜰᴏᴇs. 🍯",
  "🐝 ʜɪs ᴀʀᴍ-ᴄᴀɴɴᴏɴs ᴀɴᴅ ʙʟᴀᴅᴇs ᴀʀᴇ sᴘᴇᴄɪᴀʟʟʏ ᴅᴇsɪɢɴᴇᴅ ꜰᴏʀ ᴄʟᴏsᴇ-ʀᴀɴɢᴇ ᴀɴᴅ ᴍɪᴅ-ʀᴀɴɢᴇ ʙᴀᴛᴛʟᴇs. 🍯",
  "🐝 ᴡʜᴇɴ ɪɴ ᴄᴏᴍʙᴀᴛ, ʙᴜᴍʙʟᴇʙᴇᴇ ᴜsᴇs ʜɪs ᴄʀᴇᴀᴛɪᴠɪᴛʏ ᴛᴏ ᴛᴜʀɴ ᴛʜᴇ ᴛɪᴅᴇ ᴏꜰ ʙᴀᴛᴛʟᴇ. 🍯",
  "🐝 ʙᴜᴍʙʟᴇʙᴇᴇ ɪs ᴏɴᴇ ᴏꜰ ᴛʜᴇ ᴍᴏsᴛ ʟᴏʏᴀʟ ᴀᴜᴛᴏʙᴏᴛs. 🍯",
  "🐝 ʙᴜᴍʙʟᴇʙᴇᴇ ᴄᴀɴ ᴛʀᴀɴsꜰᴏʀᴍ ɪɴᴛᴏ ᴀ ᴄᴀᴍᴀʀᴏ ᴏʀ ᴀ ᴠᴏʟᴋsᴡᴀɢᴇɴ ʙᴇᴇᴛʟᴇ. 🍯",
  "🐝 ʙᴜᴍʙʟᴇʙᴇᴇ's ᴠᴏɪᴄᴇ ɪs ᴅɪꜰꜰᴇʀᴇɴᴛ ᴛʜᴀɴ ᴏᴛʜᴇʀ ᴀᴜᴛᴏʙᴏᴛs, ᴍᴀᴋɪɴɢ ʜɪᴍ ᴇᴀsɪʟʏ ᴅɪsᴛɪɴᴄᴛ. 🍯",
];

  const bio = bumblebeeFacts[Math.floor(Math.random() * bumblebeeFacts.length)];
  // Optional: keep your uptime logic in case you want it elsewhere
  const _uptime = process.uptime() * 1000;
  const uptime = clockString(_uptime);
  // Update profile status with the random fact
  await conn?.updateProfileStatus(bio).catch((_) => _);
}, 60000);

function clockString(ms) {
  const d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [d, 'd ️', h, 'h ', m, 'm ', s, 's '].map((v) => v.toString().padStart(2, 0)).join('');
}
_quickTest().catch(console.error);

_quickTest().then(() => conn.logger.info(chalk.bold(`🚩  H E C H O\n`.trim()))).catch(console.error)

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
unwatchFile(file)
console.log(chalk.bold.greenBright("Actualizado"))
import(`${file}?update=${Date.now()}`)
})

async function isValidPhoneNumber(number) {
try {
number = number.replace(/\s+/g, '')
// Si el número empieza con '+521' o '+52 1', quitar el '1'
if (number.startsWith('+521')) {
number = number.replace('+521', '+52'); // Cambiar +521 a +52
} else if (number.startsWith('+52') && number[4] === '1') {
number = number.replace('+52 1', '+52'); // Cambiar +52 1 a +52
}
const parsedNumber = phoneUtil.parseAndKeepRawInput(number)
return phoneUtil.isValidNumber(parsedNumber)
} catch (error) {
return false
}}