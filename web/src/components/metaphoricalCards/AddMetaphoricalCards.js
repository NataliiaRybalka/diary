import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { FULCRUM, INTERNAL_COMPASS, SERVER } from '../../lib/constants';

import './Admin.css';

function AddMetaphoricalCards() {
	const { t } = useTranslation();

	const bgColour = localStorage.getItem('bgColour');

	const [deck, setDeck] = useState(FULCRUM);
	const [inputValues, setInputValues] = useState({
		file: '',
		deck: '',
		descriptionEn: '',
		descriptionRu: '',
		descriptionUa: '',
	});
	const [rows, setRows] = useState(1);

	const onHandleChangeDeck = (e) => {
		setDeck(e.target.value);
	};

	const onHandleChangeInput = (e) => {
		if (e.target.name === 'file') {
		setInputValues(prev => ({
			...prev,
			...{
			file: e.target.files[0],
			fileUrl: URL.createObjectURL(e.target.files[0])
			}
		}));
		} else {
		setInputValues(prev => ({
			...prev,
			...{
			description: e.target.value,
			deck,
			}
		}));
		}
	};

	const handleAddRow = () => {
		setRows(rows + 1)
	}

	const saveCards = async () => {
		setInputValues(delete inputValues.fileUrl);

		const formData = new FormData();
		if (inputValues.image) formData.append('file', inputValues.image);
		Object.entries(inputValues).map(([key, value]) => formData.append(key, value));

		await axios.post(`${SERVER}cards/`, formData, {
		headers: {
			'Content-Type': 'multipart/form-data; boundary=something',
		}
		});
		
		setInputValues({
		file: '',
		deck: '',
		description: '',
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
						<td>
							<span>{t('Image')}</span>
						</td>
						<td>
							<span>{t('Description')}</span>
						</td>
						</tr>
					</thead>
					<tbody>
						{[...Array(rows)].map((el, i) => (
							<tr key={i}>
								<td className='adminCardTableFile'>
									<input type='file' name='file' onChange={onHandleChangeInput} />
										{(inputValues && inputValues.file) && 
											<img src={inputValues.fileUrl} alt={inputValues.fileUrl.name} className='previewCard' />
										}
								</td>
								<td>
									<textarea name='description' rows='5' onChange={onHandleChangeInput} />
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