import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { FULCRUM, INTERNAL_COMPASS, SERVER } from '../../lib/constants';

import './Admin.css';

function AddMetaphoricalCards() {
	const { t } = useTranslation();

	const bgColour = localStorage.getItem('bgColour');

	const [deck, setDeck] = useState(FULCRUM);
	const [cards, setCards] = useState([
		{
			file: '',
			deck: '',
			descriptionEn: '',
			descriptionRu: '',
			descriptionUa: '',
		}
	]);

	const onHandleChangeDeck = (e) => {
		setDeck(e.target.value);
	};
	const handleAddRow = () => {
		setCards([...cards, {
			file: '',
			deck: '',
			descriptionEn: '',
			descriptionRu: '',
			descriptionUa: '',
		}]);
	};

	const onChangeInput = async (e, cardI) => {
		if (e.target.name === 'file') {
			const file = e.target.files[0]
			const formData = new FormData();
			if (file) formData.append('file', file);

			const resp = await axios.post(`${SERVER}/metaphorical-cards/file`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data; boundary=something',
				}
			});

			const newState = cards.map((tableRow, ind) => {
				if (ind === cardI) {
					return {
						...tableRow,
						deck,
						file: resp.data,
						fileUrl: window.URL.createObjectURL(e.target.files[0]),
					};
				}
		
				return tableRow;
			});
			setCards(newState);
		} else {
			const newState = cards.map((tableRow, ind) => {
				if (ind === cardI) {
					return {
						...tableRow,
						deck,
						[e.target.name]: e.target.value
					};
				}
		
				return tableRow;
			});
			setCards(newState);
		}
	};

	const saveCards = async () => {
		await fetch(`${SERVER}/metaphorical-cards`, {
			method: 'POST',
			body: JSON.stringify(cards),
			headers: {
				'Content-Type': "application/json",
			},
		});
	};

	return (
		<div className='adminPanel'>
			<h2>{t('Add a Card')}</h2>

			<div className='adminPanelDiv'>
				<select className='adminSelectDeck' style={{ backgroundColor: bgColour }} value={deck} onChange={onHandleChangeDeck}>
					<option value={FULCRUM}>{t('Fulcrum')}</option>
					<option value={INTERNAL_COMPASS}>{t('Internal Compass')}</option>
				</select>
				<br /> 
				<button className='addRemoveRowTable' style={{ backgroundColor: bgColour }} onClick={handleAddRow}>+</button>

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
								<td className='adminCardTableFile'>
									<input type='file' name='file' onChange={(e) => onChangeInput(e, cardI)} />
										{(card && card.file) && 
											<img src={card.fileUrl} alt={card.fileUrl.name} className='previewCard' />
										}
								</td>
								<td>
									<textarea name='descriptionEn' value={card.descriptionEn} rows='5' onChange={(e) => onChangeInput(e, cardI)} />
								</td>
								<td>
									<textarea name='descriptionRu' value={card.descriptionRu} rows='5' onChange={(e) => onChangeInput(e, cardI)} />
								</td>
								<td>
									<textarea name='descriptionUa' value={card.descriptionUa} rows='5' onChange={(e) => onChangeInput(e, cardI)} />
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<button className='submit savePage' onClick={saveCards}>{t('Save')}</button>
			</div>
		</div>
	)
};

export default AddMetaphoricalCards;