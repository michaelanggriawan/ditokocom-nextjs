import { Navigation } from '../components/navigation/navigation';
import { MetaHome } from '../meta/metaHome';

export default function Home() {
	return (
		<Navigation>
			<MetaHome />
			<h1>Home</h1>
		</Navigation>
	);
}
