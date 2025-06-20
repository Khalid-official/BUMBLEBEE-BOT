<p align="center">
  <img src="https://komarev.com/ghpvc/?username=khalid-official&color=brightgreen" alt="Profile views" />
</p>

<p align="center">
  <a href="https://ibb.co/N6NMDtn">
    <img src="https://telegra.ph/file/a1fd461c49539f754af23.jpg" alt="Bumblebee Bot" />
  </a>
</p>

<p align="center">
  <a href="https://github.com/khalid-official">
    <img title="Author" src="https://img.shields.io/badge/BUMBLEBEE-BOT-black?style=for-the-badge&logo=whatsApp" />
  </a>
</p>

<p align="center">
  <a href="https://github.com/khalid-official?tab=followers">
    <img title="Followers" src="https://img.shields.io/github/followers/khalid-official?label=Followers&style=social" />
  </a>
  <a href="https://github.com/khalid-official/BUMBLEBEE-BOT/stargazers/">
    <img title="Stars" src="https://img.shields.io/github/stars/khalid-official/BUMBLEBEE-BOT?style=social" />
  </a>
  <a href="https://github.com/khalid-official/BUMBLEBEE-BOT/network/members">
    <img title="Forks" src="https://img.shields.io/github/forks/khalid-official/BUMBLEBEE-BOT?style=social" />
  </a>
  <a href="https://github.com/khalid-official/BUMBLEBEE-BOT/watchers">
    <img title="Watchers" src="https://img.shields.io/github/watchers/khalid-official/BUMBLEBEE-BOT?label=Watching&style=social" />
  </a>
</p>

<h3 align="center">🤖 BUMBLEBEE - WHATSAPP BOT</h3>

---

## 🐝 About the Project

BUMBLEBEE is a powerful and easy-to-use WhatsApp bot powered by [Baileys](https://github.com/WhiskeySockets/Baileys). With scheduled automation, custom sessions, and seamless deployment options, it’s perfect for users who want a fast and flexible chatbot solution.

---

## 🧠 Features

- 🔒 Secure credential management using `creds.json`
- 🔄 Automated actions via GitHub Actions
- ☁️ Deployable to Heroku
- 🎬 FFmpeg installed for media processing
- 🕒 Scheduled bot startups every 6 hours (via GitHub Actions)
- 👨‍💻 Easy setup and open source!

---

## ⚙️ Requirements

- Node.js `v20.x`
- `ffmpeg`
- A valid WhatsApp number
- WhatsApp pairing credentials (generated via the link below)

---

## 🔐 Get Pairing Code

➡️ Generate your WhatsApp pair code here:  
🌐 [https://pair-code-fqkn.onrender.com/](https://pair-code-fqkn.onrender.com/)

---

## 🚀 Installation Guide

1. **Fork this repository**
2. **DO NOT modify `config.js`**
3. Visit the [pair code site](https://pair-code-fqkn.onrender.com/) and generate your `creds.json`
4. Replace the contents of `BumbleSession/creds.json` with your own
5. Deploy using **Heroku** or **GitHub Actions**

---

## 💻 GitHub Actions Deployment

Automatically run and restart your bot every 6 hours or manually via the GitHub UI.

Create a file at `.github/workflows/deploy.yml` and paste this:

```yaml
# GitHub Actions workflow for BUMBLEBEE-BOT
name: Node.js CI Scheduled Deploy

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
  schedule:
    - cron: '0 */6 * * *'  # Every 6 hours UTC
  workflow_dispatch:

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
