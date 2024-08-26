let spamDetection = {} // Object to store user activity

export async function before(m, { isAdmin, isBotAdmin }) {
		if (m.isBaileys && m.fromMe) return !0
		if (!m.isGroup) return !1

		let chat = global.db.data.chats[m.chat]
		let delet = m.key.participant
		let bang = m.key.id
		let bot = global.db.data.settings[this.user.jid] || {}
		let user = `@${m.sender.split`@`[0]}`

		// Initialize user activity if not already present
		if (!spamDetection[m.chat]) spamDetection[m.chat] = {}
		if (!spamDetection[m.chat][m.sender]) spamDetection[m.chat][m.sender] = { count: 0, lastMessageTime: 0 }

		let now = Date.now()
		let userActivity = spamDetection[m.chat][m.sender]

		// Check if the user is spamming
		if (now - userActivity.lastMessageTime < 5000) { // 5000ms = 5 seconds
				userActivity.count += 1
		} else {
				userActivity.count = 1
		}

		userActivity.lastMessageTime = now

		if (userActivity.count > 5 && !isAdmin) { // Adjust the spam threshold as needed
				if (isBotAdmin) {
						await this.sendMessage(m.chat, { text: `https://github.com/Khalid-official *「 𝐀𝐍𝐓𝐈 𝐒𝐏𝐀𝐌 」*\n*${user}, YOU ARE SPAMMING AND WILL BE REMOVED FROM THE GROUP!*`, mentions: [m.sender] })
						await this.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
						let response = await this.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
						if (response[0].status === "404") return
				} else {
						return m.reply('https://github.com/Khalid-official *[❗𝐈𝐍𝐅𝐎❗] THE BOT IS NOT ADMIN, IT CANNOT REMOVE SPAMMERS!*')
				}
		}

		return !0
}
