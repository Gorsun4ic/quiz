
import useWindowResize from "../../hooks/useWindowResize";

import "./pagination.scss";

/**
 * Pagination component for displaying a set of questions.
 * It adapts its display based on screen size and current question index.
 *
 * @param {Array} questions - The array of questions to paginate through.
 * @param {number} currentQuestionIndex - The index of the current question.
 * @param {Array} answer - The user's answers to the questions.
 * @param {function} setCurrentQuestionIndex - Function to update the current question index.
 * @param {function} setShowCorrectAnswer - Function to toggle the display of the correct answer.
 */
const Pagination = ({
	questions,
	currentQuestionIndex,
	answer,
	setCurrentQuestionIndex,
	setShowCorrectAnswer,
}) => {
	// Get the current window width
	const screenWidth = useWindowResize();
	const showFullPagination = screenWidth > 768;

	/**
	 * Determines whether to show the pagination item based on the current question index and screen size.
	 *
	 * @param {Array} arr - The array of questions.
	 * @param {number} i - The index of the pagination item.
	 * @returns {boolean} - True if the pagination item should be shown; otherwise false.
	 */
	const showShorterPagination = (arr, i) => {
		if (showFullPagination) return true;

		const lastQuestions = arr.length - 1;

		return (
			i < currentQuestionIndex + 2 &&
			(lastQuestions
				? i > currentQuestionIndex - 3
				: i > currentQuestionIndex - 1)
		);
	};

	// Create pagination items
	const paginationItems = questions.map((_, i) => {
		const isActive = i === currentQuestionIndex ? "active" : "";
		const answerClass = answer.find((answerItem) => answerItem[0] === i);
		const isCorrect = answerClass
			? answerClass[1]
				? "correct"
				: "incorrect"
			: "";

		return showShorterPagination(questions, i) ? (
			<li
				className={`pagination__element ${isActive} ${isCorrect}`}
				key={i}
				onClick={() => {
					setCurrentQuestionIndex(i);
					setShowCorrectAnswer(false);
				}}>
				{" "}
				{i + 1}
			</li>
		) : null;
	});

	// Determine if ellipsis should be displayed
	const shouldShowDots =
		!showFullPagination &&
		questions.length > 6 &&
		currentQuestionIndex < questions.length - 2;

	return (
		<ul className="pagination">
			{paginationItems}
			{shouldShowDots && (
				<li key="dots" className="pagination__element dots">
					...
				</li>
			)}
		</ul>
	);
};

export default Pagination;
