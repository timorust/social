const { prisma } = require('../prisma/prisma-client')

const FollowController = {
	followUser: async (req, res) => {
		const { followingId } = req.body

		const userId = req.user.userId

		if (followingId === userId)
			return res.status(500).json({ error: "You can't follow yourself" })

		try {
			const existingSubscription = await prisma.follows.findFirst({
				where: {
					AND: [{ followerId: userId }, { followingId: followingId }],
				},
			})

			if (existingSubscription)
				return res.status(400).json({ error: 'Subscription already exists' })

			await prisma.follows.create({
				data: {
					followerId: userId,
					followingId: followingId,
				},
			})

			res.status(201).json({ message: 'Successfully created subscription' })
		} catch (error) {
			console.error('Follow failed', error)

			res.status(500).json({ error: 'Internal server error' })
		}
	},

	unFollowUser: async (req, res) => {
		const { followingId } = req.body

		const userId = req.user.userId

		try {
			const follows = await prisma.follows.findFirst({
				where: {
					AND: [{ followerId: userId }, { followingId }],
				},
			})

			if (!follows)
				return res
					.status(404)
					.json({ error: 'You are not following this user' })

			await prisma.follows.delete({
				where: {
					id: follows.id,
				},
			})

			res.status(201).json({ message: 'You unsubscribed' })
		} catch (error) {
			console.error('Unfollow failed', error)

			res.status(500).json({ error: 'Internal server error' })
		}
	},
}

module.exports = FollowController
