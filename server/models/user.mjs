import { Sequelize } from 'sequelize'

export default function (sequelize) {
	return sequelize.define(
		'user',
		{
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: Sequelize.STRING,
			email: { type: Sequelize.STRING, unique: true },
			password: Sequelize.STRING,
			registrationDate: Sequelize.STRING,
			lastLoginDate: Sequelize.STRING,
			isBanned: Sequelize.STRING,
		},
		{ tableName: 'users' }
	)
}
