import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';

import store from './redux/store';

const root = ReactDOM.createRoot(
	document.getElementById('root')
);
root.render(
	<GoogleOAuthProvider clientId="8121478236-okrmufeu8e75nivgjgfo2d3cl4dek93s.apps.googleusercontent.com" >
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<Suspense fallback={<div>Loading....</div>}>
					<App />
				</Suspense>
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
	</GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
