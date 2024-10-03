import "./timer.scss";
import timerImg from "../../resources/img/hourglass.svg";

const Timer = ({ timer }) => {
	return timer.minutes > 0 ? (
		<div className="timer">
			<img src={timerImg} alt="" width="24" height="24" />
			<span>
				{timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes}:
				{timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}
			</span>
		</div>
	) : null;
};

export default Timer;
