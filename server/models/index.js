import { Sequelize } from 'sequelize'
import user from './user.mjs'

const sequelize = new Sequelize('sql11672529', 'sql11672529', 'EjJVpejQCl', {
	dialect: 'mysql',
	dialectModule: require('mysql2'),
	host: 'sql11.freemysqlhosting.net',
	port: 3306,
	logging: false,
})

export default user(sequelize)
