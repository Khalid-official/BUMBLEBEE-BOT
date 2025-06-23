import { exec } from 'child_process';

function runCommand(command, description) {
  return new Promise((resolve, reject) => {
    console.log(`Running: ${description}...`);

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error running ${description}:`, error);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`Stderr while running ${description}:`, stderr);
      }
      console.log(`Result of ${description}:`, stdout);
      resolve(stdout);
    });
  });
}

// Add more lines for additional packages
async function installPythonDependencies() {
  try {
    await runCommand('pip install -U --pre "yt-dlp[default]"', 'Installing YT-DLP');
  } catch (error) {
    console.error('Error installing optional modules, some plugins may not work.', error);
  }
}

installPythonDependencies();
