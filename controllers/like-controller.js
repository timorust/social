const { prisma } = require('../prisma/prisma-client')

const LikeController = {
	likePost: async (req, res) => {
		res.send('likePost')
	},

	unLikePost: async (req, res) => {
		res.send('unLikePost')
	},
}

module.exports = LikeController
