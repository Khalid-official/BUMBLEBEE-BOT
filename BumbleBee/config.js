import { watchFile, unwatchFile } from "fs";
import _0x13a844 from "chalk";
import { fileURLToPath } from "url";
import _0x13e66a from "fs";
import _0x1ad40c from "moment-timezone";
global.botnumber = "";
global.confirmCode = "";
global.authFile = "BumbleSession";
global.isBaileysFail = false;
global.owner = [["254736958034", "👑 𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓 𝐂𝐑𝐄𝐀𝐓𝐎𝐑👑", true], ["254114098508", "💫𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓💫", true], ["573044859955", "💫𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓💫", true], ["5492645157747", "💫𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓💫", true], ["211926995546", "💫𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓💫", true], ["254114098508", "💫𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓💫", true], ["525537121258", "💫𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓 💫", true], ["255675536732", "💫𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓 💫", true], ["923470027813", "💫 𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓💫", true], ["50253638719", "💫 𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓💫", true]];
global.suittag = ["254114098508"];
global.prems = ["254114098508"];
global.BASE_API_DELIRIUS = "https://deliriusapi-official.vercel.app";
global.packname = "𝗕𝗘𝗘 𝗢-𝗧𝗘𝗖𝗛";
global.author = "★𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓★";
global.wm = "★𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓★";
global.titulowm = "★𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓★";
global.titulowm2 = "[❗] 𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓";
global.igfg = "★𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓★";
global.wait = "[❗] 𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓 𝐈𝐒 𝐋𝐎𝐀𝐃𝐈𝐍𝐆...*";
global.imagen1 = _0x13e66a.readFileSync("./src/assets/images/menu/languages/es/menu.png");
global.imagen2 = _0x13e66a.readFileSync("./src/assets/images/menu/languages/pt/menu.png");
global.imagen3 = _0x13e66a.readFileSync("./src/assets/images/menu/languages/fr/menu.png");
global.imagen4 = _0x13e66a.readFileSync("./src/assets/images/menu/languages/en/menu.png");
global.imagen5 = _0x13e66a.readFileSync("./src/assets/images/menu/languages/ru/menu.png");
global.imagen6 = _0x13e66a.readFileSync("./Menu.png");
global.imagen7 = _0x13e66a.readFileSync("./Menu2.png");
global.imagen8 = _0x13e66a.readFileSync("./Menu3.png");
global.mods = [];
global.d = new Date(new Date() + 3600000);
global.locale = "en";
global.dia = d.toLocaleDateString(locale, {
  weekday: "long"
});
global.fecha = d.toLocaleDateString("en", {
  day: "numeric",
  month: "numeric",
  year: "numeric"
});
global.mes = d.toLocaleDateString("en", {
  month: "long"
});
global.año = d.toLocaleDateString("en", {
  year: "numeric"
});
global.tiempo = d.toLocaleString("en-US", {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true
});
global.wm2 = dia + " " + fecha + "\nThe Bumblebee 🐝 Bot";
global.gt = "The Bumblebee 🐝 Bot";
global.mysticbot = "The Bumblebee 🐝 Bot";
global.channel = "https://github.com/khalid-official";
global.md = "https://github.com/khalid-official/BUMBLEBEE-BOT";
global.mysticbot = "https://github.com/BrunoSobrino/TheMystic-Bot-MD";
global.waitt = "[❗] 𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓 𝐈𝐒 𝐋𝐎𝐀𝐃𝐈𝐍𝐆...*";
global.waittt = "[❗] 𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓 𝐈𝐒 𝐋𝐎𝐀𝐃𝐈𝐍𝐆...*";
global.waitttt = "[❗] 𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓 𝐈𝐒 𝐋𝐎𝐀𝐃𝐈𝐍𝐆...*";
global.nomorown = "254736958034";
global.pdoc = ["application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-excel", "application/msword", "application/pdf", "text/rtf"];
global.cmenut = "❖––––––『";
global.cmenub = "┊✦ ";
global.cmenuf = "╰━═┅═━––––––๑\n";
global.cmenua = "\n⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕\n     ";
global.dmenut = "*❖─┅──┅〈*";
global.dmenub = "*┊»*";
global.dmenub2 = "*┊*";
global.dmenuf = "*╰┅────────┅✦*";
global.htjava = "⫹⫺";
global.htki = "*⭑•̩̩͙⊱•••• ☪*";
global.htka = "*☪ ••••̩̩͙⊰•⭑*";
global.comienzo = "• • ◕◕════";
global.fin = "════◕◕ • •";
global.botdate = "*[ 📅 ] Fecha:*  " + _0x1ad40c.tz("Africa/Nairobi").format("DD/MM/YY");
global.bottime = "*[ ⏳ ] Hour:* " + _0x1ad40c.tz("Africa/Nairobi").format("HH:mm:ss");
global.fgif = {
  key: {
    participant: "0@s.whatsapp.net"
  },
  message: {
    videoMessage: {
      title: wm,
      h: "Hmm",
      seconds: "999999999",
      gifPlayback: "true",
      caption: bottime,
      jpegThumbnail: _0x13e66a.readFileSync("./src/assets/images/menu/languages/es/menu.png")
    }
  }
};
global.multiplier = 99;
global.flaaa = ["https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=", "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=", "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=", "https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=", "https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text="];
const file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(_0x13a844.redBright("Update 'config.js'"));
  import(file + "?update=" + Date.now());
});
