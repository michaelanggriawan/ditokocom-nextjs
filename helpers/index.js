export function TGL(d = new Date()) {
	this.getYear = d.getFullYear();
	this.getMonth = d.toLocaleString('id', { month: 'long' });
	this.getAll = `${d.getDate()} ${this.getMonth} ${this.getYear}`;
}

export const calculateDiscountPercentage = (priceBD, priceAD) => Math.round(((priceBD - priceAD) / priceBD) * 100) + '%';

export const handleInfiniteScroll = (elm = window, callback) => {
	elm.onscroll = () => {
		if (elm.scrollHeight - elm.scrollTop <= elm.clientHeight + 200) {
			callback();
		}
	};
};

export const addCommas = (x, format = 'Rp. ', komaStrip = true) =>
	format + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + (komaStrip ? ',-' : '');

export const requestHeaders = (token) => ({
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
	},
});

export const getCommissionInfo = (commission) => {
	let level, percentage;
	if (commission <= 5000000) {
		level = 'Bronze';
		percentage = 5;
	} else if (commission <= 15000000) {
		level = 'Silver';
		percentage = 10;
	} else if (commission <= 25000000) {
		level = 'Gold';
		percentage = 15;
	} else if (commission > 25000000) {
		level = 'Platinum';
		percentage = 20;
	}
	return { level, percentage };
};

export const GetMonth = new Array();
GetMonth[0] = 'Jan';
GetMonth[1] = 'Feb';
GetMonth[2] = 'Mar';
GetMonth[3] = 'Apr';
GetMonth[4] = 'Mei';
GetMonth[5] = 'Jun';
GetMonth[6] = 'Jul';
GetMonth[7] = 'Agu';
GetMonth[8] = 'Sep';
GetMonth[9] = 'Okt';
GetMonth[10] = 'Nov';
GetMonth[11] = 'Des';

export function convertGramsToKg(grams) {
	return grams / 1000;
}

export const getValueParams = (params) => {
	const url_string = window.location.href;
	const url = new URL(url_string);
	return url.searchParams.get(params);
};
