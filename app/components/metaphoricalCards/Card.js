import { useState } from 'react';

import Answer from './Answer';
import Question from './Question';

function Card() {

	const [card, setCard] = useState(null);

	return (
		<>
			{!card
				? <Question setCard={setCard} />
				: <Answer card={card} />
			}
		</>
	);
}

export default Card;