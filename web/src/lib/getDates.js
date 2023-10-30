const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

export const getMonday = (today) => {
	today = new Date(today);
	const nToday = today.getDay();
	const diff = today.getDate() - nToday + (nToday === 0 ? -6 : 1);
	return new Date(today.setDate(diff));
};

export const getWeekDays = (mon, lang) => {
	const week = [];
	// const mon = getMonday(new Date());
	week.push(mon.toLocaleDateString(lang, options));
	let i = 1;
	while (i < 7) {
		let newDate = new Date(mon.getTime());
		newDate.setDate(mon.getDate() + i);
		newDate = newDate.toLocaleDateString(lang, options);
		week.push(newDate);
		i++;
	}

	return week;
};

export const getToday = (lang) => {
	const today = new Date();
	let month = '' + (today.getMonth() + 1);
	let day = '' + today.getDate();
	const year = today.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return {
		word: today.toLocaleDateString(lang, options),
		numeric: [year, month, day].join('-'),
	};
};

export const getDateInLang = (date, lang) => {
	return date.toLocaleDateString(lang, options);
};

export const getMonth = (date) => {
	const year = date.getFullYear();
	let month = String(date.getMonth() + 1);
	month = month.length === 1 ? `0${month}` : month;
	return `${year}-${month}`;
};