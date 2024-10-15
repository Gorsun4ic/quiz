/**
 * Question component that displays a question with its answer options
 * and handles the user's answer selection.
 *
 * @param {Object} question - The question object containing the question text and options.
 * @param {number} selectedOption - The index of the currently selected answer option.
 * @param {function} handleAnswerClick - Function to call when an answer option is clicked.
 * @param {number} correctOption - The index of the correct answer option.
 */
const Question = ({
	question,
	selectedOption,
	handleAnswerClick,
	correctOption,
}) => {
	// If there is no question, return null to avoid rendering errors.
	if (!question) return null;

	/**
	 * Get the appropriate CSS class for the question item based on selection status and correctness.
	 *
	 * @param {boolean} isSelected - Whether the option is selected by the user.
	 * @param {boolean} isCorrect - Whether the option is correct.
	 * @param {number} index - The index of the current option.
	 * @returns {string} - The CSS class for the question item.
	 */
	const getQuestionsItemCLass = (isSelected, isCorrect, index) => {
		if (isSelected) {
			return isCorrect ? "question__item_correct" : "question__item_incorrect";
		}
		if (correctOption === index) return "question__item_correct";
		return "";
	};

	/**
	 * Generate a letter label for the option based on its index.
	 *
	 * @param {number} index - The index of the option.
	 * @returns {string} - The letter label (A, B, C, etc.).
	 */
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
							disabled={selectedOption !== null}
							onClick={() => {
								handleAnswerClick(index); // Call the handler with the selected index
							}}>
							{`${optionLetter(index)} ${option[0]}`}{" "}
							{/* Display the option letter and text */}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Question;
