import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { useSignOut, useIsAuthenticated } from 'react-auth-kit'
import { Navigate } from 'react-router-dom'
import Link from '@mui/material/Link'

export default function NavBar() {
	const signOut = useSignOut()
	const isAuthenticated = useIsAuthenticated()
	return (
		<AppBar position='static'>
			<Container
				sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
				onClick={() => <Navigate to='/login' />}
			>
				{!isAuthenticated() ? (
					<>
						<Link href='/login'>
							<Button sx={{ my: 2, color: 'white', display: 'block' }}>
								Login
							</Button>
						</Link>
						<Link href='/signup'>
							<Button sx={{ my: 2, color: 'white', display: 'block' }}>
								Sign Up
							</Button>
						</Link>
					</>
				) : (
					<Button
						sx={{ my: 2, color: 'white', display: 'block' }}
						onClick={() => {
							signOut()
						}}
					>
						Logout
					</Button>
				)}
			</Container>
		</AppBar>
	)
}
