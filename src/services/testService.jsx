import { useHttp } from "../hooks/useHttp";

/**
 * useTestService Hook
 *
 * A custom React hook that provides functionalities to interact with test-related data.
 * This hook leverages the useHttp hook to handle HTTP requests.
 *
 * Provides the following methods:
 * 
 * - getAllTests: Fetches all tests from the server and transforms the data.
 * - getTestById: Fetches a specific test by its ID from the server.
 * 
 * Returns:
 * - {Function} getAllTests - A function that fetches all tests and returns them as an array.
 * - {Function} getTestById - A function that takes a test ID and returns the corresponding test.
 * - {boolean} loading - A boolean indicating if the request is currently loading.
 * - {any} error - The error object if the request fails.
 * - {string} process - The current state of the request (e.g., "waiting", "loading", "error").
 * - {Function} setProcess - A function to manually set the request state.
 *
 * Usage Example:
 * const { getAllTests, getTestById, loading, error } = useTestService();
 *
 * useEffect(() => {
 *   const fetchTests = async () => {
 *     const tests = await getAllTests();
 *     console.log(tests);
 *   };
 *   fetchTests();
 * }, [getAllTests]);
 *
 * Notes:
 * - The hook is designed to handle communication with a test API, specifically expecting
 *   a server running at "http://localhost:5000".
 * - The `_transformTest` function is used internally to shape the raw test data into a
 *   more usable format.
 */


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
			timer: test.timer,
		};
	};

	return { getAllTests, getTestById, loading, error, process, setProcess };
};

export default useTestService;
