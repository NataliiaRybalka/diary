import { useEffect, useState } from 'react';
import ReactCardFlip from 'react-card-flip';

import './Cards.css';

function Answer({ card }) {
	const language = localStorage.getItem('lang');
	
	const [description, setDescription] = useState('');
	const [title, setTitle] = useState('');
	const [isFlipped, setIsFlipped] = useState(false);

	useEffect(() => {
		if (language === 'en') {
			const title = card.descriptionEn.split('"');
			setTitle(title[1]);
			setDescription(card.descriptionEn);
		}
		else if (language === 'ru') {
			const title = card.descriptionRu.split('"');
			setTitle(title[1]);
			setDescription(card.descriptionRu);
		}
		else if (language === 'ua') {
			const title = card.descriptionUa.split('"');
			setTitle(title[1]);
			setDescription(card.descriptionUa);
		}
	}, [language]);

	return (
		<div className='flippable-card-container'>
			<h2>{title}</h2>
			<ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
				<img src={card.file} alt={title} className='cardImage' onClick={()=>setIsFlipped(!isFlipped)} />

				<div className='cardDescription' onClick={()=>setIsFlipped(!isFlipped)} >
					<p>{description}</p>
				</div>
			</ReactCardFlip>
		</div>
	);
}

export default Answer;