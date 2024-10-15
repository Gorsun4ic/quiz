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

/**
 * TestQuestions Component
 * 
 * This component renders a quiz interface that allows users to answer questions
 * and tracks their progress, selected answers, and the time remaining. It fetches
 * test data from a service and provides functionality for pagination, 
 * answer selection, and timing.
 * 
 * Props:
 * - onFinish: A callback function that is called when the quiz is finished,
 *              providing the total used time.
 * - setMarkData: A callback function to set the user's score and related data
 *                 after the quiz is completed.
 * 
 * Internal State:
 * - testInfo: An object containing the test questions and timer settings.
 * - currentQuestionIndex: An integer representing the current question being displayed.
 * - selectedOption: An object storing the selected option for each question.
 * - answer: An array storing the user's answers and their correctness for each question.
 * - showCorrectAnswer: A boolean indicating whether to show the correct answer after
 *                      the user selects an option.
 * - transitioning: A boolean indicating whether a transition effect is in progress.
 * 
 * Custom Hooks:
 * - useTimer: A custom hook that manages the countdown timer and the time used 
 *             by the user during the quiz.
 * 
 * Key Functions:
 * 
 * 1. formatTime(totalSeconds)
 * - Helper function to format time from seconds into a string format of 
 *   "minutes:seconds".
 * 
 * Parameters:
 * - totalSeconds (number): The total time in seconds to be formatted.
 * 
 * Returns:
 * - An object containing:
 *   - timeToShow (string): The formatted time string.
 *   - seconds (number): The remaining seconds.
 *   - minutes (number): The remaining minutes.
 * 
 * 2. useTimer(initialTimer)
 * - A custom hook that manages the quiz countdown and used time.
 * 
 * Parameters:
 * - initialTimer (number): The initial timer value in minutes.
 * 
 * Returns:
 * - An object containing:
 *   - quizTimeLeft (object): The formatted remaining time.
 *   - usedTime (object): The formatted used time.
 *   - startTimers (function): Function to start the timer.
 *   - isRunning (boolean): Whether the timer is currently running.
 *   - timerFinished (boolean): Whether the timer has finished.
 * 
 * 3. setMark()
 * - Calculates the final score and calls the onFinish callback with the total used time.
 * 
 * Returns: 
 * - None
 * 
 * 4. findUnansweredQuestions()
 * - Returns the indices of questions that have not been answered yet.
 * 
 * Returns:
 * - Array of unanswered question indices.
 * 
 * 5. findCorrectAnswers()
 * - Calculates the number of correct answers based on user responses.
 * 
 * Returns:
 * - The count of correct answers (number).
 * 
 * 6. handleAnswerClick(index)
 * - Handles the user's answer selection, updates the state, and manages transitions 
 *   between questions.
 * 
 * Parameters:
 * - index (number): The index of the selected answer option.
 * 
 * Returns:
 * - None
 * 
 * Rendering:
 * The component conditionally renders content based on the loading process state.
 * It displays a loading spinner, error message, or the main quiz interface with 
 * pagination, timer, and questions.
 * 
 * Usage:
 * This component is typically used within a Router, where the testId is extracted 
 * from the URL parameters, and it fetches test data using a test service.
 * 
 * Example:
 * <TestQuestions onFinish={handleFinish} setMarkData={setMarkData} />
 * 
 * Note:
 * Ensure that the `testService` and other required components are correctly implemented 
 * and imported for this component to function properly.
 */



// Helper to format time
const formatTime = (totalSeconds) => {
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	return {
		timeToShow: `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`,
		seconds: seconds,
		minutes: minutes,
	};
};

