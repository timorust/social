const UserController = {
	register: async (req, res) => {
		res.send('register')
	},
	login: async (req, res) => {
		res.send('login')
	},
	getUserById: async (req, res) => {
		res.send('getUserById')
	},
	updateUser: async (req, res) => {
		res.send('updateUser')
	},
	currentUser: async (req, res) => {
		res.send('currentUser')
	},
}

module.exports = UserController
