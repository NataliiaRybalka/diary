import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactCardFlip from 'react-card-flip';
import { useSelector } from 'react-redux';

function Answer({ card }) {
	const { t } = useTranslation();
	const language = useSelector(state => state.language.value);
	
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
			<p>{t('The first thought that came to your mind when you looked at her is the answer to your question.')} 🙌🏼
				<br/>
				{t('Write this thought in a notepad or phone notes, and after a while return to it. Insights guaranteed!')}
			</p>
			
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