const useTimer = (initialTimer) => {
	const [quizTimeLeft, setQuizTimeLeft] = useState(
		initialTimer ? initialTimer * 60 : null
	);
	const [usedTime, setUsedTime] = useState(0); // Store used time in seconds
	const [isRunning, setIsRunning] = useState(false);
	const [timerFinished, setTimerFinished] = useState(false);

	// Effect to manage used time
	useEffect(() => {
		if (!isRunning) return

		const intervalId = setInterval(() => {
			setUsedTime((prev) => {
				return prev + 1; // Increment the used time
			});
		}, 1000);

		return () => {
				clearInterval(intervalId);
		};
	}, [isRunning, usedTime]);

	// Effect to manage quiz countdown
	useEffect(() => {
		if (!isRunning || quizTimeLeft <= 0) return;

		const intervalId = setInterval(() => {
			setQuizTimeLeft((prev) => {
				if (prev <= 1) {
					clearInterval(intervalId);
					setIsRunning(false);
					setTimerFinished(true);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(intervalId);
	}, [isRunning, quizTimeLeft]);


	// Start timer logic
	const startTimers = useCallback(() => {
		if (!isRunning) {
			setIsRunning(true);
		}
	}, [isRunning]);

	// Reset the timer if initialTimer changes
	useEffect(() => {
		setQuizTimeLeft(initialTimer ? initialTimer * 60 : null);
		setUsedTime(0); // Reset used time
		setIsRunning(false); // Reset running state
		setTimerFinished(false); // Reset finished state
	}, [initialTimer]);

	return {
		quizTimeLeft: quizTimeLeft !== null ? formatTime(quizTimeLeft) : null, // Formatted quiz time or null
		usedTime: formatTime(usedTime), // Formatted used time
		startTimers, // Start both timers
		isRunning,
		timerFinished,
	};
};

const TestQuestions = ({ onFinish, setMarkData }) => {
	const { testId } = useParams();
	const [testInfo, setTestInfo] = useState({
		questions: [],
		timer: 0, // Default timer value
	});
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedOption, setSelectedOption] = useState({});
	const [answer, setAnswer] = useState([]);
	const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
	const [transitioning, setTransitioning] = useState(false);
	const questionsLength = useMemo(
		() => testInfo.questions.length,
		[testInfo.questions]
	);
	const { getTestById, process, setProcess } = useTestService();
	const {
		usedTime,
		quizTimeLeft,
		startTimers,
		timerFinished,
	} = useTimer(testInfo.timer);

	useEffect(() => {
		getTestById(testId).then((data) => {
			setTestInfo(data);
			setProcess("confirmed");
		});
	}, [testId]);

	useEffect(() => {
		startTimers();
	}, []);

	useEffect(() => {
		if (timerFinished) {
			setMark(); // Automatically finish when time is up
		}
	}, [onFinish, usedTime, timerFinished]);

	useEffect(() => {
		if (answer.length === questionsLength && questionsLength > 0) {
			setMark();
		}
	}, [answer, questionsLength, onFinish]);

	useEffect(() => {
		const answeredQuestion = answer.find(
			([qIndex]) => qIndex === currentQuestionIndex
		);

		setSelectedOption((prev) => ({
			...prev,
			[currentQuestionIndex]: answeredQuestion ? answeredQuestion[2] : null, // Use 0 instead of null if no answer
		}));
	}, [currentQuestionIndex, answer]);

	const setMark = () => {
		onFinish(usedTime);
		const correctAnswers = findCorrectAnswers();
		setMarkData({
			totalQuestions: questionsLength,
			score: correctAnswers,
			result: Math.floor((correctAnswers * 100) / questionsLength),
			correct: correctAnswers,
			inCorrect: questionsLength - correctAnswers,
		});
	};

	// This function create opportunity doesn't end the quiz if user answered last question
	const findUnansweredQuestions = useCallback(() => {
		const answeredIndices = new Set(answer.map(([index]) => index));
		return testInfo.questions
			.map((_, index) => index)
			.filter((index) => !answeredIndices.has(index));
	}, [answer, testInfo.questions]);

	const findCorrectAnswers = () => {
		return answer.filter(([_, correct]) => correct === true).length;
	};

	// Used to show correct option if user choose wrong
	const showCorrectOption = () => {
		return testInfo.questions[currentQuestionIndex]?.options.findIndex(
			(option) => option[1]
		);
	};

	const handleAnswerClick = useCallback(
		(index) => {
			if (
				transitioning ||
				answer.some(([qIndex]) => qIndex === currentQuestionIndex)
			)
				return;

			const correctIndex = showCorrectOption();
			const isCorrect = index === correctIndex;

			// Update selected option
			setSelectedOption((prev) => ({
				...prev,
				[currentQuestionIndex]: index,
			}));

			// Update the answer state
			setAnswer((prev) => [
				...prev.filter(([qIndex]) => qIndex !== currentQuestionIndex),
				[currentQuestionIndex, isCorrect, index],
			]);
			setTransitioning(true);
			setShowCorrectAnswer(false);

			let showCorrectAnswerTransition;

			if (!isCorrect) {
				showCorrectAnswerTransition = setTimeout(() => {
					setShowCorrectAnswer(true);
				}, 400);
			}

			setTimeout(() => {
				setTransitioning(false);
				const unansweredQuestions = findUnansweredQuestions();

				if (unansweredQuestions.length === 0) {
					onFinish(usedTime);
				} else {
					const nextUnanswered = unansweredQuestions.find(
						(unansweredIndex) => unansweredIndex > currentQuestionIndex
					);
					setCurrentQuestionIndex(nextUnanswered ?? unansweredQuestions[0]);
					setShowCorrectAnswer(false);
				}
				return () => clearTimeout(showCorrectAnswerTransition);
				// Maintain selected option until the end
			}, 1500);
		},
		[
			transitioning,
			testInfo.questions,
			currentQuestionIndex,
			answer,
			findUnansweredQuestions,
			onFinish,
			usedTime,
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
							setShowCorrectAnswer={setShowCorrectAnswer}
						/>
						<Timer timer={quizTimeLeft} />
						<Question
							question={testInfo.questions[currentQuestionIndex]}
							selectedOption={selectedOption[currentQuestionIndex] ?? null} // Prepopulate selected option
							handleAnswerClick={handleAnswerClick}
							correctOption={showCorrectAnswer ? showCorrectOption() : null}
							isCorrect={answer.some(
								([qIndex, isCorrect]) =>
									qIndex === currentQuestionIndex && isCorrect
							)}
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


