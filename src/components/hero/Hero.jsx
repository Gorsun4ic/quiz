import { useState } from "react";
import { motion, useAnimate } from "framer-motion";

import useSplitStrings from "../../hooks/useSplitStrings";

import "./hero.scss";
import arrow from "../../resources/img/arrow-down.svg";

const AppHero = () => {
	return (
		<div className="hero">
			<div className="container">
				<motion.h1
					className="hero__title"
					initial="hidden"
					whileInView="visible"
					variants={{
						hidden: {},
						visible: { transition: { staggerChildren: 0.1 } },
					}}>
					{useSplitStrings("Test Your Knowledge. Elevate Your Experıence.")}
				</motion.h1>
				<div className="hero__scroll">
					<motion.img
						src={arrow}
						alt=""
						animate={{ y: [0, -5, 0]}}
						transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
						draggable="false"
					/>
					<p>Scroll down</p>
				</div>
			</div>
		</div>
	);
};

export default AppHero;
