import Axios from 'axios';
import { useEffect, useState } from 'react';
import { ListItems } from '../components/category/ListItems';
import { MenuTab } from '../components/category/MenuTab';
import { Navigation } from '../components/navigation/navigation';

export async function getStaticProps() {
	// Connect to Database using DB properties
	return {
		props: {
			api_url: process.env.REACT_APP_API_ENDPOINT,
			file_url: process.env.REACT_APP_STATIC_FILES_URL,
		},
	};
}

export default function Category(props) {
	const [isCategories, setCategories] = useState([]);
	const [isLoadMenu, setLoadMenu] = useState(false);
	const [isTabMenu, setTabMenu] = useState(null);
	const [isTabLoad, setTabLoad] = useState(false);

	const getDataCategories = () => {
		Axios.get(`${props.api_url}categories`).then((res) => {
			// console.log(res.data.result);
			if (res.status === 200) {
				setTabMenu(res.data.result[0].id);
				setCategories(res.data.result);
				setTabLoad(true);
			}
		});
	};

	useEffect(() => {
		getDataCategories();
	}, []);

	const handleTab = (e) => {
		const name = e.target.getAttribute('name');
		// console.log(name);
		setTabMenu(name);
	};

	return (
		<Navigation>
			<div className='ditoko__flex'>
				<MenuTab
					categories={isCategories}
					isTabLoad={isTabLoad}
					setLoadMenu={setLoadMenu}
					handleTab={handleTab}
					isTabMenu={String(isTabMenu)}
					file_url={props.file_url}
				/>
				{isLoadMenu && <ListItems file_url={props.file_url} categories={isCategories} isTabMenu={isTabMenu} />}
			</div>
		</Navigation>
	);
}
