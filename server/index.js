import user from './models/index.js'
import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const app = express()
app.use(cors())
app.use(express.json())

async function login(req, res) {
	const { email, password } = req.body

	const userDb = await user.findOne({ where: { email } })

	if (!userDb) {
		return res.status(400).json({ message: 'Email or password incorrect' })
	}

	if (userDb.password !== password) {
		return res.status(400).json({ message: 'Email or password incorrect' })
	}

	if (userDb.isBanned !== 'Active') {
		return res.status(400).json({ message: 'Your account has been banned' })
	}

	userDb.lastLoginDate = new Date().toISOString()
	await userDb.save()

	const jwtToken = jwt.sign(
		{ id: userDb.id, email: userDb.email },
		process.env.JWT_SECRET
	)

	res.json({ message: `Hello ${userDb.name}`, token: jwtToken })
}

async function signup(req, res) {
	const { name, email, password } = req.body
	if (name.length < 1 || email.length < 1 || password.length < 1)
		return res.status(400).json({ message: 'All fields are required' })
	try {
		const newUser = await user.create({
			name: name,
			email: email,
			password: password,
			registrationDate: new Date().toISOString(),
			lastLoginDate: new Date().toISOString(),
			isBanned: 'Active',
		})
		console.log(newUser)
		const jwtToken = jwt.sign(
			{ id: newUser.id, email: email },
			process.env.JWT_SECRET
		)

		return res.status(200).json({ token: jwtToken })
	} catch (err) {
		return res.status(400).json({ message: err.errors[0].message })
	}
}

async function deleteUsers(req, res) {
	try {
		console.log(req.body)
		const userIdsToDelete = req.body.userIds

		const deletedUsers = await user.destroy({
			where: {
				id: userIdsToDelete,
			},
		})

		res.status(200).send()
	} catch (error) {
		res.status(500).json({ message: 'Error while user deleting: ' + error })
	}
}

async function changeStatus(req, res) {
	try {
		const userIdsToChange = req.body.userIds
		const usersToUpdate = await user.findAll({
			where: {
				id: userIdsToChange,
			},
		})

		for (const userToUpdate of usersToUpdate) {
			console.log(userToUpdate)
			userToUpdate.isBanned =
				userToUpdate.isBanned === 'Active' ? 'Blocked' : 'Active'
			await userToUpdate.save()
		}

		res.status(200).send()
	} catch (error) {
		res.status(500).json({ message: 'error while updating' })
	}
}

async function getUsers(req, res) {
	res.status(200).json(await user.findAll())
}

app.get('/deleteAll', () => user.drop())

app.post('/login', login)

app.post('/signup', signup)

app.post('/deleteUsers', deleteUsers)

app.post('/changeStatus', changeStatus)

app.get('/getUsers', getUsers)

app.listen(5000, () => {
	console.log('Server is running on port 5000')
})
