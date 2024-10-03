import { memo } from "react";

import "./pagination.scss";

const Pagination = ({
	questions,
	currentQuestionIndex,
	answer,
	setCurrentQuestionIndex,
}) => {
	return (
		<ul className="pagination">
			{questions.map((_, i) => {
				const isActive = i === currentQuestionIndex ? "active" : "";
				const answerClass = answer.find((answerItem) => answerItem[0] === i);
				const isCorrect = answerClass
					? answerClass[1]
						? "correct"
						: "incorrect"
					: "";

				return (
					<li
						className={`pagination__element ${isActive} ${isCorrect}`}
						key={i}
						onClick={() => {
							setCurrentQuestionIndex(i);
						}}>
						{" "}
						{i + 1}
					</li>
				);
			})}
		</ul>
	);
};

export default Pagination;
