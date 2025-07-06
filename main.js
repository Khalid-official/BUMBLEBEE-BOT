process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1'; 
import './config.js';
import './api.js';
import {createRequire} from 'module';
import path, {join} from 'path';
import {fileURLToPath, pathToFileURL} from 'url';
import {platform} from 'process';
import {readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch} from 'fs';
import yargs from 'yargs';
import {spawn} from 'child_process';
import lodash from 'lodash';
import chalk from 'chalk';
import syntaxerror from 'syntax-error';
import {format} from 'util';
import pino from 'pino';
import Pino from 'pino';
import {Boom} from '@hapi/boom';
import {makeWASocket, protoType, serialize} from './src/libraries/simple.js';
import {initializeSubBots} from './src/libraries/subBotManager.js';
import {Low, JSONFile} from 'lowdb';
import store from './src/libraries/store.js';
const {DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, jidNormalizedUser, PHONENUMBER_MCC} = await import("baileys");
import readline from 'readline';
import NodeCache from 'node-cache';

const {chain} = lodash;
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;
let stopped = 'close';  
protoType();
serialize();

// Función mejorada para manejar Promises y objetos inmutables
global.safeResolve = async function(obj) {
    try {
        if (!obj) return obj;
        
        // Si es una Promise, la resolvemos
        if (typeof obj.then === 'function') {
            return await obj;
        }
        
        // No intentamos modificar objetos complejos (como mensajes)
        if (obj.key || obj.message) {
            return obj;
        }
        
        // Para objetos simples, creamos una copia
        if (typeof obj === 'object') {
            const result = Array.isArray(obj) ? [] : {};
            for (const key in obj) {
                result[key] = await global.safeResolve(obj[key]);
            }
            return result;
        }
        
        return obj;
    } catch (e) {
        console.error('Error en safeResolve:', e);
        return obj;
    }
};

const msgRetryCounterMap = new Map();
const msgRetryCounterCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });
const userDevicesCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });
const lidCache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });

global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
  return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString();
}; 

global.__dirname = function dirname(pathURL) {
  return path.dirname(global.__filename(pathURL, true));
}; 

global.__require = function require(dir = import.meta.url) {
  return createRequire(dir);
};

global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({...query, ...(apikeyqueryname ? {[apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]} : {})})) : '');

