import { Sequelize } from 'sequelize'
import user from './user.mjs'
import mysql2 from 'mysql2'

const sequelize = new Sequelize('sql11672529', 'sql11672529', 'EjJVpejQCl', {
	dialect: 'mysql',
	dialectModule: mysql2,
	host: 'sql11.freemysqlhosting.net',
	port: 3306,
	logging: false,
})

export default user(sequelize)
