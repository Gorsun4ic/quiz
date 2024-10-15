import { Helmet } from "react-helmet";

import TestList from "../../testList/TestList";

const TestListPage = () => {
	return (
		<main height="100vh" id="test-list">
			<Helmet>
				<meta name="Tests" descirption="Tests page" />
				<title>Quizcrafter | Tests</title>
			</Helmet>
			<TestList />
		</main>
	);
};

export default TestListPage;
