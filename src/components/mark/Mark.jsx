/**
 * Mark component displays the results of a quiz or test.
 * It shows the user's score, total questions, average time per question,
 * and allows the user to retry the test.
 *
 * Props:
 * - data: An object containing user's performance data (name, totalQuestions, score, result, totalTime, correct, inCorrect)
 * - onAgain: A function to call when the user clicks the "try again" button.
 */

import { useCallback } from "react";
import { motion } from "framer-motion";

import "./mark.scss";


/**
 * Checks if a value is a valid finite number.
 * @param {any} data - The value to check.
 * @returns {boolean} - True if the value is a valid number, false otherwise.
 */
const checkIsNumber = (data) => {
	return (
		typeof data === "number" && Number.isFinite(data) && !Number.isNaN(data)
	);
};

const Mark = ({ data, onAgain }) => {
	const { name, totalQuestions, score, result, totalTime, correct, inCorrect } =
		data;

	let title, text;

	// Determine the title and message based on the test result
	if (result >= 80) {
		title = `Congratulations, ${name}!`;
		text = "You passed this test!";
	} else {
		title = "Oops.";
		text = "Looks like you have some wrong answers. Try again!";
	}

	const isTimeCorrect = () => {
		return (
			totalTime &&
			checkIsNumber(totalTime.minutes) &&
			checkIsNumber(totalTime.seconds)
		);
	};

	/**
	 * Calculates the average time spent per question.
	 * Returns an object with minutes and seconds.
	 * Uses memoization to optimize performance by preventing
	 * unnecessary recalculations on re-renders.
	 */
	const getAverageTime = useCallback(() => {
		if (!isTimeCorrect()) return { minutes: 0, seconds: 0 };
		const totalSeconds = Math.floor(totalTime.minutes * 60 + totalTime.seconds);

		return {
			minutes: Math.floor(totalSeconds / totalQuestions / 60),
			seconds: Math.floor(totalSeconds / totalQuestions),
		};
	}, [totalTime]);

	const avgTime = getAverageTime();
	return (
		<motion.div
			className="mark"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}>
			<div className="container">
				<h2 className="mark__title">{title}</h2>
				<p className="mark__description">{text}</p>
				<div className="mark__total-questions">
					<span>{totalQuestions}</span>
					<p>Questions</p>
				</div>
				<div className="mark__stats stats">
					<div className="stats__left">
						<div>
							<div className="score">
								<p>score</p>
								<div>
									{score}/{totalQuestions}
								</div>
							</div>
							<div className="result">
								<p>result</p>
								<div>{result}%</div>
							</div>
						</div>
						<div className="total-time">
							<p>total time</p>
							<div>
								{totalTime ? (
									<>
										{totalTime.minutes} min {totalTime.seconds} sec
									</>
								) : (
									0
								)}
							</div>
						</div>
					</div>
					<div className="stats__right">
						<div className="total-time">
							<p>AVG TIME / QUESTION</p>
							<div>
								{avgTime.minutes} min {avgTime.seconds} sec
							</div>
						</div>
						<div>
							<div className="correct">
								<div>{correct}</div>
								<p>correct</p>
							</div>
							<div className="incorrect">
								<div>{inCorrect}</div>
								<p>incorrect</p>
							</div>
						</div>
					</div>
				</div>
				<button className="try-again" onClick={onAgain}>
					try again
				</button>
			</div>
		</motion.div>
	);
};

export default Mark;
