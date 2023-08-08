import Footer from './components/pages/Footer';
import Header from './components/pages/Header';
import Main from './components/pages/Main';

import './App.css';

function App() {
	const user = JSON.parse(localStorage.getItem('user'));

	return (
		<div className="App">
			<Header user={user} />
			<Main user={user} />
			<Footer />
		</div>
	);
}

export default App;