global.timestamp = {start: new Date};
global.videoList = [];
global.videoListXXX = [];
const __dirname = global.__dirname(import.meta.url);
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
global.prefix = new RegExp('^[#!/.]');
global.db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`));

global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) {
    return new Promise((resolve) => setInterval(async function() {
      if (!global.db.READ) {
        clearInterval(this);
        resolve(global.db.data == null ? global.loadDatabase() : global.db.data);
      }
    }, 1 * 1000));
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
await loadDatabase();

const {state, saveCreds} = await useMultiFileAuthState(global.authFile);
const { version } = await fetchLatestBaileysVersion();
let phoneNumber = global.botnumber || process.argv.find(arg => arg.startsWith('--phone='))?.split('=')[1];
const methodCodeQR = process.argv.includes('--method=qr');
const methodCode = !!phoneNumber || process.argv.includes('--method=code');
const MethodMobile = process.argv.includes("mobile");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (texto) => new Promise((resolver) => rl.question(texto, resolver));

let opcion;
if (methodCodeQR) {
  opcion = '1';
}
if (!methodCodeQR && !methodCode && !fs.existsSync(`./${authFile}/creds.json`)) {
  do {
    opcion = await question('[ ℹ️ ] Select an option:\n1. With QR code\n2. With 8-digit text code\n---> ');
    if (!/^[1-2]$/.test(opcion)) {
      console.log('[ ❗ ] Please select only 1 or 2.\n');
    }
  } while (opcion !== '1' && opcion !== '2' || fs.existsSync(`./${authFile}/creds.json`));
}

const filterStrings = [
  "Q2xvc2luZyBzdGFsZSBvcGVu", 
  "Q2xvc2luZyBvcGVuIHNlc3Npb24=", 
  "RmFpbGVkIHRvIGRlY3J5cHQ=", 
  "U2Vzc2lvbiBlcnJvcg==", 
  "RXJyb3I6IEJhZCBNQUM=", 
  "RGVjcnlwdGVkIG1lc3NhZ2U=" 
];

console.info = () => {};
console.debug = () => {};
['log', 'warn', 'error'].forEach(methodName => {
  const originalConsoleMethod = console[methodName];
  console[methodName] = function() {
    const message = arguments[0];
    if (typeof message === 'string' && filterStrings.some(filterString => message.includes(atob(filterString)))) {
      arguments[0] = "";
    }
    originalConsoleMethod.apply(console, arguments);
  };
});

process.on('uncaughtException', (err) => {
  if (filterStrings.includes(Buffer.from(err.message).toString('base64'))) return; 
  console.error('Uncaught Exception:', err);
});

const connectionOptions = {
  logger: pino({ level: 'silent' }),
  printQRInTerminal: opcion == '1' ? true : methodCodeQR ? true : false,
  mobile: MethodMobile, 
  browser: opcion === '1' ? ['TheBumbleBee', 'Safari', '2.0.0'] : methodCodeQR ? ['TheBumbleBee', 'Safari', '2.0.0'] : ['Ubuntu', 'Chrome', '20.0.04'],
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
    }
  },
  msgRetryCounterCache: msgRetryCounterCache,
  userDevicesCache: userDevicesCache,
  defaultQueryTimeoutMs: undefined,
  cachedGroupMetadata: (jid) => global.conn.chats[jid] ?? {},
  version: [2, 3000, 1023223821],
  keepAliveIntervalMs: 55000,
  maxIdleTimeMs: 60000,
};

global.conn = makeWASocket(connectionOptions);

if (!fs.existsSync(`./${authFile}/creds.json`)) {
  if (opcion === '2' || methodCode) {
    opcion = '2';
    if (!conn.authState.creds.registered) {
      if (MethodMobile) throw new Error('A pairing code cannot be used with the mobile API');

      let numeroTelefono;
      if (!!phoneNumber) {
        numeroTelefono = phoneNumber.replace(/[^0-9]/g, '');
        if (!Object.keys(PHONENUMBER_MCC).some(v => numeroTelefono.startsWith(v))) {
          console.log(chalk.bgBlack(chalk.bold.redBright("Start with the country code of your WhatsApp number.\nExample: +5219992095479\n")));
          process.exit(0);
        }
      } else {
        while (true) {
          numeroTelefono = await question(chalk.bgBlack(chalk.bold.yellowBright('Please enter your WhatsApp number.\nExample: +5219992095479\n')));
          numeroTelefono = numeroTelefono.replace(/[^0-9]/g, '');
          if (numeroTelefono.match(/^\d+$/) && Object.keys(PHONENUMBER_MCC).some(v => numeroTelefono.startsWith(v))) {
            break;
          } else {
            console.log(chalk.bgBlack(chalk.bold.redBright("Please enter your WhatsApp number.\nExample: +5219992095479.\n")));
          }
        }
        rl.close();  
      } 

      setTimeout(async () => {
        let codigo = await conn.requestPairingCode(numeroTelefono);
        codigo = codigo?.match(/.{1,4}/g)?.join("-") || codigo;
        console.log(chalk.yellow('[ ℹ️ ] enter the pairing code in WhatsApp.'));
        console.log(chalk.black(chalk.bgGreen(`Your pairing code: `)), chalk.black(chalk.white(code)));
}, 3000);
    }
  }
}

conn.isInit = false;
conn.well = false;
conn.logger.info(`[ㅤℹ️­ㅤ] STARTING...\n`);

if (!opts['test']) {
  if (global.db) {
    setInterval(async () => {
      if (global.db.data) await global.db.write();
      if (opts['autocleartmp'] && (global.support || {}).find) (tmp = [os.tmpdir(), 'tmp', 'jadibts'], tmp.forEach((filename) => cp.spawn('find', [filename, '-amin', '3', '-type', 'f', '-delete'])));
    }, 30 * 1000);
  }
}

if (opts['server']) (await import('./server.js')).default(global.conn, PORT);

async function resolveLidToRealJid(lidJid, groupJid, maxRetries = 3, retryDelay = 1000) {
    if (!lidJid?.endsWith("@lid") || !groupJid?.endsWith("@g.us")) {
        return lidJid?.includes("@") ? lidJid : `${lidJid}@s.whatsapp.net`;
    }

    const cached = lidCache.get(lidJid);
    if (cached) return cached;

    const lidToFind = lidJid.split("@")[0];
    let attempts = 0;

    while (attempts < maxRetries) {
        try {
            const metadata = await conn.groupMetadata(groupJid);
            if (!metadata?.participants) throw new Error("No se obtuvieron participantes");

            for (const participant of metadata.participants) {
                try {
                    if (!participant?.jid) continue;
                    const contactDetails = await conn.onWhatsApp(participant.jid);
                    if (!contactDetails?.[0]?.lid) continue;
                    
                    const possibleLid = contactDetails[0].lid.split("@")[0];
                    if (possibleLid === lidToFind) {
                        lidCache.set(lidJid, participant.jid);
                        return participant.jid;
                    }
                } catch (e) {
                    continue;
                }
            }
            
            lidCache.set(lidJid, lidJid);
            return lidJid;
        } catch (e) {
            attempts++;
            if (attempts >= maxRetries) {
                lidCache.set(lidJid, lidJid);
                return lidJid;
            }
            await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
    }
    return lidJid;
}

async function extractAndProcessLids(text, groupJid) {
    if (!text) return text;
    
    const lidMatches = text.match(/\d+@lid/g) || [];
    let processedText = text;
    
    for (const lid of lidMatches) {
        try {
            const realJid = await resolveLidToRealJid(lid, groupJid);
            processedText = processedText.replace(new RegExp(lid, 'g'), realJid);
        } catch (e) {
            console.error(`Error processing LID ${lid}:`, e);
        }
    }
    
    return processedText;
}

async function processLidsInMessage(message, groupJid) {
    if (!message || !message.key) return message;

    try {
        // Creamos una copia segura del mensaje para trabajar
        const messageCopy = {
            key: {...message.key},
            message: message.message ? {...message.message} : undefined,
            // Copiamos otras propiedades relevantes
            ...(message.quoted && {quoted: {...message.quoted}}),
            ...(message.mentionedJid && {mentionedJid: [...message.mentionedJid]})
        };

        const remoteJid = messageCopy.key.remoteJid || groupJid;
        
        // Procesamos participant en el key
        if (messageCopy.key?.participant?.endsWith('@lid')) {
            messageCopy.key.participant = await resolveLidToRealJid(messageCopy.key.participant, remoteJid);
        }

        // Procesamos contextInfo.participant
        if (messageCopy.message?.extendedTextMessage?.contextInfo?.participant?.endsWith('@lid')) {
            messageCopy.message.extendedTextMessage.contextInfo.participant = 
                await resolveLidToRealJid(
                    messageCopy.message.extendedTextMessage.contextInfo.participant, 
                    remoteJid
                );
        }

        // Procesamos mentionedJid
        if (messageCopy.message?.extendedTextMessage?.contextInfo?.mentionedJid) {
            const mentionedJid = messageCopy.message.extendedTextMessage.contextInfo.mentionedJid;
            if (Array.isArray(mentionedJid)) {
                for (let i = 0; i < mentionedJid.length; i++) {
                    if (mentionedJid[i]?.endsWith('@lid')) {
                        mentionedJid[i] = await resolveLidToRealJid(mentionedJid[i], remoteJid);
                    }
                }
            }
        }

        // Procesamos quotedMessage mentionedJid
        if (messageCopy.message?.extendedTextMessage?.contextInfo?.quotedMessage?.extendedTextMessage?.contextInfo?.mentionedJid) {
            const quotedMentionedJid = messageCopy.message.extendedTextMessage.contextInfo.quotedMessage.extendedTextMessage.contextInfo.mentionedJid;
            if (Array.isArray(quotedMentionedJid)) {
                for (let i = 0; i < quotedMentionedJid.length; i++) {
                    if (quotedMentionedJid[i]?.endsWith('@lid')) {
                        quotedMentionedJid[i] = await resolveLidToRealJid(quotedMentionedJid[i], remoteJid);
                    }
                }
            }
        }

        // Procesamos texto del mensaje
        if (messageCopy.message?.conversation) {
            messageCopy.message.conversation = await extractAndProcessLids(messageCopy.message.conversation, remoteJid);
        }
        
        if (messageCopy.message?.extendedTextMessage?.text) {
            messageCopy.message.extendedTextMessage.text = await extractAndProcessLids(messageCopy.message.extendedTextMessage.text, remoteJid);
        }

        // Estructuramos quoted
        if (messageCopy.message?.extendedTextMessage?.contextInfo?.participant && !messageCopy.quoted) {
            const quotedSender = await resolveLidToRealJid(
                messageCopy.message.extendedTextMessage.contextInfo.participant, 
                remoteJid
            );
            
            messageCopy.quoted = {
                sender: quotedSender,
                message: messageCopy.message.extendedTextMessage.contextInfo.quotedMessage
            };
        }

        return messageCopy;
    } catch (e) {
        console.error('Error in processLidsInMessage:', e);
        return message;
    }
}

async function connectionUpdate(update) {
    const {connection, lastDisconnect, isNewLogin} = update;
    stopped = connection;
    if (isNewLogin) conn.isInit = true;
    
    const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
    if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
        await global.reloadHandler(true).catch(console.error);
        global.timestamp.connect = new Date;
    }
    
    if (global.db.data == null) loadDatabase();
    
    if (update.qr != 0 && update.qr != undefined || methodCodeQR) {
        if (opcion == '1' || methodCodeQR) {
            console.log(chalk.yellow('[ㅤℹ️ㅤㅤ] Scan the QR code.'));
        }
    }
    
    if (connection == 'open') {
        console.log(chalk.yellow('[ㅤℹ️ㅤㅤ] Connected successfully.'));
        if (!global.subBotsInitialized) {
            global.subBotsInitialized = true;
            try {
                await initializeSubBots();
            } catch (error) {
                console.error(chalk.red('[ ❗ ] Error initializing sub-bots:'), error);
            }
        }
    }
    
    let reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
    if (reason == 405) {
        await fs.unlinkSync("./BumbleSession/" + "creds.json");
        console.log(chalk.bold.redBright(`[ ⚠ ] Connection replaced, Please wait a moment I'm going to reboot...\nIf errors appear, restart with: npm start`)); 
        process.send('reset');
    }
    
    if (connection === 'close') {
        if (reason === DisconnectReason.badSession) {
            conn.logger.error(`[ ⚠ ] Bad session, please delete the ${global.authFile} folder and scan again.`);
        } else if (reason === DisconnectReason.connectionClosed) {
            conn.logger.warn(`[ ⚠ ] Connection closed, reconnecting...`);
            await global.reloadHandler(true).catch(console.error);
        } else if (reason === DisconnectReason.connectionLost) {
            conn.logger.warn(`[ ⚠ ] Connection lost to server, reconnecting...`);
            await global.reloadHandler(true).catch(console.error);
        } else if (reason === DisconnectReason.connectionReplaced) {
            conn.logger.error(`[ ⚠ ] Connection replaced, another new session has been opened.`);
        } else if (reason === DisconnectReason.loggedOut) {
            conn.logger.error(`[ ⚠ ] Connection closed, please delete the ${global.authFile} folder and scan again.`);
        } else if (reason === DisconnectReason.restartRequired) {
            conn.logger.info(`[ ⚠ ] Reboot required, please restart the server if you have any problems.`);
            await global.reloadHandler(true).catch(console.error);
        } else if (reason === DisconnectReason.timedOut) {
            conn.logger.warn(`[ ⚠ ] Connection timed out, reconnecting...`);
            await global.reloadHandler(true).catch(console.error);
        } else {
            conn.logger.warn(`[ ⚠ ] Unknown disconnection reason. ${reason || ''}: ${connection || ''}`);
            await global.reloadHandler(true).catch(console.error);
        }
    }
}

