import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { motion } from "framer-motion";

import useTestService from "../../services/testService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./testList.scss";
import searchIcon from "../../resources/img/search.svg";
import userIcon from "../../resources/img/user-profile.svg";
import view from "../../resources/img/eye-open.svg";

/**
 * TestList component that fetches and displays a list of tests.
 * Users can search for tests by name.
 */
const TestList = () => {
	const [testList, setTestList] = useState([]); // Array of test objects
	const [term, setTerm] = useState(""); // Search term for filtering tests
	const { getAllTests, process, setProcess } = useTestService(); // Custom hook for test service

	// Fetch tests when the component mounts
	useEffect(() => {
		getAllTests()
			.then(onTestLoaded) // Set the test list on successful fetch
			.then(() => setProcess("confirmed")); // Set the process state to confirmed
	}, []);

	/**
	 * Handles the successful loading of tests.
	 *
	 * @param {Array} tests - Array of test objects fetched from the API.
	 */
	const onTestLoaded = (tests) => {
		setTestList(tests); // Update state with the fetched tests
	};

	/**
	 * Transforms the view count into a human-readable format.
	 *
	 * @param {number} view - The number of views.
	 * @returns {string} - Transformed views (e.g., "1k" for 1000).
	 */
	const transformViews = (view) => {
		return view.toString().length > 3
			? `${view.toString().slice(0, -3)}k` // Return shortened view count
			: view;
	};

	/**
	 * Searches the test list for matches with the given string.
	 *
	 * @param {string} string - The search term.
	 * @returns {Array} - Filtered array of test objects.
	 */
	const searchTest = (string) => {
		if (!string || string.length === 0) return testList; // Return all tests if search term is empty

		return testList.filter((item) => {
			return item.name.toLowerCase().indexOf(string.toLowerCase()) > -1; // Filter tests by name
		});
	};

	/**
	 * Renders a list of test items.
	 *
	 * @param {Array} arr - Array of test objects to render.
	 * @returns {Array} - Array of JSX elements representing test items.
	 */
	const renderItems = (arr) => {
		return arr.map((item) => (
			<li className="tests__item" key={item.id}>
				<Link to={`/tests/${item.id}`}>
					<h3 className="tests__name">{item.name}</h3>
					<ul className="tests__meta-list">
						<li className="tests__meta-item">
							<img
								src={userIcon}
								alt={`Author - ${item.author}`}
								width="20"
								height="20"
							/>
							<span>Author - {item.author}</span>
						</li>
						<li className="tests__meta-item">
							<img src={view} alt="Views" width="20" height="20" />
							<span>{transformViews(item.views)}</span>
						</li>
					</ul>
					<p className="tests__desc">{item.description}</p>
				</Link>
			</li>
		));
	};

	/**
	 * Sets the content to be displayed based on the current process state.
	 *
	 * @param {string} process - The current process state.
	 * @param {function} Component - The component to render if process is confirmed.
	 * @returns {JSX.Element} - The appropriate component to render.
	 */
	const setContent = (process, Component) => {
		switch (process) {
			case "waiting":
			case "loading":
				return <Spinner />; // Show spinner for waiting/loading states
			case "confirmed":
				return <Component />; // Show the list of items if confirmed
			case "error":
				return <ErrorMessage />; // Show error message on failure
			default:
				throw new Error("Unexpected state"); // Handle unexpected process states
		}
	};

	// Get the filtered items based on the search term
	const items = () => renderItems(searchTest(term));

	return (
		<motion.section
			className="tests"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}>
			<div className="container">
				<h2 className="tests__title">choose your test</h2>
				<Formik initialValues={{ testName: "" }}>
					<Form>
						<img src={searchIcon} alt="Search icon" width="24" height="24" />
						<Field
							id="search-test"
							name="search-test"
							placeholder="Ballistic missiles types"
							onChange={(e) => {
								setTerm(e.target.value); // Update search term on change
							}}
						/>
					</Form>
				</Formik>
				<ul className="tests__list">{setContent(process, items)}</ul>
			</div>
		</motion.section>
	);
};

export default TestList;
