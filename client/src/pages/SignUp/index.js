import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import { Navigate } from 'react-router-dom'
import { useSignIn, useIsAuthenticated } from 'react-auth-kit'
import { useSignUpMutation } from '../../redux'

export default function SignUp() {
	const [error, setError] = React.useState('')
	const [signUp] = useSignUpMutation()
	const signIn = useSignIn()
	const isAuthenticated = useIsAuthenticated()
	if (isAuthenticated()) {
		return <Navigate to='/' />
	}

	const handleSubmit = async event => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		try {
			const response = await signUp({
				name: data.get('name'),
				email: data.get('email'),
				password: data.get('password'),
			}).unwrap()

			signIn({
				token: response.token,
				tokenType: 'Bearer',
				authState: { email: data.get('email') },
				expiresIn: 3600,
			})
		} catch (error) {
			setError(error.data?.message)
		}
	}

	return (
		<Container component='main' maxWidth='xs'>
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<LockOutlinedIcon />
				<Typography component='h1' variant='h5'>
					Sign up
				</Typography>
				<Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								autoComplete='given-name'
								name='name'
								required
								fullWidth
								id='name'
								label='Name'
								autoFocus
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id='email'
								label='Email Address'
								name='email'
								autoComplete='email'
							/>
						</Grid>
						<Grid item xs={12} sx={{ mb: 2 }}>
							<TextField
								required
								fullWidth
								name='password'
								label='Password'
								type='password'
								id='password'
								autoComplete='new-password'
							/>
						</Grid>
					</Grid>
					{error ? <Alert severity='error'>{error}</Alert> : <p></p>}
					<Button
						type='submit'
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2 }}
					>
						Sign Up
					</Button>
					<Grid container justifyContent='flex-end'>
						<Grid item>
							<Link href='/login' variant='body2'>
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	)
}