process.on('uncaughtException', console.error);

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
        store?.bind(conn);
        isInit = true;
    }
    
    conn.spromote = 'https://github.com/Khalid-official *🐝@user HAS BEEN PROMOTED TO ADMINSHIP, ENJOY YOUR RANKING FHAM🥂*';
  conn.sdemote = 'https://github.com/Khalid-official *🐝@user HAS BEEN DEMOTED FROM ADMINSHIP, SO SHAMFULL😢*';
  conn.sDesc = 'https://github.com/Khalid-official *THE DESCRIPTION HAS BEEN MODIFIED*\n\n*NEW DESCRIPTION:* @desc'
  conn.sSubject = 'https://github.com/Khalid-official *🐝GROUP NAME HAS BEEN CHANGED🐝*\n*🐝NEW NAME🐝:* @subject'
  conn.sIcon = 'https://github.com/Khalid-official *🐝THE GROUP PHOTO HAS BEEN CHANGED🐝!!*'
  conn.sRevoke = 'https://github.com/Khalid-official *🐝GROUP LINK HAS BEEN REVOKED🐝!!*\n*NEW LINK:* @revoke';
    conn.handler = async (m) => {
        if (!m) return;
        
        try {
            const handlerInput = {
                messages: [],
                type: m.type || 'notify'
            };

            // Procesar batches de mensajes
            if (m.messages && Array.isArray(m.messages)) {
                for (const message of m.messages) {
                    if (message?.key) {
                        const processedMsg = await processLidsInMessage(message, message.key.remoteJid);
                        handlerInput.messages.push(processedMsg);
                    }
                }
            } 
            // Procesar mensaje individual
            else if (m?.key) {
                const processedMsg = await processLidsInMessage(m, m.key.remoteJid);
                handlerInput.messages.push(processedMsg);
            }

            // Llamar al handler solo si hay mensajes válidos
            if (handlerInput.messages.length > 0) {
                await handler.handler.call(global.conn, handlerInput);
            }
        } catch (e) {
            console.error('Error in conn.handler:', e);
        }
    };

    conn.ev.on('messages.upsert', async (update) => {
        try {
            const { messages, type } = update;
            if (!Array.isArray(messages)) return;

            await conn.handler({
                messages: messages.filter(m => m?.key),
                type
            });
        } catch (e) {
            console.error('Error en messages.upsert:', e);
        }
    });

    conn.ev.on('group-participants.update', async (update) => {
        try {
            if (update.participants) {
                update.participants = await Promise.all(
                    update.participants.filter(p => p).map(
                        async p => p.endsWith('@lid') ? await resolveLidToRealJid(p, update.id) : p
                    )
                );
            }
            handler.participantsUpdate.call(global.conn, update);
        } catch (e) {
            console.error('Error in group-participants.update:', e);
        }
    });

    const safeBind = (fn) => (...args) => {
        try {
            return fn.call(global.conn, ...args);
        } catch (e) {
            console.error('Error in event:', fn.name, e);
        }
    };

    conn.ev.on('groups.update', safeBind(handler.groupsUpdate));
    conn.ev.on('message.delete', safeBind(handler.deleteUpdate));
    conn.ev.on('call', safeBind(handler.callUpdate));
    conn.ev.on('connection.update', safeBind(connectionUpdate));
    conn.ev.on('creds.update', safeBind(saveCreds.bind(global.conn, true)));

    isInit = false;
    return true;
};

