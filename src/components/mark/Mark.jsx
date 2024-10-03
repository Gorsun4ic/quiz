import { motion } from "framer-motion";

import "./mark.scss";

const Mark = ({ data, onAgain }) => {
	const { name, totalQuestions, score, result, totalTime, correct, inCorrect } =
		data;

	let title, text;
	if (result >= 80) {
		title = `Congratulations, ${name}!`;
		text = "You passed this test!";
	} else {
		title = "Oops.";
		text = "Looks like you have some wrong answers. Try again!";
	}
	const avgTime = {
		minutes: Math.floor((totalTime.minutes * 60 + totalTime.seconds) / totalQuestions / 60),
		seconds:Math.floor((totalTime.minutes * 60 + totalTime.seconds) / totalQuestions) % 60
	};

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
								{totalTime.minutes} min {totalTime.seconds} sec
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
