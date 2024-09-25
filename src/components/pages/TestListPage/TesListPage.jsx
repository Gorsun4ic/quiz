import { Helmet } from "react-helmet";

import TestList from "../../testList/TestList";

const TestListPage = () => {
	return (
		<>
			<Helmet>
				<meta name="Tests" descirption="Tests page" />
				<title>Quizcrafter | Tests</title>
			</Helmet>
			<TestList />
		</>
	);
};

export default TestListPage;
