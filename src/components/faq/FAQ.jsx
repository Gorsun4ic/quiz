import { motion } from "framer-motion";

import useSplitStrings from "../../hooks/useSplitStrings";

import "./faq.scss";
import icon from "../../resources/img/faq-title-icon.svg";

const FAQ = () => {
	return (
		<section className="faq">
			<div className="container">
				<div className="faq__text">
					<h2 className="faq__title">
						<motion.span
							initial="hidden"
							whileInView="visible"
							variants={{
								hidden: {},
								visible: { transition: { staggerChildren: 0.1 } },
							}}>
							{useSplitStrings("FAQ")}
						</motion.span>
						<img
							src={icon}
							alt="FAQ"
							width="160"
							height="50"
							loading="lazy"
							draggable="false"
						/>
					</h2>
					<motion.p
						className="faq__desc"
						initial="hidden"
						whileInView="visible"
						variants={{
							hidden: {},
							visible: { transition: { staggerChildren: 0.01 } },
						}}>
						{useSplitStrings(
							"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam volutpat nibh sed ex feugiat vulputate. Maecenas tempus dictum porta. Sed non nulla sed nulla mollis ornare."
						)}
					</motion.p>
				</div>
				<ul className="faq__accordions">
					<li className="faq__acordion">
						<h3 className="faq__name">Here is some quiestion?</h3>
						<p className="faq__text">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						</p>
					</li>
					<li className="faq__acordion">
						<h3 className="faq__name">Here is some quiestion?</h3>
						<p className="faq__text">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						</p>
					</li>
					<li className="faq__acordion">
						<h3 className="faq__name">Here is some quiestion?</h3>
						<p className="faq__text">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						</p>
					</li>
				</ul>
			</div>
		</section>
	);
};

export default FAQ;
