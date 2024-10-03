import { motion } from "framer-motion";

const PageTransition = ({ children }) => {
	const variants = {
		initial: {
			height: 0, // Start with height 0
			opacity: 1,
		},
		animate: {
			height: "100vh", // Fill the entire viewport height
			opacity: 1,
			transition: {
				duration: 1, // Duration of the transition
				ease: [0.4, 0, 0.2, 1], // Smooth easing
			},
		},
		exit: {
			height: 0, // Collapse to height 0
			opacity: 1,
			transition: {
				duration: 1, // Duration of the transition
				ease: [0.4, 0, 0.2, 1], // Smooth easing
			},
		},
	};

	return (
		<motion.div
			initial="initial"
			animate="animate"
			exit="exit"
			variants={variants}
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				backgroundColor: "black", // Solid black background
				zIndex: 1, // Ensure it covers everything else
			}}>
			{/* Content is hidden during the transition */}
			<motion.div
				initial={{ opacity: 1 }}
				exit={{ opacity: 0 }} // Fade out content during the transition
				transition={{ duration: 1 }}
				style={{ height: "100%", overflow: "hidden" }}>
				{children}
			</motion.div>
		</motion.div>
	);
};

export default PageTransition;
