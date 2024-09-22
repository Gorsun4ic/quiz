import { lazy, useRef } from "react";
import {motion, useScroll, useTransform} from "framer-motion";

const Hero = lazy(() => import("../hero/Hero"));
const Demo = lazy(() => import("../demo/Demo"));
const Features = lazy(() => import("../features/Feautures"));
const Ready = lazy(() => import("../ready/Ready"));
const FAQ = lazy(() => import("../faq/FAQ"));

const MainPage = () => {

	const container = useRef();
	const {scrollYProgress} = useScroll({
		target: container,
		offset: ["start start", "end end"]
	})

	return (
		<main id="main-page">
			<Hero />
			<Demo />
			<Features />
			<Ready />
			<FAQ />
		</main>
	);
};

export default MainPage;
