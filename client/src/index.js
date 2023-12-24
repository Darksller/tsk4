import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/global.css'
import { Provider } from 'react-redux'
import { store } from './redux'
import App from './App'
import { AuthProvider } from 'react-auth-kit'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<AuthProvider
				authType={'cookie'}
				authName={'_auth'}
				cookieDomain={window.location.hostname}
				cookieSecure={false}
			>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</AuthProvider>
		</Provider>
	</React.StrictMode>
)
