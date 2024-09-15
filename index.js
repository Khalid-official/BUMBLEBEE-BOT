console.log('[ ℹ️ ] Starting...');
import {join, dirname} from 'path';
import {createRequire} from 'module';
import {fileURLToPath} from 'url';
import {setupMaster, fork} from 'cluster';
import cfonts from 'cfonts';
import {createInterface} from 'readline';
import yargs from 'yargs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);
const {say} = cfonts;
const rl = createInterface(process.stdin, process.stdout);

say('Bumblebee\nBot', {
  font: 'chrome',
  align: 'center',
  gradient: ['red', 'magenta']});
say(`Sting Like A Bee`, {
  font: 'console',
  align: 'center',
  gradient: ['red', 'magenta']});

let isRunning = false;

/**
* Start a JS file
* @param {String} file `path/to/file`
*/
function start(file) {
  if (isRunning) return;
  isRunning = true;
  const args = [join(__dirname, file), ...process.argv.slice(2)];

  /** say('[ ℹ️ ] Scan the QR code or enter the pairing code in WhatsApp.', {
    font: 'console',
    align: 'center',
    gradient: ['red', 'magenta']}); **/

  setupMaster({
    exec: args[0],
    args: args.slice(1)});
  const p = fork();
  p.on('message', (data) => {

    console.log('[RECEIVED]', data);
    switch (data) {
      case 'reset':
        p.process.kill();
        isRunning = false;
        start.apply(this, arguments);
        break;
      case 'uptime':
        p.send(process.uptime());
        break;
    }
  });
  p.on('exit', (_, code) => {
    isRunning = false;
    console.error('[ ℹ️ ] An unexpected error occurred:', code);

    p.process.kill();
    isRunning = false;
    start.apply(this, arguments);

    if (process.env.pm_id) {
      process.exit(1);
    } else {
      process.exit();
    }
  });
  const opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
  if (!opts['test']) {
    if (!rl.listenerCount()) {
      rl.on('line', (line) => {
       
 p.emit('message', line.trim());
      });
    }
  }
}
start('main.js');
