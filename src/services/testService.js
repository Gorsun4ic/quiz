const useTestService = () => {
	const getResource = async (url) => {
		let res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	};

	const getAllTests = async () => {
		const res = await getResource("http://localhost:5000/tests");
		 return res.map(_transformTest); 
	};

	const _transformTest = (test) => {
		return {
			id: test.id,
			name: test.name,
			description: test.description,
			author: test.author,
			views: test.views,
			questions: test.questions,
		};
	};

	return { getAllTests };
};

export default useTestService;
