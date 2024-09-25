import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import useTestService from "../../services/testService";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./testQuestions.scss";
import timerImg from "../../resources/img/hourglass.svg";

const TestQuestions = () => {
	const { testId } = useParams();
	const [testInfo, setTestInfo] = useState({
		questions: [],
		timer: null,
	});
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedOption, setSelectedOption] = useState(null);
	const [correctOption, setCorrectOption] = useState(null);
	const [correctAnswers, setCorrectAnswers] = useState(0);
	const [transitioning, setTransitioning] = useState(null);
	const { getTestById, process, setProcess } = useTestService();
	const questionsLength = testInfo.questions.length;

	useEffect(() => {
		getTestById(testId)
			.then(onQuestionLoaded)
			.then(() => setProcess("confirmed"));
	}, [testId]);

	const onQuestionLoaded = (tests) => {
		setTestInfo(tests);
	};

	const optionLetter = (i) => {
		const letters = ["A", "B", "C", "D", "E"];
		return letters[i] ? `${letters[i]}.` : "";
	};

	const Pagination = useMemo(() => {
		return () => (
			<ul className="pagination">
				{testInfo.questions.map((item, i) => (
					<li className="pagination__element active" key={i}>
						{i + 1}
					</li>
				))}
			</ul>
		);
	}, [testInfo.questions]);

	const Timer = useMemo(() => {
		return () => (
			<div className="test__timer">
				<img src={timerImg} alt="" width="24" height="24" />
				<span>{testInfo.timer}</span>
			</div>
		);
	}, [testInfo.timer]);

	const Question = () => {
		const question = testInfo.questions[currentQuestionIndex];

		if (!question) return null;

		const handleItemClick = (index) => {
			if (selectedOption !== null || transitioning) return; // Prevent further interaction

			setSelectedOption(index); // Mark selected option
			const correctIndex = question.options.findIndex((option) => option[1]); // Identify correct option
			setCorrectOption(correctIndex);

			const isCorrect = index === correctIndex;

			// Update correct answers count if answer is correct
			if (isCorrect) setCorrectAnswers((prev) => prev + 1);

			// Transition to next question after a brief delay to show feedback
			setTransitioning(true);
			setTimeout(() => {
				setTransitioning(false);
				setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
				setSelectedOption(null); // Reset selections for next question
				setCorrectOption(null); // Reset correct option
			}, 1500); // Adjust delay to show feedback
		};

		return (
			<div className="test__question question">
				<h2 className="question__title">{question.question}</h2>
				<ul className="questions__list">
					{question.options.map((option, index) => {
						const isCorrect = option[1];
						const isSelected = selectedOption === index;

						return (
							<li
								className={`question__item ${
									isSelected
										? isCorrect
											? "question__item_correct"
											: "question__item_incorrect"
										: correctOption === index
										? "question__item_correct"
										: ""
								}`}
								key={index}
								onClick={() => handleItemClick(index)}>
								{`${optionLetter(index)} ${option[0]}`}
							</li>
						);
					})}
				</ul>
			</div>
		);
	};

	const setContent = (process) => {
		switch (process) {
			case "waiting":
			case "loading":
				return <Spinner />;
			case "confirmed":
				return (
					<>
						<Pagination />
						<Timer />
						<Question />
					</>
				);
			case "error":
				return <ErrorMessage />;
			default:
				throw new Error("Unexpected state");
		}
	};

	return (
		<section
			className="test"
			key="test-section"
			initial={{ opacity: 0, x: 100 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -100 }}
			transition={{ duration: 0.5 }}>
			<Helmet>
				<meta
					name={`${testInfo.name} page`}
					description={`${testInfo.name} page`}
				/>
				<title>{`Quizcrafter | ${testInfo.name} test page`}</title>
			</Helmet>
			<div className="container">
				<div className="test__question question">{setContent(process)}</div>
			</div>
		</section>
	);
};

export default TestQuestions;
