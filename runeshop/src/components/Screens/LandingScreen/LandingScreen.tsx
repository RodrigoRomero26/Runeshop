import { Footer } from "../../ui/Footer/Footer";
import { Header } from "../../ui/Header/Header";
import { LandingBrandsExhibitor } from "../../ui/LandingBrandsExhibitor/LandingBrandsExhibitor";
import { ProductCarousel } from "../../ui/ProductCarousel/ProductCarousel";

import styles from "./LandingScreen.module.css";

export const LandingScreen = () => {
	const featuredProducts = [
		{ id: 1, name: 'Zapatillas Pro', image: 'https://imgs.search.brave.com/1EuIsDeRffUn4TbvODgTEofZPv4x2vot022dkxpGAbQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kYXNo/LnZ0ZXhhc3NldHMu/Y29tL2FycXVpdm9z/L2lkcy8xNTE4NTM1/LTUwMC1hdXRvP3Y9/NjM4NjI5NjAwNjg4/OTMwMDAwJndpZHRo/PTUwMCZoZWlnaHQ9/YXV0byZhc3BlY3Q9/dHJ1ZQ' },
		{ id: 2, name: 'Camiseta X', image: 'https://imgs.search.brave.com/1EuIsDeRffUn4TbvODgTEofZPv4x2vot022dkxpGAbQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kYXNo/LnZ0ZXhhc3NldHMu/Y29tL2FycXVpdm9z/L2lkcy8xNTE4NTM1/LTUwMC1hdXRvP3Y9/NjM4NjI5NjAwNjg4/OTMwMDAwJndpZHRo/PTUwMCZoZWlnaHQ9/YXV0byZhc3BlY3Q9/dHJ1ZQ' },
		{ id: 3, name: 'Jean Fit', image: '/img/jean.jpg' },
		{ id: 4, name: 'Gorra Classic', image: '/img/hat.jpg' },
		{ id: 5, name: 'Campera Run', image: '/img/jacket.jpg' },
		{ id: 6, name: 'Shorts Dry', image: '/img/shorts.jpg' },
	  ];
	  
	return (
		<div className={styles.containerLandingScreen}>
			<Header />
			<div className={styles.containerLandingScreenContent}>
				<ProductCarousel products={featuredProducts} />
				<LandingBrandsExhibitor />
				<Footer />
			</div>
		</div>
	);
};
