import React from 'react';

const ArrowBottom = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='35'
		height='35'
		viewBox='0 0 24 24'
		fill='none'
		stroke='#000000'
		strokeWidth='2.5'
		strokeLinecap='round'
		strokeLinejoin='round'
	>
		<path d='M6 9l6 6 6-6' />
	</svg>
);

export function BottomSheetOngkir({
	isBottomSheetOngkir,
	isDataArea,
	selectDataArea,
	isValueCity,
	isValueProvince,
	isValueSubdistrict,
	isSelectNameArea,
	isValueSearch,
	setValueSearch,
	isLoadArea,
	setHandleFocus,
	isHandleFocus,
	handleCloseBsOngkir,
	handleMinimize,
}) {
	let name;
	let selectName;
	let number;
	if (isValueProvince === null && isValueCity === null && isValueSubdistrict === null) {
		name = 'province';
		selectName = 'Provinsi';
		number = 1;
	} else if (isValueProvince !== null && (isValueCity === null) & (isValueSubdistrict === null)) {
		name = 'city';
		selectName = 'Kota';
		number = 2;
	} else if (isValueProvince !== null && isValueCity !== null && isValueSubdistrict === null) {
		name = 'subdistrict';
		selectName = 'Kecamatan';
		number = 3;
	}

	return (
		<div className='ditoko__p0'>
			<div
				className={`${isHandleFocus ? 'ditoko__bottomSheetActive' : 'ditoko__bottomSheetNonActive'} ditoko__bottomSheetOngkir ${
					isBottomSheetOngkir ? 'ditoko__block' : 'ditoko__hidden'
				}`}
			>
				<div className='ditoko__flex ditoko__between'>
					<div onClick={handleCloseBsOngkir} className='ditoko__BsOngkirClose'>
						<img src={ArrowBack} alt='close' />
					</div>

					<div onClick={handleMinimize} className={`ditoko__BsOngkirMinimize ${isHandleFocus ? 'ditoko__block' : 'ditoko__hidden'}`}>
						{ArrowBottom}
					</div>
				</div>

				<div className='ditoko__headerBsOrder'>
					<h4>
						{number}. Pilih {selectName}
					</h4>
					<p>{isSelectNameArea !== null ? `${isSelectNameArea} :` : 'Kirim paket ke alamat mana?'} </p>
				</div>

				<div className='ditoko__searchBsOrder'>
					<input
						onFocus={() => setHandleFocus(true)}
						onChange={(e) => setValueSearch(e.target.value)}
						value={isValueSearch}
						type='text'
						placeholder={`Cari ${selectName}`}
					/>
					<div className='ditoko__relative'>
						<div className='ditoko__iconSearchBsOngkir'>{IconSearch}</div>
					</div>
				</div>

				{isLoadArea ? (
					<div className='ditoko__mt30'>
						<div className='ditoko__loadingContent' />
					</div>
				) : (
					<div className={`${isHandleFocus ? 'ditoko__scrollDataAreaActive' : 'ditoko__scrollDataArea'} `}>
						{isDataArea
							.filter((items) => {
								if (isValueSearch === '') {
									return items;
								} else if (items.name.toLowerCase().includes(isValueSearch.toLowerCase())) {
									return items;
								}
							})
							.map((items, i) => {
								return (
									<div
										key={i}
										onClick={selectDataArea}
										id={items.id}
										value={items.name}
										name={name}
										className='ditoko__listData ditoko__flex ditoko__between ditoko__alignCenter'
									>
										{items.name} <img src={RightArrow} alt='arrow' />
									</div>
								);
							})}
					</div>
				)}
			</div>
		</div>
	);
}

const IconSearch = (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='22'
		height='22'
		viewBox='0 0 24 24'
		fill='none'
		stroke='#767676'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
	>
		<circle cx='11' cy='11' r='8'></circle>
		<line x1='21' y1='21' x2='16.65' y2='16.65'></line>
	</svg>
);
