import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import { useSignIn, useIsAuthenticated } from 'react-auth-kit'
import Link from '@mui/material/Link'
import { Navigate } from 'react-router-dom'
import { useLoginMutation } from '../../redux'

export default function Login() {
	const [error, setError] = React.useState('')
	const isAuthenticated = useIsAuthenticated()
	const [login] = useLoginMutation()
	const signIn = useSignIn()

	if (isAuthenticated()) {
		return <Navigate to='/' />
	}

	const handleSubmit = async event => {
		event.preventDefault()
		setError('')
		const data = new FormData(event.currentTarget)
		try {
			const response = await login({
				email: data.get('email'),
				password: data.get('password'),
			}).unwrap()

			signIn({
				token: response.token,
				tokenType: 'Bearer',
				authState: { email: data.get('email') },
				expiresIn: 3600,
			})
		} catch (err) {
			setError(err.data?.message)
		}
	}

	return (
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
				Sign in
			</Typography>
			<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
				<TextField
					margin='normal'
					required
					fullWidth
					id='email'
					label='Email Address'
					name='email'
					autoComplete='email'
					autoFocus
				/>
				<TextField
					margin='normal'
					required
					fullWidth
					name='password'
					label='Password'
					type='password'
					id='password'
					autoComplete='current-password'
				/>
				{error ? <Alert severity='error'>{error}</Alert> : <p></p>}
				<Button
					type='submit'
					fullWidth
					variant='contained'
					sx={{ mt: 2, mb: 2 }}
				>
					Sign In
				</Button>
				<Grid container justifyContent='flex-end'>
					<Grid item>
						<Link href='/signup' variant='body2'>
							{"Don't have an account? Sign Up"}
						</Link>
					</Grid>
				</Grid>
			</Box>
		</Box>
	)
}
