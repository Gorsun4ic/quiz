import "./question.scss";

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
							disabled={selectedOption !== null}
							onClick={() => {
								handleAnswerClick(index);
							}}>
							{`${optionLetter(index)} ${option[0]}`}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Question;
