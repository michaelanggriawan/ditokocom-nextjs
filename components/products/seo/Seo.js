import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Product as ProductContext } from '../../../contexts';
import { Helmet } from 'react-helmet';

export function Seo({ params }) {
	const { data } = useContext(ProductContext);
	// console.log(data);
	// trigerr...
	return (
		<Helmet>
			<title>{`${data.product.name} - ${params.subCategory} | Jual Beli Online - ditoko.com`}</title>
			<meta property='og:title' content={`${data.product.name}`} />
			<meta property='og:description' content={data.product.description_temp} />
			<meta property='og:url' content={`${process.env.REACT_APP_API_ENDPOINT}${params.subCategory}/${params.product}`} />
			<meta property='og:image' content={process.env.REACT_APP_STATIC_FILES_URL + data.product.images[0].image_url} />
			<meta property='product:brand' content={`${params.subCategory}`} />
			<meta property='product:availability' content='Selalu tersedia' />
			<meta property='product:condition' content='Baru' />
			<meta property='product:price:amount' content={data.product.daily_deal ? data.product.daily_deal.price : data.product.price} />
			<meta property='product:price:currency' content='IDR' />
			<meta property='product:retailer_item_id' content={data.product.name} />
		</Helmet>
	);
}

Seo.propTypes = {
	params: PropTypes.object.isRequired,
};
