/**
 * MainPage component serves as the main entry point for the application.
 * It features smooth scroll navigation between different sections of the page,
 * each represented by a lazy-loaded component. Error boundaries are used to
 * handle any errors that may occur during component rendering.
 */
import { lazy, useRef, useEffect } from "react"; // React hooks for component lifecycle and lazy loading
import { ErrorBoundary } from "react-error-boundary"; // Error boundary component for handling errors
import { ErrorMessage } from "formik"; // Formik error message display component
import { motion } from "framer-motion"; // Animation library for React components

const Hero = lazy(() => import("../../hero/Hero"));
const Demo = lazy(() => import("../../demo/Demo"));
const Features = lazy(() => import("../../features/Feautures"));
const Ready = lazy(() => import("../../ready/Ready"));
const FAQ = lazy(() => import("../../faq/FAQ"));

/**
 * sections array defines the components and their corresponding ids for smooth scrolling.
 * Each entry consists of:
 * - Component: The lazy-loaded React component to render.
 * - id: A unique identifier for the section, used for scrolling.
 */
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

	/**
	 * Handles scroll events to navigate through sections of the page.
	 * It detects the scroll direction and updates the current section index accordingly.
	 * It scrolls to the currently active section smoothly.
	 *
	 * @param {WheelEvent} event - The wheel event triggered by the user scrolling.
	 */
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
			container.addEventListener("wheel", handleScroll); // Attach scroll event listener
		}

		// Cleanup: Remove the event listener on component unmount
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
						initial={{ opacity: 0 }} // Initial state for animation
						animate={{ opacity: 1 }} // Animate to visible
						exit={{ opacity: 0 }} // Animate to hidden on exit
						transition={{ duration: 0.5 }} // Animation duration
						style={{
							height: "100vh",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}} // Center content within the section
					>
						<Component />
					</motion.div>
				</ErrorBoundary>
			))}
		</main>
	);
};

export default MainPage;
