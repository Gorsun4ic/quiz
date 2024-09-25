import { motion } from "framer-motion";

import "./spiner.scss";

const Spinner = () => {
	return (
		<motion.div
			className="spinner"
			animate={{ rotate: 360 }}
			transition={{
				repeat: Infinity,
				duration: 1,
				ease: "linear",
			}}></motion.div>
	);
};

export default Spinner;
