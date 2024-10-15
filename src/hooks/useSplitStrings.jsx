import { motion } from "framer-motion";

/**
 * useSplitStrings Hook
 *
 * A custom React hook that splits a given string into individual characters 
 * and returns an array of motion spans for animation using Framer Motion.
 *
 * Parameters:
 * - string (string): The input string to be split into characters.
 *
 * Returns:
 * - An array of <motion.span> elements, each representing a character from the input string. 
 *   Each character fades in when it comes into view.
 *
 * Usage Example:
 * const animatedText = useSplitStrings("Hello, World!");
 *
 * return (
 *   <div>
 *     {animatedText}
 *   </div>
 * );
 *
 * Note:
 * This hook utilizes Framer Motion to create a fade-in effect for each character,
 * making it useful for animated text effects in React components.
 */


const useSplitStrings = (string) => {
	const text = [...string];

	return text.map((item, i) => (
		<motion.span
			key={i}
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