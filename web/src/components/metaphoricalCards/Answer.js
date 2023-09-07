import { useEffect, useState } from 'react';

import './Cards.css';

function Answer({ card }) {
	const language = localStorage.getItem('lang');
	
	const [description, setDescription] = useState('');
	const [title, setTitle] = useState('');

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
		<div>
			<h2>{title}</h2>
			<img src={card.file} alt={card.file} className='cardImage' />
			<p className='cardDescr'>{description}</p>
		</div>
	);
}

export default Answer;