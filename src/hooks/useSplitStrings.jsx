import { motion } from "framer-motion";

const useSplitStrings = (string) => {
	const text = [...string];

	return text.map((item) => (
		<motion.span
			key={item}
			transition={{ duration: 0.1 }}
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			variants={{
				hidden: { opacity: 0 },
				visible: { opacity: 1 },
			}}>
			{item}
		</motion.span>
	));
};

export default useSplitStrings;