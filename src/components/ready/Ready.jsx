import { motion } from "framer-motion";

import useSplitStrings from "../../hooks/useSplitStrings";

import "./ready.scss";

const Ready = () => {
	return (
		<section className="ready">
			<div className="container">
				<motion.h2
					className="ready__title"
					initial="hidden"
					whileInView="visible"
					variants={{
						hidden: {},
						visible: { transition: { staggerChildren: 0.07 } },
					}}>
					{useSplitStrings("ready to test your knowledge?")}
				</motion.h2>
				<motion.a
					className="ready__button"
					href="#"
					whileHover={{ scale: 1.05 }}
					transition={{ type: "spring", stiffness: 400, damping: 10 }}>
					try it
				</motion.a>
			</div>
		</section>
	);
};

export default Ready;
