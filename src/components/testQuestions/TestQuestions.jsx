import { useEffect, useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { motion } from "framer-motion";

import useTestService from "../../services/testService";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import Pagination from "../pagination/Pagination";
import Timer from "../timer/Timer";
import Question from "../question/Question";

import "./testQuestions.scss";

const TestQuestions = ({ onFinish, setMarkData }) => {
	const { testId } = useParams();
	const [testInfo, setTestInfo] = useState({
		questions: [],
	});
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedOption, setSelectedOption] = useState(null);
	const [answer, setAnswer] = useState([]);
	const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
	const [transitioning, setTransitioning] = useState(null);
	const [timerInitialized, setTimerInitialized] = useState(false);
	const [time, setTime] = useState({
		minutes: 0,
		seconds: 0,
	});
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

	useEffect(() => {
		// Initialize the timer only once when the testInfo.timer is available and time hasn't been set yet
		if (!timerInitialized) {
			setTime({
				minutes: testInfo.timer,
				seconds: 0,
			});
			setTimerInitialized(true);
			return; // Exit early to avoid triggering the completion check
		}

		// Ensure we don't finish the quiz prematurely until the timer is initialized
		if (!timerInitialized) {
			return;
		}

		// Only finish the quiz when both minutes and seconds reach 0 after initialization
		if (testInfo.timer && time.minutes === 0 && time.seconds === 0) {
			onFinish(testInfo.timer, time);
		}
	}, [time, onFinish, testInfo.timer, timerInitialized]);

	useEffect(() => {
		// Check if all questions are answered whenever answer changes
		if (answer.length === questionsLength && questionsLength > 0) {
			onFinish(testInfo.timer, time);
			setMarkData((prevState) => ({
				...prevState,
				totalQuestions: questionsLength,
				score: findCorrectAnswers(),
				result: Math.floor((findCorrectAnswers() * 100) / questionsLength),
				correct: findCorrectAnswers(),
				inCorrect: questionsLength - findCorrectAnswers(),
			}));
		}
	}, [answer, questionsLength, onFinish]);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTime((prevTime) => {
				if (prevTime.minutes === 0 && prevTime.seconds === 0) {
					clearInterval(intervalId);
					return prevTime;
				}
				if (prevTime.seconds === 0) {
					return {
						minutes: prevTime.minutes - 1,
						seconds: 59,
					};
				} else {
					return {
						...prevTime,
						seconds: prevTime.seconds - 1,
					};
				}
			});
		}, 1000);

		return () => clearInterval(intervalId);
	}, [testInfo.timer]);

	const findUnansweredQuestions = useCallback(() => {
		const answeredIndices = new Set(answer.map(([index]) => index));
		const unansweredQuestions = testInfo.questions
			.map((_, index) => index)
			.filter((index) => !answeredIndices.has(index));

		return unansweredQuestions;
	}, [answer, testInfo.questions]);

	const findCorrectAnswers = () => {
		const correctAnswers = answer.filter(([_, correct]) => correct === true);
		return correctAnswers.length;
	};

	const handleAnswerClick = useCallback(
		(index) => {
			if (selectedOption !== null || transitioning) return;

			const currentQuestion = testInfo.questions[currentQuestionIndex];
			const correctIndex = currentQuestion?.options.findIndex(
				(option) => option[1] === true
			);
			const isCorrect = index === correctIndex;

			// Avoid re-triggering if already answered
			if (answer.some(([qIndex]) => qIndex === currentQuestionIndex)) return;

			// Log the answer process
			console.log(`Answering question ${currentQuestionIndex}:`, isCorrect);

			setSelectedOption(index);
			setAnswer((prev) => [...prev, [currentQuestionIndex, isCorrect]]);
			setTransitioning(true);

			if (!isCorrect) {
				console.log(`${index} question is not correct.`); // Log correct index
			} else {
				console.log(`${index} question is correct.`); // Log correct index
			}

			setTimeout(() => {
				setTransitioning(false);
				const unansweredQuestions = findUnansweredQuestions();

				if (unansweredQuestions.length === 0) {
					console.log("All questions are answered");
					onFinish(testInfo.timer, time);
				} else {
					const nextUnanswered = unansweredQuestions.find(
						(unansweredIndex) => unansweredIndex > currentQuestionIndex
					);
					setCurrentQuestionIndex(nextUnanswered ?? unansweredQuestions[0]);
					setShowCorrectAnswer(false);
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
			findUnansweredQuestions,
			onFinish,
			time,
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
						<Timer timer={time} />
						<Question
							question={testInfo.questions[currentQuestionIndex]}
							selectedOption={selectedOption}
							handleAnswerClick={handleAnswerClick}
							correctOption={
								showCorrectAnswer
									? testInfo.questions[currentQuestionIndex]?.options.findIndex(
											(option) => option[1]
									  )
									: null
							}
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
		<motion.section
			className="test"
			key="test-section"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}>
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
		</motion.section>
	);
};

export default TestQuestions;
