import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SERVER } from '../../lib/constants';

function AdminMetaphoricalCards({ deck, deckTitle }) {
	const { t } = useTranslation();

	const [cards, setCards] = useState([
		{
			file: '',
			descriptionEn: '',
			descriptionRu: '',
			descriptionUa: '',
		}
	]);

	useEffect(() => {
		getCards();
	}, []);

	const getCards = async () => {
		const res = await fetch(`${SERVER}/metaphorical-cards/${deck}`);
		const data = await res.json();

		setCards(data);
	};

	const onChangeInput = async (e, cardI) => {
		const newState = cards.map(tableRow => {
			if (tableRow._id === cardI) {
				return {
					...tableRow,
					[e.target.name]: e.target.value
				};
			}
	
			return tableRow;
		});
		setCards(newState);
	};

	const saveCards = async (cardI) => {
		const updatedCard = cards.find(card => card._id === cardI);
		await fetch(`${SERVER}/metaphorical-cards/${deck}/${cardI}`, {
			method: 'PUT',
			body: JSON.stringify(updatedCard),
			headers: {
				'Content-Type': "application/json",
			},
		});
	};

	return (
		<div>
			<h2>{t(deckTitle)}</h2>
			
			<table className='menstrualCycleTable adminCardTable'>
				<thead>
					<tr>
						<td><span>{t('Image')}</span></td>
						<td><span>{t('English Description')}</span></td>
						<td><span>{t('Russian Description')}</span></td>
						<td><span>{t('Ukrainian Description')}</span></td>
						<td></td>
					</tr>
				</thead>
				<tbody>
					{cards.map((card, cardI) => (
						<tr key={cardI}>
							<td>
								<img src={card.file} alt={card.file} className='previewCard' />
							</td>
							<td>
								<textarea name='descriptionEn' value={card.descriptionEn} rows='5' onChange={e=>onChangeInput(e, card._id)} />
							</td>
							<td>
								<textarea name='descriptionRu' value={card.descriptionRu} rows='5' onChange={e=>onChangeInput(e, card._id)} />
							</td>
							<td>
								<textarea name='descriptionUa' value={card.descriptionUa} rows='5' onChange={e=>onChangeInput(e, card._id)} />
							</td>
							<td className='saveCardTd'>
								<button className='saveCard' onClick={()=>saveCards(card._id)}>{t('Save')}</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default AdminMetaphoricalCards;