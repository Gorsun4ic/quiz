import { motion } from "framer-motion";

import useSplitStrings from "../../hooks/useSplitStrings";

import "./features.scss";
import custom from "../../resources/img/edit-contained.svg";
import timer from "../../resources/img/hourglass.svg";
import component from "../../resources/img/component.svg";

const Features = () => {
	const listArr = [
		{
			img: custom,
			title: "Customizable",
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam volutpat nibh sed e",
		},
		{
			img: timer,
			title: "Timed quizzes",
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam volutpat nibh sed e",
		},
		{
			img: component,
			title: "Various topics",
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam volutpat nibh sed e",
		},
	];

	const items = listArr.map((item, index) => {
		return (
			<motion.li
				className="features__item"
				key={index}
				initial="hidden"
				whileInView="visible"
				variants={{
					hidden: { opacity: 0, y: 100 },
					visible: { opacity: 1, duration: 1 * index, y: 0 },
				}}>
				<img
					className="features__icon"
					src={item.img}
					alt={item.title}
					draggable="false"
				/>
				<h3 className="features__name">{item.title}</h3>
				<p className="features__desc">{item.text}</p>
			</motion.li>
		);
	})

	return (
		<section className="features">
			<div className="container">
				<div className="features__heading">
					<motion.h2
						className="features__title"
						initial="hidden"
						whileInView="visible"
						variants={{
							hidden: {},
							visible: { transition: { staggerChildren: 0.2 } },
						}}>
						{useSplitStrings("features")}
					</motion.h2>
					<motion.p
						className="features__desc"
						initial="hidden"
						whileInView="visible"
						variants={{
							hidden: {},
							visible: { transition: { staggerChildren: 0.025 } },
						}}>
						{useSplitStrings(
							"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam volutpat nibh sed e"
						)}
					</motion.p>
				</div>
				<ul className="features__list">
					{items}
				</ul>
			</div>
		</section>
	);
};

export default Features;
