'use strict';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
import "./config.js";
import "./api.js";
import { createRequire } from "module";
import _0x460797, { join } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { platform } from "process";
import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch } from "fs";
import _0x342fa3 from "yargs";
import { spawn } from "child_process";
import _0x3a7d58 from "lodash";
import _0x5311dc from "chalk";
import _0x2d33b9 from "syntax-error";
import { format } from "util";
import _0x5c39fe from "pino";
import _0x5b4718 from "pino";
import { Boom } from "@hapi/boom";
import { makeWASocket, protoType, serialize } from "./src/libraries/simple.js";
import { Low, JSONFile } from "lowdb";
import _0x3f0dc2 from "./src/libraries/store.js";
const {
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  jidNormalizedUser,
  PHONENUMBER_MCC
} = await import("baileys");
import _0x7da84a from "readline";
import _0x5cbf08 from "node-cache";
const {
  chain
} = _0x3a7d58;
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;
let stopped = "close";
protoType();
serialize();
const msgRetryCounterMap = new Map();
const msgRetryCounterCache = new _0x5cbf08({
  stdTTL: 0,
  checkperiod: 0
});
const userDevicesCache = new _0x5cbf08({
  stdTTL: 0,
  checkperiod: 0
});
global.__filename = function filename(_0x2c7411 = import.meta.url, _0x3999d9 = platform !== "win32") {
  if (_0x3999d9) {
    if (/file:\/\/\//.test(_0x2c7411)) {
      return fileURLToPath(_0x2c7411);
    } else {
      return _0x2c7411;
    }
  } else {
    return pathToFileURL(_0x2c7411).toString();
  }
};
global.__dirname = function dirname(_0x4993b7) {
  return _0x460797.dirname(global.__filename(_0x4993b7, true));
};
global.__require = function require(_0x4b2295 = import.meta.url) {
  return createRequire(_0x4b2295);
};
global.API = (_0x2d472f, _0x4ace7f = "/", _0x5063f8 = {}, _0x551186) => (_0x2d472f in global.APIs ? global.APIs[_0x2d472f] : _0x2d472f) + _0x4ace7f + (_0x5063f8 || _0x551186 ? "?" + new URLSearchParams(Object.entries({
  ..._0x5063f8,
  ...(_0x551186 ? {
    [_0x551186]: global.APIKeys[_0x2d472f in global.APIs ? global.APIs[_0x2d472f] : _0x2d472f]
  } : {})
})) : "");
global.timestamp = {
  start: new Date()
};
global.videoList = [];
global.videoListXXX = [];
const __dirname = global.__dirname(import.meta.url);
global.opts = new Object(_0x342fa3(process.argv.slice(2)).exitProcess(false).parse());
global.prefix = new RegExp('^[' + (opts['prefix'] || '*/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-.@').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']');
global.db = new Low(/https?:\/\//.test(opts.db || "") ? new cloudDBAdapter(opts.db) : new JSONFile((opts._[0] ? opts._[0] + "_" : "") + "database.json"));
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) {
    return new Promise(_0x1f54a2 => setInterval(async function () {
      if (!global.db.READ) {
        clearInterval(this);
        _0x1f54a2(global.db.data == null ? global.loadDatabase() : global.db.data);
      }
    }, 1000));
  }
  if (global.db.data !== null) {
    return;
  }
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
    ...(global.db.data || {})
  };
  global.db.chain = chain(global.db.data);
};
loadDatabase();
global.chatgpt = new Low(new JSONFile(_0x460797.join(__dirname, "/db/chatgpt.json")));
global.loadChatgptDB = async function loadChatgptDB() {
  if (global.chatgpt.READ) {
    return new Promise(_0x130ea4 => setInterval(async function () {
      if (!global.chatgpt.READ) {
        clearInterval(this);
        _0x130ea4(global.chatgpt.data === null ? global.loadChatgptDB() : global.chatgpt.data);
      }
    }, 1000));
  }
  if (global.chatgpt.data !== null) {
    return;
  }
  global.chatgpt.READ = true;
  await global.chatgpt.read().catch(console.error);
  global.chatgpt.READ = null;
  global.chatgpt.data = {
    users: {},
    ...(global.chatgpt.data || {})
  };
  global.chatgpt.chain = _0x3a7d58.chain(global.chatgpt.data);
};
loadChatgptDB();
const {
  state,
  saveCreds
} = await useMultiFileAuthState(global.authFile);
const {
  version
} = await fetchLatestBaileysVersion();
let phoneNumber = global.botnumber;
const methodCodeQR = process.argv.includes("qr");
const methodCode = !!phoneNumber || process.argv.includes("code");
const MethodMobile = process.argv.includes("mobile");
const rl = _0x7da84a.createInterface({
  input: process.stdin,
  output: process.stdout
});
const question = _0x37d282 => new Promise(_0x5bfa75 => rl.question(_0x37d282, _0x5bfa75));
let opcion;
if (methodCodeQR) {
  opcion = "1";
}
if (!methodCodeQR && !methodCode && !fs.existsSync("./" + authFile + "/creds.json")) {
  do {
    option = await question("[ ℹ️ ] Select an option:\n1. With QR code\n2. With 8-digit text code\n---> ");
    if (!/^[1-2]$/.test(opcion)) {
      console.log("[ ❗ ] Please select only 1 or 2.\n");
    }
  } while (opcion !== "1" && opcion !== "2" || fs.existsSync("./" + authFile + "/creds.json"));
}
console.info = () => {};
const connectionOptions = {
  logger: _0x5b4718({
    level: "silent"
  }),
  printQRInTerminal: opcion === "1" || methodCodeQR,
  mobile: MethodMobile,
  browser: opcion === "1" ? ["BumbleBee-Bot", "Safari", "2.0.0"] : methodCodeQR ? ["BumbleBee-Bot", "Safari", "2.0.0"] : ["Ubuntu", "Chrome", "20.0.04"],
  auth: {
    creds: state.creds,
    keys: makeCacheableSignalKeyStore(state.keys, _0x5b4718({
      level: "fatal"
    }).child({
      level: "fatal"
    }))
  },
  waWebSocketUrl: "wss://web.whatsapp.com/ws/chat?ED=CAIICA",
  markOnlineOnConnect: true,
  generateHighQualityLinkPreview: true,
  getMessage: async _0x5c84d5 => {
    let _0x40ae97 = jidNormalizedUser(_0x5c84d5.remoteJid);
    let _0x769c7c = await _0x3f0dc2.loadMessage(_0x40ae97, _0x5c84d5.id);
    return _0x769c7c?.message || "";
  },
  patchMessageBeforeSending: async _0x195891 => {
    let _0x52448c = 0;
    global.conn.uploadPreKeysToServerIfRequired();
    _0x52448c++;
    return _0x195891;
  },
  msgRetryCounterCache: msgRetryCounterCache,
  userDevicesCache: userDevicesCache,
  defaultQueryTimeoutMs: undefined,
  cachedGroupMetadata: _0x560c5c => global.conn.chats[_0x560c5c] ?? {},
  version: version
};
global.conn = makeWASocket(connectionOptions);
if (!fs.existsSync("./" + authFile + "/creds.json")) {
  if (opcion === "2" || methodCode) {
    opcion = "2";
    if (!conn.authState.creds.registered) {
      if (MethodMobile) {
        throw new Error("A pairing code cannot be used with the mobile API");
      }
      let numeroTelefono;
      if (phoneNumber) {
        numeroTelefono = phoneNumber.replace(/[^0-9]/g, "");
        if (!Object.keys(PHONENUMBER_MCC).some(_0x59a40f => numeroTelefono.startsWith(_0x59a40f))) {
          console.log(_0x5311dc.bgBlack(_0x5311dc.bold.redBright("Start with the country code of your WhatsApp number.\nExample: +5219992095479\n")));
          process.exit(0);
        }
      } else {
        while (true) {
          phoneNumber = await question(_0x5311dc.bgBlack(_0x5311dc.bold.yellowBright("Please enter your WhatsApp number.\nExample: +5219992095479\n")));
          numeroTelefono = numeroTelefono.replace(/[^0-9]/g, "");
          if (numeroTelefono.match(/^\d+$/) && Object.keys(PHONENUMBER_MCC).some(_0x4ac450 => numeroTelefono.startsWith(_0x4ac450))) {
            break;
          } else {
            console.log(_0x5311dc.bgBlack(_0x5311dc.bold.redBright("Please enter your WhatsApp number.\nExample: +5219992095479.\n")));
          }
        }
        rl.close();
      }
      setTimeout(async () => {
        let _0x26e318 = await conn.requestPairingCode(numeroTelefono);
        _0x26e318 = _0x26e318?.match(/.{1,4}/g)?.join("-") || _0x26e318;
        console.log(_0x5311dc.yellow("[ ℹ️ ] enter the pairing code on WhatsApp."));
        console.log(_0x5311dc.black(_0x5311dc.bgGreen("Your match code: ")), _0x5311dc.black(_0x5311dc.white(code)));
      }, 3000);
    }
  }
}
conn.isInit = false;
conn.well = false;
conn.logger.info("[ ℹ️ ] STARTING...\n");
if (!opts.test) {
  if (global.db) {
    setInterval(async () => {
      if (global.db.data) {
        await global.db.write();
      }
      if (opts.autocleartmp && (global.support || {}).find) {
        tmp = [os.tmpdir(), "tmp", "jadibts"];
        tmp.forEach(_0x43aec6 => cp.spawn("find", [_0x43aec6, "-amin", "3", "-type", "f", "-delete"]));
      }
    }, 30000);
  }
}
if (opts.server) {
  (await import("./server.js")).default(global.conn, PORT);
}
function clearTmp() {
  const _0x1edbba = [join(__dirname, "./src/tmp")];
  const _0x60f1e4 = [];
  _0x1edbba.forEach(_0xdb66af => readdirSync(_0xdb66af).forEach(_0x26a19b => _0x60f1e4.push(join(_0xdb66af, _0x26a19b))));
  return _0x60f1e4.map(_0x200c50 => {
    const _0x19ceca = statSync(_0x200c50);
    if (_0x19ceca.isFile() && Date.now() - _0x19ceca.mtimeMs >= 180000) {
      return unlinkSync(_0x200c50);
    }
    return false;
  });
}
const dirToWatchccc = _0x460797.join(__dirname, "./");
function deleteCoreFiles(_0xda3fdf) {
  const _0x523a37 = /^core\.\d+$/i;
  const _0x4d5ea1 = _0x460797.basename(_0xda3fdf);
  if (_0x523a37.test(_0x4d5ea1)) {
    fs.unlink(_0xda3fdf, _0x1cb152 => {
      if (_0x1cb152) {
        console.error("Error deleting file " + _0xda3fdf + ":", _0x1cb152);
      } else {
        console.log("File deleted: " + _0xda3fdf);
      }
    });
  }
}
fs.watch(dirToWatchccc, (_0x162240, _0x570877) => {
  if (_0x162240 === "rename") {
    const _0x1091bf = _0x460797.join(dirToWatchccc, _0x570877);
    fs.stat(_0x1091bf, (_0x125acd, _0x56609b) => {
      if (!_0x125acd && _0x56609b.isFile()) {
        deleteCoreFiles(_0x1091bf);
      }
    });
  }
});
function purgeSession() {
  let _0x1227f6 = [];
  let _0x4d148b = readdirSync("./BumbleSession");
  let _0x54ca5a = _0x4d148b.filter(_0x412f22 => {
    return _0x412f22.startsWith("pre-key-");
  });
  _0x1227f6 = [..._0x1227f6, ..._0x54ca5a];
  _0x54ca5a.forEach(_0x2cebe3 => {
    unlinkSync("./BumbleSession/" + _0x2cebe3);
  });
}
function purgeSessionSB() {
  try {
    let _0x4e4ac9 = readdirSync("./jadibts/");
    let _0x677343 = [];
    _0x4e4ac9.forEach(_0x210263 => {
      if (statSync("./jadibts/" + _0x210263).isDirectory()) {
        let _0x34a502 = readdirSync("./jadibts/" + _0x210263).filter(_0x598b3f => {
          return _0x598b3f.startsWith("pre-key-");
        });
        _0x677343 = [..._0x677343, ..._0x34a502];
        _0x34a502.forEach(_0x265f93 => {
          unlinkSync("./jadibts/" + _0x210263 + "/" + _0x265f93);
        });
      }
    });
    if (_0x677343.length === 0) {
      return;
    }
  } catch (_0x2cef7e) {
    console.log(_0x5311dc.bold.red("[ ℹ️ ] Something went wrong during deletion, files not deleted"));
  }
}
function purgeOldFiles() {
  const _0x2de5f4 = ["./BumbleSession/", "./jadibts/"];
  const _0x4ecdb7 = Date.now() - 3600000;
  _0x2de5f4.forEach(_0x7e054c => {
    readdirSync(_0x7e054c, (_0x5c0c96, _0x581bc4) => {
      if (_0x5c0c96) {
        throw _0x5c0c96;
      }
      _0x581bc4.forEach(_0x283a1d => {
        const _0x3e1848 = _0x460797.join(_0x7e054c, _0x283a1d);
        stat(_0x3e1848, (_0x485f58, _0x1f3b2e) => {
          if (_0x485f58) {
            throw _0x485f58;
          }
          if (_0x1f3b2e.isFile() && _0x1f3b2e.mtimeMs < _0x4ecdb7 && _0x283a1d !== "creds.json") {
            unlinkSync(_0x3e1848, _0x2d1e05 => {
              if (_0x2d1e05) {
                throw _0x2d1e05;
              }
              console.log(_0x5311dc.bold.green("File " + _0x283a1d + " deleted successfully"));
            });
          } else {
            console.log(_0x5311dc.bold.red("File " + _0x283a1d + " not deleted" + _0x485f58));
          }
        });
      });
    });
  });
}
async function connectionUpdate(_0xe8ddfd) {
  const {
    connection: _0x120aee,
    lastDisconnect: _0x1dcb41,
    isNewLogin: _0x4c19db
  } = _0xe8ddfd;
  stopped = _0x120aee;
  if (_0x4c19db) {
    conn.isInit = true;
  }
  const _0x175b01 = _0x1dcb41?.error?.output?.statusCode || _0x1dcb41?.error?.output?.payload?.statusCode;
  if (_0x175b01 && _0x175b01 !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
    await global.reloadHandler(true).catch(console.error);
    global.timestamp.connect = new Date();
  }
  if (global.db.data == null) {
    loadDatabase();
  }
  if (_0xe8ddfd.qr != 0 && _0xe8ddfd.qr != undefined || methodCodeQR) {
    if (opcion == "1" || methodCodeQR) {
      console.log(_0x5311dc.yellow("[ ℹ️ ] Scan the QR code."));
    }
  }
  if (_0x120aee == "open") {
    console.log(_0x5311dc.yellow("[ ℹ️ ] Connected successfully."));
  }
  let _0x5082f0 = new Boom(_0x1dcb41?.error)?.output?.statusCode;
  if (_0x5082f0 == 405) {
    await fs.unlinkSync("./BumbleSession/creds.json");
    console.log(_0x5311dc.bold.redBright("[ ⚠ ] Connection replaced, Please wait a moment, I'm going to restart...\nIf errors appear, restart with: npm start"));
    process.send("reset");
  }
  if (_0x120aee === "close") {
    if (_0x5082f0 === DisconnectReason.badSession) {
      conn.logger.error("[ ⚠ ] Bad session, please delete the " + global.authFile + " folder and scan again.");
    } else if (_0x5082f0 === DisconnectReason.connectionClosed) {
      conn.logger.warn("[ ⚠ ] Connection closed, reconnecting...");
      await global.reloadHandler(true).catch(console.error);
    } else if (_0x5082f0 === DisconnectReason.connectionLost) {
      conn.logger.warn("[ ⚠ ] Connection lost with server, reconnecting...");
      await global.reloadHandler(true).catch(console.error);
    } else if (_0x5082f0 === DisconnectReason.connectionReplaced) {
      conn.logger.error("[ ⚠ ] Connection replaced, a new session has been opened. Please close the current session first.");
    } else if (_0x5082f0 === DisconnectReason.loggedOut) {
      conn.logger.error("[ ⚠ ] Connection closed, please delete the " + global.authFile + " folder and scan again.");
    } else if (_0x5082f0 === DisconnectReason.restartRequired) {
      conn.logger.info("[ ⚠ ] Reboot required, please restart the server if any problems occur.");
      await global.reloadHandler(true).catch(console.error);
    } else if (_0x5082f0 === DisconnectReason.timedOut) {
      conn.logger.warn("[ ⚠ ] Connection timed out, reconnecting...");
      await global.reloadHandler(true).catch(console.error);
    } else {
      conn.logger.warn("[ ⚠ ] Unknown disconnection reason. " + (_0x5082f0 || "") + ": " + (_0x120aee || ""));
      await global.reloadHandler(true).catch(console.error);
    }
  }
}
process.on("uncaughtException", console.error);
let isInit = true;
let handler = await import("./handler.js");
global.reloadHandler = async function (_0xbd6a4) {
  try {
    const _0x1e1bad = await import("./handler.js?update=" + Date.now()).catch(console.error);
    if (Object.keys(_0x1e1bad || {}).length) {
      handler = _0x1e1bad;
    }
  } catch (_0x2fc7bc) {
    console.error(_0x2fc7bc);
  }
  if (_0xbd6a4) {
    const _0x142429 = global.conn.chats;
    try {
      global.conn.ws.close();
    } catch {}
    conn.ev.removeAllListeners();
    global.conn = makeWASocket(connectionOptions, {
      chats: _0x142429
    });
    _0x3f0dc2?.bind(conn);
    isInit = true;
  }
  if (!isInit) {
    conn.ev.off("messages.upsert", conn.handler);
    conn.ev.off("group-participants.update", conn.participantsUpdate);
    conn.ev.off("groups.update", conn.groupsUpdate);
    conn.ev.off("message.delete", conn.onDelete);
    conn.ev.off("call", conn.onCall);
    conn.ev.off("connection.update", conn.connectionUpdate);
    conn.ev.off("creds.update", conn.credsUpdate);
  }
  conn.spromote = "*🐝@user HAS BEEN PROMOTED TO ADMINSHIP, ENJOY YOUR RANKING FHAM🥂*";
  conn.sdemote = "*🐝@user HAS BEEN DEMOTED FROM ADMINSHIP, SO SHAMFULL😢*";
  conn.sDesc = "*THE DESCRIPTION HAS BEEN MODIFIED*\n\n*NEW DESCRIPTION:* @desc";
  conn.sSubject = "*🐝GROUP NAME HAS BEEN CHANGED🐝*\n*🐝NEW NAME🐝:* @subject";
  conn.sIcon = "*🐝THE GROUP PHOTO HAS BEEN CHANGED🐝!!*";
  conn.sRevoke = "*🐝GROUP LINK HAS BEEN REVOKED🐝!!*\n*NEW LINK:* @revoke";
  conn.handler = handler.handler.bind(global.conn);
  conn.participantsUpdate = handler.participantsUpdate.bind(global.conn);
  conn.groupsUpdate = handler.groupsUpdate.bind(global.conn);
  conn.onDelete = handler.deleteUpdate.bind(global.conn);
  conn.onCall = handler.callUpdate.bind(global.conn);
  conn.connectionUpdate = connectionUpdate.bind(global.conn);
  conn.credsUpdate = saveCreds.bind(global.conn, true);
  const _0x2e5faf = new Date();
  const _0x519e4c = new Date(conn.ev);
  if (_0x2e5faf >= _0x519e4c) {
    const _0x707f0f = Object.entries(conn.chats).filter(([_0x4d263a, _0x2e63a8]) => !_0x4d263a.endsWith("@g.us") && _0x2e63a8.isChats).map(_0x1e23b2 => _0x1e23b2[0]);
  } else {
    const _0x16e9ab = Object.entries(conn.chats).filter(([_0x2848db, _0x48efdf]) => !_0x2848db.endsWith("@g.us") && _0x48efdf.isChats).map(_0x4a697b => _0x4a697b[0]);
  }
  conn.ev.on("messages.upsert", conn.handler);
  conn.ev.on("group-participants.update", conn.participantsUpdate);
  conn.ev.on("groups.update", conn.groupsUpdate);
  conn.ev.on("message.delete", conn.onDelete);
  conn.ev.on("call", conn.onCall);
  conn.ev.on("connection.update", conn.connectionUpdate);
  conn.ev.on("creds.update", conn.credsUpdate);
  isInit = false;
  return true;
};
const pluginFolder = global.__dirname(join(__dirname, "./plugins/index"));
const pluginFilter = _0x4e55cf => /\.js$/.test(_0x4e55cf);
global.plugins = {};
async function filesInit() {
  for (const _0x59fa4a of readdirSync(pluginFolder).filter(pluginFilter)) {
    try {
      const _0x42d830 = global.__filename(join(pluginFolder, _0x59fa4a));
      const _0x1a9d8e = await import(_0x42d830);
      global.plugins[_0x59fa4a] = _0x1a9d8e.default || _0x1a9d8e;
    } catch (_0x29f8d6) {
      conn.logger.error(_0x29f8d6);
      delete global.plugins[_0x59fa4a];
    }
  }
}
filesInit().then(_0x49cb6c => Object.keys(global.plugins)).catch(console.error);
global.reload = async (_0x5c1ee9, _0x3b0dc1) => {
  if (pluginFilter(_0x3b0dc1)) {
    const _0x10fc3a = global.__filename(join(pluginFolder, _0x3b0dc1), true);
    if (_0x3b0dc1 in global.plugins) {
      if (existsSync(_0x10fc3a)) {
        conn.logger.info(" updated plugin - '" + _0x3b0dc1 + "'");
      } else {
        conn.logger.warn("deleted plugin - '" + _0x3b0dc1 + "'");
        return delete global.plugins[_0x3b0dc1];
      }
    } else {
      conn.logger.info("new plugin - '" + _0x3b0dc1 + "'");
    }
    const _0x5d36e9 = _0x2d33b9(readFileSync(_0x10fc3a), _0x3b0dc1, {
      sourceType: "module",
      allowAwaitOutsideFunction: true
    });
    if (_0x5d36e9) {
      conn.logger.error("syntax error while loading '" + _0x3b0dc1 + "'\n" + format(_0x5d36e9));
    } else {
      try {
        const _0x4cbb77 = await import(global.__filename(_0x10fc3a) + "?update=" + Date.now());
        global.plugins[_0x3b0dc1] = _0x4cbb77.default || _0x4cbb77;
      } catch (_0x3150c9) {
        conn.logger.error("error require plugin '" + _0x3b0dc1 + "\n" + format(_0x3150c9) + "'");
      } finally {
        global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([_0x367c56], [_0x3863ec]) => _0x367c56.localeCompare(_0x3863ec)));
      }
    }
  }
};
Object.freeze(global.reload);
watch(pluginFolder, global.reload);
await global.reloadHandler();
async function _quickTest() {
  const _0x23636e = await Promise.all([spawn("ffmpeg"), spawn("ffprobe"), spawn("ffmpeg", ["-hide_banner", "-loglevel", "error", "-filter_complex", "color", "-frames:v", "1", "-f", "webp", "-"]), spawn("convert"), spawn("magick"), spawn("gm"), spawn("find", ["--version"])].map(_0x17b64f => {
    return Promise.race([new Promise(_0x2b5e5d => {
      _0x17b64f.on("close", _0x3bf515 => {
        _0x2b5e5d(_0x3bf515 !== 127);
      });
    }), new Promise(_0x4f520b => {
      _0x17b64f.on("error", _0x3991ab => _0x4f520b(false));
    })]);
  }));
  const [_0x859249, _0xb32d81, _0x3598ed, _0x4d1db1, _0x4b240d, _0x238835, _0x247821] = _0x23636e;
  global.support = {
    ffmpeg: _0x859249,
    ffprobe: _0xb32d81,
    ffmpegWebp: _0x3598ed,
    convert: _0x4d1db1,
    magick: _0x4b240d,
    gm: _0x238835,
    find: _0x247821
  };
  Object.freeze(global.support);
}
setInterval(async () => {
  if (stopped === "close" || !conn || !conn?.user) {
    return;
  }
  await clearTmp();
}, 180000);
setInterval(async () => {
  const _0x319dcb = [
  "Bumblebee is one of the most loyal Autobots.",
  "Bumblebee can transform into a Camaro or a Volkswagen Beetle.",
  "Bumblebee has a strong sense of justice.",
  "In the movie, Bumblebee is shown to have a deep bond with Charlie.",
  "Bumblebee often uses his horn to communicate when his voice box is damaged.",
  "Bumblebee's voice box was damaged in the first film, which is why he uses radio signals to communicate.",
  "In 'Bumblebee,' he is depicted as having a more emotional and vulnerable side compared to other Transformers.",
  "Bumblebee has a special ability to disguise himself as a different vehicle to blend in with human society.",
  "He is one of the original Transformers from the '80s cartoon series and has been a fan favorite ever since.",
  "Bumblebee's car form is often seen as a symbol of freedom and youthfulness.",
  "In the Transformers universe, Bumblebee has been shown to have excellent combat skills despite his small size.",
  "Bumblebee's color scheme in the films is inspired by his classic yellow and black design from the original cartoons.",
  "Real bumblebees are important pollinators and play a crucial role in helping plants and crops reproduce.",
  "Bumblebees can regulate their body temperature by vibrating their flight muscles, allowing them to forage even in cooler weather."
];

  function _0x58059b() {
    return _0x319dcb[Math.floor(Math.random() * _0x319dcb.length)];
  }
  if (stopped === "close" || !conn || !conn.user) {
    return;
  }
  const _0x3900aa = process.uptime() * 1000;
  const _0x20e3d4 = clockString(_0x3900aa);
  const _0x1e5ed8 = _0x58059b();
  const _0x3054b4 = "🐝 " + _0x1e5ed8 + " 💖";
  await conn.updateProfileStatus(_0x3054b4).catch(_0x25386c => _0x25386c);
}, 60000);
function clockString(_0xc41c3e) {
  const _0x9158e4 = isNaN(_0xc41c3e) ? "--" : Math.floor(_0xc41c3e / 86400000);
  const _0x5ceaed = isNaN(_0xc41c3e) ? "--" : Math.floor(_0xc41c3e / 3600000) % 24;
  const _0x17d551 = isNaN(_0xc41c3e) ? "--" : Math.floor(_0xc41c3e / 60000) % 60;
  const _0x5ecaf6 = isNaN(_0xc41c3e) ? "--" : Math.floor(_0xc41c3e / 1000) % 60;
  return [_0x9158e4, " Day(s) ️", _0x5ceaed, " Hour(s) ", _0x17d551, " Minute(s) ", _0x5ecaf6, " Second(s) "].map(_0x3f5e82 => _0x3f5e82.toString().padStart(2, 0)).join("");
}
_quickTest().catch(console.error);
