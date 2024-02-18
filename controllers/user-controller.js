const { prisma } = require('../prisma/prisma-client')
const bcrypt = require('bcryptjs')
const Jdentcon = require('jdenticon')
const path = require('path')
const fs = require('fs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const UserController = {
	register: async (req, res) => {
		const { email, password, name } = req.body
		if (!email || !password || !name) {
			return res.status(400).json({ error: ' all fields are required' })
		}
		try {
			const existingUser = await prisma.user.findUnique({ where: { email } })

			if (existingUser) {
				return res.status(400).json({ error: 'user already exists' })
			}

			const hashedPassword = await bcrypt.hash(password, 10)

			const png = Jdentcon.toPng(name, 200)
			const avatarName = `${name}_${Date.now()}.png`
			const avatarPath = path.join(__dirname, '../uploads/', avatarName)
			fs.writeFileSync(avatarPath, png)

			const user = await prisma.user.create({
				data: {
					email,
					password: hashedPassword,
					name,
					avatarUrl: `/uploads/${avatarPath}`,
				},
			})

			res.json(user)
		} catch (error) {
			console.error(' Error register', error)
			res.status(500).json({ error: 'Internal server error' })
		}
	},
	login: async (req, res) => {
		const { email, password } = req.body

		if (!email || !password) {
			return res.status(400).json({ error: 'all fields are required' })
		}

		try {
			const user = await prisma.user.findUnique({ where: { email } })

			if (!user) {
				return res.status(400).json({ error: ' Incorrect login or password' })
			}

			const valid = await bcrypt.compare(password, user.password)

			if (!valid) {
				return res.status(400).json({ error: 'Incorrect login or password' })
			}

			const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY)

			res.json({ token })
		} catch (error) {
			console.error('Login errors', error)
			res.status(500).json({ error: 'Internal server error' })
		}
	},
	getUserById: async (req, res) => {
		res.send('getUserById')
	},
	updateUser: async (req, res) => {
		res.send('update')
	},
	current: async (req, res) => {
		res.send('current')
	},
}

module.exports = UserController
