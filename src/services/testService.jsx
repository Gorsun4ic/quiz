import { useHttp } from "../hooks/useHttp";

const useTestService = () => {
	const { loading, request, error, process, setProcess } = useHttp();

	const getAllTests = async () => {
		const res = await request("http://localhost:5000/tests");
		return res.map(_transformTest);
	};

	const getTestById = async (testId) => {
		const res = await request("http://localhost:5000/tests");
		return res.find((test) => testId === test.id);
	};

	const _transformTest = (test) => {
		return {
			id: test.id,
			name: test.name,
			description: test.description,
			author: test.author,
			views: test.views,
			questions: test.questions,
			timer: test.timer ? test.timer : null,
		};
	};

	return { getAllTests, getTestById, loading, error, process, setProcess };
};

export default useTestService;
