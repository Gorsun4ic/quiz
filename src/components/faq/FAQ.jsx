import { useState } from "react";
import { motion } from "framer-motion";

import useSplitStrings from "../../hooks/useSplitStrings";

import "./faq.scss";
import icon from "../../resources/img/faq-title-icon.svg";

const accordionArr = [
	[
		"How is my quiz score calculated?",
		"Your score is calculated based on the number of correct answers and, in some cases, how quickly you complete the quiz. Some quizzes may have negative points for wrong answers, so read the instructions carefully before starting.",
	],
	[
		"Do I need to create an account to take a quiz?",
		"You can take most quizzes without an account, but creating one allows you to track your progress, save your results, and participate in leaderboards.",
	],
	[
		"Can I pause a quiz and resume it later?",
		"Most quizzes cannot be paused once started, especially if they are timed. Be sure you're ready to complete the quiz before you begin. However, some quizzes without timers may allow you to return to them later.",
	],
	[
		"How can I see my quiz results?",
		"After completing a quiz, your results will be displayed immediately, including your score and any correct or incorrect answers. If you have an account, your quiz history will be saved, and you can review your past results at any time.",
	],
];

const FAQ = () => {
	const [openItem, setOpenItem] = useState(false);

	const accordionVariants = {
		hidden: { height: 0, opacity: 0 },
		visible: { height: "auto", opacity: 1 },
	};


	const accordionList = accordionArr.map((item, i) => (
		<li
			className="faq__accordion"
			key={i}
			onClick={() => (openItem === i ? setOpenItem(false) : setOpenItem(i))}>
			<h3 className="faq__name">{item[0]}</h3>
			<motion.div
				initial="hidden"
				animate={openItem === i ? "visible" : "hidden"}
				exit="hidden"
				variants={accordionVariants}
				transition={{ duration: 0.3, ease: "easeInOut" }}
				className="faq__description">
				<p>{item[1]}</p>
			</motion.div>
		</li>
	));

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
				<ul className="faq__accordions">{accordionList}</ul>
			</div>
		</section>
	);
};

export default FAQ;
