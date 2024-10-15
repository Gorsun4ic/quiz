import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import TestStart from "../../testStart/TestStart";
import TestQuestions from "../../testQuestions/TestQuestions";
import Mark from "../../mark/Mark";

import "./singleTestPage.scss";

const SingleTestPage = () => {
	const [userName, setUserName] = useState(null);
	const [time, setTime] = useState({
		timeToShow: 0,
		minutes: 0,
		seconds: 0,
	});
	const [markData, setMarkData] = useState({
		name: userName,
		totalQuestions: 0,
		score: 0,
		result: 0,
		totalTime: time,
		correct: 0,
		inCorrect: 0,
	});
	const [process, setProcess] = useState("start");
	const { testId } = useParams();

	useEffect(() => {
		setMarkData((prevData) => ({
			...prevData,
			name: userName,
			totalTime: time,
		}));
	}, [userName, time]);

	const onStart = () => {
		setProcess("questions");
	};

	const onFinish = (usedTime) => {
		const {minutes, seconds, timeToShow} = usedTime;
		setProcess("finish");
		setTime({
			timeToShow: timeToShow,
			minutes: minutes,
			seconds: seconds
		});
	};

	const onAgain = () => {
		setMarkData({
			name: userName,
			totalQuestions: 0,
			score: 0,
			result: 0,
			totalTime: 0,
			correct: 0,
			inCorrect: 0,
		});
		setProcess("questions");
	};

	const setContent = (process) => {
		switch (process) {
			case "start":
				return (
					<TestStart
						data={testId}
						setUserName={setUserName}
						onStart={onStart}
					/>
				);
			case "questions":
				return (
					<TestQuestions
						data={testId}
						onFinish={onFinish}
						setMarkData={setMarkData}
					/>
				);
			case "finish":
				return <Mark data={markData} onAgain={onAgain} />;
		}
	};

	return <main id="test-page">{setContent(process)}</main>;
};

export default SingleTestPage;
