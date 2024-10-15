import "./timer.scss";
import timerImg from "../../resources/img/hourglass.svg";

const Timer = ({timer}) => {
	return timer ? (
		<div className="timer">
			<img src={timerImg} alt="" width="24" height="24" />
			<span>{timer.timeToShow}</span>
		</div>
	) : null;
};

export default Timer;
