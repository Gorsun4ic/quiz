import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

import useFollowCursor from "../../hooks/useFollowCursor";

import "./appHeader.scss";

const AppHeader = () => {
	const { x, y } = useFollowCursor();

	return (
		<header className="header">
			<div className="container">
				<Link to="/" href="#" className="header__logo">
					Quizcrafter
				</Link>

				<ul className="header__list">
					<motion.li
						className="header__item"
						whileHover={{
							backgroundColor: "#fff",
							color: "#000",
							borderRadius: "5px",
							transition: { type: "spring", stiffness: 300, damping: 20 },
						}}>
						<Link to="/" href="#" className="header__link">
							Main page
						</Link>
					</motion.li>
					<motion.li
						className="header__item"
						whileHover={{
							backgroundColor: "#fff",
							color: "#000",
							borderRadius: "5px",
							transition: { type: "spring", stiffness: 300, damping: 20 },
						}}>
						<Link to="tests" href="#" className="header__link">
							Tests
						</Link>
					</motion.li>
				</ul>
			</div>
		</header>
	);
};

export default AppHeader;