const pluginFolder = global.__dirname(join(__dirname, './plugins/index'));
const pluginFilter = (filename) => /\.js$/.test(filename);
global.plugins = {};

async function filesInit() {
  for (const filename of readdirSync(pluginFolder).filter(pluginFilter)) {
    try {
      const file = global.__filename(join(pluginFolder, filename));
      const module = await import(file);
      global.plugins[filename] = module.default || module;
    } catch (e) {
      conn.logger.error(e);
      delete global.plugins[filename];
    }
  }
}

await filesInit().then((_) => Object.keys(global.plugins)).catch(console.error);

global.reload = async (_ev, filename) => {
  if (pluginFilter(filename)) {
    const dir = global.__filename(join(pluginFolder, filename), true);
    if (filename in global.plugins) {
      if (existsSync(dir)) conn.logger.info(` updated plugin - '${filename}'`);
      else {
        conn.logger.warn(`deleted plugin - '${filename}'`);
        return delete global.plugins[filename];
      }
    } else conn.logger.info(`new plugin - '${filename}'`);
    
    const err = syntaxerror(readFileSync(dir), filename, {
      sourceType: 'module',
      allowAwaitOutsideFunction: true,
    });
    
    if (err) conn.logger.error(`syntax error while loading '${filename}'\n${format(err)}`);
    else {
      try {
        const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`));
        global.plugins[filename] = module.default || module;
      } catch (e) {
        conn.logger.error(`error require plugin '${filename}\n${format(e)}'`);
      } finally {
        global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)));
      }
    }
  }
};

Object.freeze(global.reload);
watch(pluginFolder, global.reload);
await global.reloadHandler();

function clearTmp() {
  const tmp = [join(__dirname, './src/tmp')];
  const filename = [];
  tmp.forEach((dirname) => readdirSync(dirname).forEach((file) => filename.push(join(dirname, file))));
  return filename.map((file) => {
    const stats = statSync(file);
    if (stats.isFile() && (Date.now() - stats.mtimeMs >= 1000 * 60 * 3)) return unlinkSync(file);
    return false;
  });
}

function purgeSession() {
  let prekey = [];
  let directorio = readdirSync("./BumbleSession");
  let filesFolderPreKeys = directorio.filter(file => file.startsWith('pre-key-'));
  prekey = [...prekey, ...filesFolderPreKeys];
  filesFolderPreKeys.forEach(files => {
    unlinkSync(`./BumbleSession/${files}`);
  });
} 

function purgeSessionSB() {
  try {
    let listaDirectorios = readdirSync('./jadibts/');
    let SBprekey = [];
    listaDirectorios.forEach(directorio => {
      if (statSync(`./jadibts/${directorio}`).isDirectory()) {
        let DSBPreKeys = readdirSync(`./jadibts/${directorio}`).filter(fileInDir => fileInDir.startsWith('pre-key-'));
        SBprekey = [...SBprekey, ...DSBPreKeys];
        DSBPreKeys.forEach(fileInDir => {
          unlinkSync(`./jadibts/${directorio}/${fileInDir}`);
        });
      }
    });
  } catch (err) {
    console.log(chalk.bold.red(`[ ℹ️ ] Something went wrong during deletion, files not deleted`));
  }
}

setInterval(async () => {
    if (stopped === 'close' || !conn || !conn.user) return;
  await purgeOldFiles();
  //console.log(chalk.cyanBright(`\n▣────────[ AUTO_PURGE_OLDFILES ]───────────···\n│\n▣─❧ ARCHIVOS ELIMINADOS ✅\n│\n▣────────────────────────────────────···\n`));
}, 1000 * 60 * 60);
setInterval(async () => {
  if (stopped === 'close' || !conn || !conn.user) return;
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
  global.support = {ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find};
  Object.freeze(global.support);
}

_quickTest().catch(console.error);
