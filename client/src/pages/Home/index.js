import { Container, Button, IconButton } from '@mui/material'
import Table from '../../components/Table/index.js'
import userColumns from './userColumns.js'
import { useState } from 'react'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import DeleteIcon from '@mui/icons-material/Delete'
import { Navigate } from 'react-router-dom'
import { useIsAuthenticated } from 'react-auth-kit'
import {
	useGetUsersQuery,
	useChangeStatusMutation,
	useDeleteMutation,
} from '../../redux'
import { useAuthUser, useSignOut } from 'react-auth-kit'

export default function Home() {
	const signOut = useSignOut()
	const [selectedUsers, getSelectedUsers] = useState([])
	const isAuthenticated = useIsAuthenticated()
	const { data = [], isLoading } = useGetUsersQuery()
	const [deleteSelUsers] = useDeleteMutation()
	const [changeStatus] = useChangeStatusMutation()
	const auth = useAuthUser()
	if (!isAuthenticated()) {
		return <Navigate to='/login' />
	}

	async function blockUsers() {
		try {
			const activeUsersIds = selectedUsers.map(user => user.id)

			const matchingUsers = data.filter(
				user => activeUsersIds.includes(user.id) && user.isBanned === 'Active'
			)

			await changeStatus({
				userIds: matchingUsers.map(user => user.id),
			}).unwrap()

			if (matchingUsers.map(user => user.email).includes(auth().email)) {
				signOut()
			}
		} catch (error) {
			console.error(error)
		}
	}

	async function unBlockUsers() {
		try {
			console.log(selectedUsers)
			const blockedUsersIds = selectedUsers.map(user => user.id)

			const matchingUsers = data
				.filter(
					user =>
						blockedUsersIds.includes(user.id) && user.isBanned !== 'Active'
				)
				.map(user => user.id)

			await changeStatus({
				userIds: matchingUsers,
			}).unwrap()
		} catch (error) {
			console.error(error)
		}
	}

	async function deleteUsers() {
		const userIds = selectedUsers.map(user => user.id)

		const matchingUsers = data.filter(user => userIds.includes(user.id))

		await deleteSelUsers({
			userIds: matchingUsers.map(user => user.id),
		}).unwrap()

		if (matchingUsers.map(user => user.email).includes(auth().email)) {
			signOut()
		}
	}

	return (
		<Container className='mt-4'>
			<Table
				rows={data}
				columns={userColumns}
				setSelectedRows={getSelectedUsers}
				customToolbar={() => (
					<div className='ml-5'>
						<Button onClick={blockUsers} className='font-black'>
							Block
						</Button>
						<IconButton onClick={unBlockUsers}>
							<LockOpenIcon />
						</IconButton>
						<IconButton color='error' onClick={deleteUsers}>
							<DeleteIcon />
						</IconButton>
					</div>
				)}
			/>
		</Container>
	)
}
