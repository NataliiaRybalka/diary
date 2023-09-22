import { useState } from 'react';

// import Card from './Card';
import MainDescription from './MainDescription';

function MetaphoricalCards() {
	const [askQuestion, setAskQuestion] = useState(false);

	return (
		<>
				<MainDescription setAskQuestion={setAskQuestion} />
			{/* {!askQuestion
				? <MainDescription setAskQuestion={setAskQuestion} />
				: <Card />
			} */}
		</>
	);
}

export default MetaphoricalCards;