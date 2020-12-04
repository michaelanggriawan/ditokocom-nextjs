import '../assets/css/flex.css';
import '../assets/css/animate.css';
import '../assets/css/header.css';
import '../assets/css/sidebar.css';
import '../assets/css/section.css';
import '../assets/css/overlay.css';
import '../assets/css/navigation.css';
import '../assets/css/typography.css';
import '../assets/css/input.css';
import '../assets/css/button.css';
import '../assets/css/select.css';
import '../assets/css/textarea.css';
import '../assets/css/message.css';
import '../assets/css/menuTab.css';
import '../assets/css/listItems.css';
import '../assets/css/card.css';
import '../assets/css/activeHome.css';
import '../assets/css/brandCategory.css';
import '../assets/css/brandHome.css';
import '../assets/css/dailyDeals.css';
import '../assets/css/listCategory.css';
import '../assets/css/slider.css';
import '../assets/css/lazy.css';
import '../assets/css/core.css';
import '../assets/css/bottomSheet.css';
import '../assets/css/modalSwitchLocation.css';
import '../assets/css/bottomSheetOngkir.css';
import '../assets/css/ongkir.css';
import '../assets/css/sliderProduct.css';
import '../assets/css/tabelStock.css';
import '../assets/css/title.css';
import '../assets/css/overlay.css';
// import '../assets/css/global.css';

import { Product as ProductProvider, Purchase as PurchaseProvider } from '../contexts/Providers';

function MyApp({ Component, pageProps }) {
	return (
		<ProductProvider>
			<PurchaseProvider>
				<Component {...pageProps} />
			</PurchaseProvider>
		</ProductProvider>
	);
}

export default MyApp;
