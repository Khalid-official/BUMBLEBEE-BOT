<p align="center"> 
<img src="https://komarev.com/ghpvc/?username=khalid-official&color=brightgreen" />

<p align="center">
    <a href="https://ibb.co/N6NMDtn"><img src="https://telegra.ph/file/a1fd461c49539f754af23.jpg" alt="01" border="0" /></a>
<p/>
<p align="center">
<a href="https://github.com/khalid-official"><img title="Author" src="https://img.shields.io/badge/BUMBLEBEE-BOT-black?style=for-the-badge&logo=whatsApp"></a>
<p/>
<p align="center">
<a href="https://github.com/khalid-official?tab=followers"><img title="Followers" src="https://img.shields.io/github/followers/khalid-official?label=Followers&style=social"></a>
<a href="https://github.com/khalid-official/BUMBLEBEE-BOT/stargazers/"><img title="Stars" src="https://img.shields.io/github/stars/khalid-official/BUMBLEBEE-BOT?&style=social"></a>
<a href="https://github.com/khalid-official/BUMBLEBEE-BOT/network/members"><img title="Fork" src="https://img.shields.io/github/forks/khalid-official/BUMBLEBEE-BOT?style=social"></a>
<a href="https://github.com/khalid-official/BUMBLEBEE-BOT/watchers"><img title="Watching" src="https://img.shields.io/github/watchers/khalid-official/BUMBLEBEE-BOT?label=Watching&style=social"></a>
</p>



<h3 align="center">WHATSAPP BOT</h3>

***
## ```🐝 Information🐝```
- Change creds.json file replace with yours in [creds.json](https://github.com/Khalid-official/BUMBLEBEE-BOT/edit/main/BumbleSession/creds.json)
- You can download to the latest version of baileys by editing the package.json [this section](https://github.com/khalid-official/BUMBLEBEE-BOT/blob/main/package.json#L42)


## ```🐝For example```🐝
In case of doubt, before installing BUMBLEBEE-BOT, test the bot here

[![WhatsApp](https://img.shields.io/badge/BUMBLEBEE-BOT-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://linkbio.co/6032406az4dFk) 

***

## ```🐝GET PAIR CODE🐝```
https://pair-code-fqkn.onrender.com/

## ```🐝HEROKU DEPLOYMENT🐝```

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/Khalid-official/BUMBLEBEE-BOT)


## ```🐝GITHUB AUTOWORKFLOWS DEPLOYMENT🐝```

To automate bot startup every 6 hours or trigger it manually, use the GitHub Actions workflow below.  
Place this in `.github/workflows/deploy.yml`:

```yaml
name: Node.js CI Scheduled Deploy

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
  schedule:
    - cron: '0 */6 * * *'  # Runs every 6 hours UTC
  workflow_dispatch:       # Allows manual trigger

concurrency:
  group: deploy-workflow
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x]

    steps:
    - name: 📥 Checkout repository
      uses: actions/checkout@v3

    - name: ⚙️ Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}

    - name: 📦 Install dependencies
      run: npm install

    - name: 🎞️ Install ffmpeg
      run: |
        sudo apt-get update
        sudo apt-get install -y ffmpeg

    - name: 🚀 Start application
      run: |
        echo "Starting Bumblebee Bot..."
        npm start
