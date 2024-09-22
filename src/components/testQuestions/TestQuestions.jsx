import "./testQuestions.scss";
import timerImg from "../../resources/img/hourglass.svg";

const TestQuestions = () => {
	return (
		<section className="test">
			<div className="container">
				<ul className="pagination">
					<li className="pagination__element active">1</li>
					<li className="pagination__element">2</li>
					<li className="pagination__element correct">3</li>
					<li className="pagination__element incorrect">4</li>
					<li className="pagination__element">5</li>
				</ul>
				<div className="test__timer">
					<img src={timerImg} alt="" width="24" height="24"/>
					<span>13:30</span>
				</div>
				<div className="test__question question">
					<h2 className="question__title">
						What is the type of missile is X-101?
					</h2>
					<ul className="question__list">
						<li className="question__item">A. First option</li>
						<li className="question__item">A. First option</li>
						<li className="question__item">A. First option</li>
						<li className="question__item">A. First option</li>
						<li className="question__item">A. First option</li>
					</ul>
				</div>
			</div>
		</section>
	);
};

export default TestQuestions;