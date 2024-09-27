import { useEffect, useState, useMemo, useCallback, memo } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import useTestService from "../../services/testService";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./testQuestions.scss";
import timerImg from "../../resources/img/hourglass.svg";

const Pagination = memo(
	({ questions, currentQuestionIndex, answer, setCurrentQuestionIndex }) => {
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
							onClick={() => setCurrentQuestionIndex(i)}>
							{" "}
							{i + 1}
						</li>
					);
				})}
			</ul>
		);
	}
);

const Timer = ({ timer }) => {
	return (
		<div className="test__timer">
			<img src={timerImg} alt="" width="24" height="24" />
			<span>{timer}</span>
		</div>
	);
};

const Question = ({
	question,
	selectedOption,
	handleAnswerClick,
	correctOption,
}) => {
	if (!question) return null;

	const getQuestionsItemCLass = (isSelected, isCorrect, index) => {
		if (isSelected)
			return isCorrect ? "question__item_correct" : "question__item_incorrect";
		if (correctOption === index) return "question__item_correct";
		return "";
	};

	const optionLetter = (index) => `${String.fromCharCode(65 + index)}.`; // A = 65 in ASCII

	return (
		<div className="test__question question">
			<h2 className="question__title">{question.question}</h2>
			<ul className="questions__list">
				{question.options.map((option, index) => {
					const isCorrect = option[1];
					const isSelected = selectedOption === index;

					return (
						<li
							className={`question__item ${getQuestionsItemCLass(
								isSelected,
								isCorrect,
								index
							)}`}
							key={index}
							onClick={() => handleAnswerClick(index)}>
							{`${optionLetter(index)} ${option[0]}`}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

const Mark = ({ questions }) => {};

const TestQuestions = () => {
	const { testId } = useParams();
	const [testInfo, setTestInfo] = useState({
		questions: [],
	});
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedOption, setSelectedOption] = useState(null);
	const [correctOption, setCorrectOption] = useState(null);
	const [answer, setAnswer] = useState([]);
	const [transitioning, setTransitioning] = useState(null);
	const questionsLength = useMemo(
		() => testInfo.questions.length,
		[testInfo.questions]
	);
	const { getTestById, process, setProcess } = useTestService();

	useEffect(() => {
		getTestById(testId)
			.then(setTestInfo)
			.then(() => setProcess("confirmed"));
	}, [testId]);

	const findUnansweredQuestions = useCallback(() => {
		const answeredIndices = answer.map(([index]) => index);
		const unansweredQuestions = testInfo.questions
			.map((_, index) => index)
			.filter((index) => !answeredIndices.includes(index));

		return unansweredQuestions;
	}, [answer, testInfo.questions]);

	const handleAnswerClick = useCallback(
		(index) => {
			if (selectedOption !== null || transitioning) return;

			const correctIndex = testInfo.questions[
				currentQuestionIndex
			]?.options.findIndex((option) => option[1]);
			const isCorrect = index === correctIndex;

			setSelectedOption(index);
			setAnswer((prev) => [...prev, [currentQuestionIndex, isCorrect]]);
			setTransitioning(true);

			setTimeout(() => {
				setTransitioning(false);
				const unansweredQuestions = findUnansweredQuestions();

				if (
					currentQuestionIndex === questionsLength - 1 &&
					unansweredQuestions.length > 0
				) {
					// On last question, but unanswered questions exist
					setCurrentQuestionIndex(unansweredQuestions[0]); // Jump to first unanswered question
				} else if (unansweredQuestions.length > 0) {
					const nextUnanswered = unansweredQuestions.find(
						(unansweredIndex) => unansweredIndex > currentQuestionIndex
					);

					if (nextUnanswered !== undefined) {
						setCurrentQuestionIndex(nextUnanswered); // Move to the next unanswered question
					} else {
						setCurrentQuestionIndex(unansweredQuestions[0]); // No unanswered ahead, go back to first
					}
				} else if (unansweredQuestions.length === 0) {
					console.log("All questions are answered");
					// Optional: Trigger a submit or final action here
				}

				setSelectedOption(null);
			}, 1500);
		},
		[
			selectedOption,
			transitioning,
			testInfo.questions,
			currentQuestionIndex,
			answer,
		]
	);

	const renderContent = () => {
		switch (process) {
			case "waiting":
			case "loading":
				return <Spinner />;
			case "confirmed":
				return (
					<>
						<Pagination
							questions={testInfo.questions}
							currentQuestionIndex={currentQuestionIndex}
							answer={answer}
							setCurrentQuestionIndex={setCurrentQuestionIndex}
						/>
						<Timer timer={testInfo.timer} />
						<Question
							question={testInfo.questions[currentQuestionIndex]}
							selectedOption={selectedOption}
							handleAnswerClick={handleAnswerClick}
						/>
					</>
				);
			case "error":
				return <ErrorMessage />;
			default:
				throw new Error("Unexpected state");
		}
	};

	return (
		<section className="test" key="test-section">
			<Helmet>
				<meta
					name={`${testInfo.name || "Test"} page`}
					description={`${testInfo.name || "Test"} page`}
				/>
				<title>{`Quizcrafter | ${testInfo?.name || "Test"} test page`}</title>
			</Helmet>
			<div className="container">
				<div className="test__question question">{renderContent()}</div>
			</div>
		</section>
	);
};

export default TestQuestions;
