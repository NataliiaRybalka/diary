import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SERVER } from '../../lib/constants';

function AdminMetaphoricalCards({ deck, deckTitle }) {
	const { t } = useTranslation();

	const [cards, setCards] = useState([
		{
			file: '',
			deck: '',
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
					</tr>
				</thead>
				<tbody>
					{cards.map((card, cardI) => (
						<tr key={cardI}>
							<td>{card.file}</td>
							<td>{card.descriptionEn}</td>
							<td>{card.descriptionRu}</td>
							<td>{card.descriptionUa}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default AdminMetaphoricalCards;