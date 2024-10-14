import {watchFile, unwatchFile} from 'fs';
import chalk from 'chalk';
import {fileURLToPath} from 'url';
import fs from 'fs'; 
import moment from 'moment-timezone';

global.botnumber = ""
global.confirmCode = ""
global.authFile = `BumbleSession`;

// Cambiar a true si el Bot responde a sus comandos con otros comandos.
// Cambiar a false para usar el Bot desde el mismo numero del Bot.
// Error de m.isBaileys marcado como false fix temporal
global.isBaileysFail = false

global.owner = [
  ['254736958034', '👑 𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓 𝐂𝐑𝐄𝐀𝐓𝐎𝐑👑', true],
  ['254114098508', '💫𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓💫', true],
  ['254756315796', '💫𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓💫', true],
  ['254111691200', '💫𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓💫', true],
  ['211926995546', '💫𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓💫', true],
  ['254114098508', '💫𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓💫', true],
  ['254715974014', '💫𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓 💫', true],
  ['255675536732', '💫𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓 💫', true],
  ['254786697293', '💫𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓 💫', true],
  ['254745387716', '💫𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓 💫', true],
  ['254762300722', '💫𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓 💫', true],
  ['923470027813', '💫 𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓💫', true],
  ['967730588759', '💫 𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓💫', true],
];

global.suittag = ['254114098508'];
global.prems = ['254114098508'];

// API
global.BASE_API_DELIRIUS = "https://deliriusapi-official.vercel.app";

global.packname = 'Bee O-tech';
global.author = '★𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓★';
global.wm = '★𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓★';
global.titulowm = '★𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓★';
global.titulowm2 = `[❗] 𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓`
global.igfg = '★𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓★';
global.wait = '[❗] 𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓 𝐈𝐒 𝐋𝐎𝐀𝐃𝐈𝐍𝐆...*';

global.imagen1 = fs.readFileSync('./src/assets/images/menu/languages/es/menu.png');
global.imagen2 = fs.readFileSync('./src/assets/images/menu/languages/pt/menu.png');
global.imagen3 = fs.readFileSync('./src/assets/images/menu/languages/fr/menu.png')
global.imagen4 = fs.readFileSync('./src/assets/images/menu/languages/en/menu.png')
global.imagen5 = fs.readFileSync('./src/assets/images/menu/languages/ru/menu.png')
global.imagen6 = fs.readFileSync('./Menu.png');
global.imagen7 = fs.readFileSync('./Menu2.png');
global.imagen8 = fs.readFileSync('./Menu3.png');
global.mods = [];

//* *******Tiempo***************
global.d = new Date(new Date + 3600000);
global.locale = 'es';
global.dia = d.toLocaleDateString(locale, {weekday: 'long'});
global.fecha = d.toLocaleDateString('es', {day: 'numeric', month: 'numeric', year: 'numeric'});
global.mes = d.toLocaleDateString('es', {month: 'long'});
global.año = d.toLocaleDateString('es', {year: 'numeric'});
global.tiempo = d.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true});
//* ****************************
global.wm2 = `${dia} ${fecha}\nThe Bumblebee 🐝 Bot`;
global.gt = 'The Bumblebee 🐝 Bot';
global.mysticbot = 'The Bumblebee 🐝 Bot';
global.channel = 'https://github.com/khalid-official';
global.md = 'https://github.com/khalid-official/BUMBLEBEE-BOT';
global.mysticbot = 'https://github.com/BrunoSobrino/TheMystic-Bot-MD';
global.waitt = '[❗] 𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓 𝐈𝐒 𝐋𝐎𝐀𝐃𝐈𝐍𝐆...*';
global.waittt = '[❗] 𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓 𝐈𝐒 𝐋𝐎𝐀𝐃𝐈𝐍𝐆...*';
global.waitttt = '[❗] 𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄🐝𝐁𝐎𝐓 𝐈𝐒 𝐋𝐎𝐀𝐃𝐈𝐍𝐆...*';
global.nomorown = '254736958034';
global.pdoc = ['application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/msword', 'application/pdf', 'text/rtf'];
global.cmenut = '❖––––––『';
global.cmenub = '┊✦ ';
global.cmenuf = '╰━═┅═━––––––๑\n';
global.cmenua = '\n⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕\n     ';
global.dmenut = '*❖─┅──┅〈*';
global.dmenub = '*┊»*';
global.dmenub2 = '*┊*';
global.dmenuf = '*╰┅────────┅✦*';
global.htjava = '⫹⫺';
global.htki = '*⭑•̩̩͙⊱•••• ☪*';
global.htka = '*☪ ••••̩̩͙⊰•⭑*';
global.comienzo = '• • ◕◕════';
global.fin = '════◕◕ • •';
global.botdate = `*[ 📅 ] Fecha:*  ${moment.tz('Africa/Nairobi').format('DD/MM/YY')}`;
global.bottime = `*[ ⏳ ] Hour:* ${moment.tz('Africa/Nairobi').format('HH:mm:ss')}`;

global.fgif = {key: {participant: '0@s.whatsapp.net'}, message: {'videoMessage': {'title': wm, 'h': `Hmm`, 'seconds': '999999999', 'gifPlayback': 'true', 'caption': bottime, 'jpegThumbnail': fs.readFileSync('./src/assets/images/menu/languages/es/menu.png')}}};
global.multiplier = 99;
global.flaaa = [
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=',
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=',
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=',
  'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=',
  'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text=',
];
//* ************************

const file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright('Update \'config.js\''));
  import(`${file}?update=${Date.now()}`);
});
