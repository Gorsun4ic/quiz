import { lazy, useRef, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorMessage } from "formik";
import { motion } from "framer-motion";

const Hero = lazy(() => import("../../hero/Hero"));
const Demo = lazy(() => import("../../demo/Demo"));
const Features = lazy(() => import("../../features/Feautures"));
const Ready = lazy(() => import("../../ready/Ready"));
const FAQ = lazy(() => import("../../faq/FAQ"));

const sections = [
	{ Component: Hero, id: "hero" },
	{ Component: Demo, id: "demo" },
	{ Component: Features, id: "features" },
	{ Component: Ready, id: "ready" },
	{ Component: FAQ, id: "faq" },
];

const MainPage = () => {
	const containerRef = useRef(null);
	const currentSectionIndex = useRef(0);

	const handleScroll = (event) => {
		event.preventDefault();
		const delta = Math.sign(event.deltaY); // 1 for down, -1 for up

		if (delta === 1 && currentSectionIndex.current < sections.length - 1) {
			currentSectionIndex.current++;
		} else if (delta === -1 && currentSectionIndex.current > 0) {
			currentSectionIndex.current--;
		}

		// Scroll to the current section
		const nextSection =
			containerRef.current.children[currentSectionIndex.current];
		nextSection.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		const container = containerRef.current;
		if (container) {
			container.addEventListener("wheel", handleScroll);
		}

		return () => {
			if (container) {
				container.removeEventListener("wheel", handleScroll);
			}
		};
	}, []);

	return (
		<main
			id="main-page"
			ref={containerRef}
			style={{ overflowY: "hidden", height: "100vh" }} // Prevent native scroll
		>
			{sections.map(({ Component, id }) => (
				<ErrorBoundary key={id} fallback={<ErrorMessage />}>
					<motion.div
						initial={{ opacity: 0 }} // Initial state
						animate={{ opacity: 1 }} // Fade in animation
						exit={{ opacity: 0 }} // Fade out animation
						transition={{ duration: 0.5 }} // Transition settings
						style={{
							height: "100vh",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}} // Center content
					>
						<Component />
					</motion.div>
				</ErrorBoundary>
			))}
		</main>
	);
};

export default MainPage;
