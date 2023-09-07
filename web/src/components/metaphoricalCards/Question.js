import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FULCRUM, INTERNAL_COMPASS, SERVER } from '../../lib/constants';

import './Cards.css';

function Question({ setCard }) {
	const { t } = useTranslation();

	const [deck, setDeck] = useState(FULCRUM);
	const [question, setQuestion] = useState('');

	const send = async () => {
		const res = await fetch(`${SERVER}/metaphorical-cards/${deck}/card`);
		const data = await res.json();
		setCard(data);
	};

	return (
		<div>
			<select className='selectDeck' value={deck} onChange={(e)=>setDeck(e.target.value)}>
				<option value={FULCRUM}>{t('Fulcrum')}</option>
				<option value={INTERNAL_COMPASS}>{t('Internal Compass')}</option>
			</select>
			<input type='text' name='question' value={question} onChange={(e)=>setQuestion(e.target.value)} className='inputQuestion' />
			<button className='questionBtn' onClick={send}>{t('Ask a Question')}</button>
		</div>
	);
}

export default Question;