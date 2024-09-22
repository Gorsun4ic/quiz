import { useState } from "react";
import { motion } from "framer-motion";

import useSplitStrings from "../../hooks/useSplitStrings";
import substract from "../../resources/img/subtract.svg";

import "./demo.scss";

const Demo = () => {
	const [hover, setHover] = useState(false); // Hover ul with demo
	const [selectedItem, setSelectedItem] = useState(null);
	const [click, setClick] = useState(null); // Set clicked item in demo
	const [substractAnimation, setSubstractAnimation] = useState(true); // For stop substract animation

	const questionsArr = [
		{
			index: "A.",
			x: -50,
			text: "Rome",
			correct: false,
			clicked: false,
		},
		{
			index: "B.",
			x: 40,
			text: "Kyiv",
			correct: true,
			clicked: false,
		},
		{
			index: "C.",
			x: -50,
			text: "Kharkiv",
			correct: false,
			clicked: false,
		},
		{
			index: "D.",
			x: 40,
			text: "Rome",
			correct: false,
			clicked: false,
		},
	];

	const setClass = (item, index) => {
		if (selectedItem === null) return null;

		if (selectedItem === index) {
			if (!item.correct) {
				setTimeout(() => {
					setClick(true);
				}, 500);
			}
			return item.correct
				? "question__item_correct"
				: "question__item_incorrect";
		}

		if (click && item.correct) {
			return "question__item_correct";
		}

		return "question__item_disabled";
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.3, // Delay between the animation of each child
			},
		},
	};

	// Child motion items animation
	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	const items = questionsArr.map((item, i) => {
		return (
			<motion.li
				key={i}
				variants={itemVariants}
				className={`question__item ${setClass(item, i)}`}
				onClick={() => {
					if (selectedItem === null) {
						setSelectedItem(i);
						setClick(false); // Reset the click state
						item.clicked = true;
					}
				}}>
				<span>{item.index}</span>
				<span>{item.text}</span>
			</motion.li>
		);
	});

	return (
		<section className="demo">
			<div className="container">
				<div className="demo__text">
					<motion.h2
						className="demo__title"
						initial="hidden"
						whileInView="visible"
						variants={{
							hidden: {},
						}}>
						{useSplitStrings("demo")}
					</motion.h2>
					<motion.img
						src={substract}
						initial={{ x: 75, y: -50 }}
						animate={{
							x: substractAnimation ? [75, -75, 75] : 0,
							rotate: substractAnimation ? 360 : 0,
						}}
						onTap={() => setSubstractAnimation(false)}
						drag
						dragConstraints={{
							top: -50,
							left: -50,
							right: 50,
							bottom: 50,
						}}
						transition={{
							ease: "easeInOut",
							duration: 3,
							repeat: substractAnimation ? Infinity : 0,
							repeatType: "loop",
						}}
						draggable="false"
					/>
					<motion.p
						className="demo__desc"
						initial="hidden"
						whileInView="visible"
						variants={{
							hidden: {},
							visible: { transition: { staggerChildren: 0.015 } },
						}}>
						{useSplitStrings(
							"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam volutpat nibh sed ex feugiat vulputate. Maecenas tempus dictum porta. Sed non nulla sed nulla mollis ornare."
						)}
					</motion.p>
				</div>
				<div className="demo__question question">
					<p className="question__title">What is the capital of Ukraine?</p>
					<motion.ul
						className="question__list"
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						onMouseEnter={() => setHover(true)}
						onMouseLeave={() => setHover(false)}
					>
						{items}
					</motion.ul>
				</div>
			</div>
		</section>
	);
};

export default Demo;
