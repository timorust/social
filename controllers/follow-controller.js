const { prisma } = require('../prisma/prisma-client')

const FollowController = {
	followUser: async (req, res) => {
		res.send('followUser')
	},

	unFollowUser: async (req, res) => {
		res.send('unFollowUser')
	},
}

module.exports = FollowController
