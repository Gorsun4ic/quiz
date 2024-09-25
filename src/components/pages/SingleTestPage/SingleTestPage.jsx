import { useState } from "react";
import { useParams } from "react-router-dom";

import TestStart from "../../testStart/TestStart";
import TestQuestions from "../../testQuestions/TestQuestions";

const SingleTestPage = () => {
	const [hasStarted, setHasStarder] = useState(false);
	const [name, setName] = useState(null);
	const {testId} = useParams();

	const onStart = () => {
		setHasStarder(true);
	}

	const content = hasStarted ? <TestQuestions data={testId}/> : <TestStart data={testId} onStart={onStart}/>;

	return <>{content}</>;
};

export default SingleTestPage;
