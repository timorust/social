const { prisma } = require('../prisma/prisma-client')

const LikeController = {
	likePost: async (req, res) => {
		const { postId } = req.body

		const userId = req.user.userId

		if (!postId)
			return res.status(400).json({ error: ' All fields are required' })

		try {
			const existingLike = await prisma.like.findFirst({
				where: {
					postId,
					userId,
				},
			})

			if (existingLike)
				return res.status(400).json({ error: 'You already liked it' })

			const like = await prisma.like.create({
				data: {
					postId,
					userId,
				},
			})

			res.json(like)
		} catch (error) {
			console.error('Error like post', error)

			res.status(500).json({ error: 'Internal server error' })
		}
	},

	unLikePost: async (req, res) => {
		const { id } = req.params

		const userId = req.user.userId

		if (!id) return res.status(400).json({ error: 'You`ve already disliked' })

		try {
			const existingLike = await prisma.like.findFirst({
				where: {
					postId: id,
					userId,
				},
			})

			if (!existingLike)
				return res.status(400).json({ error: 'You can`t dislike' })

			const like = await prisma.like.deleteMany({
				where: {
					postId: id,
					userId,
				},
			})

			res.json(like)
		} catch (error) {
			console.error('Error unLike post', error)

			res.status(500).json({ error: 'Internal server error' })
		}
	},
}

module.exports = LikeController
