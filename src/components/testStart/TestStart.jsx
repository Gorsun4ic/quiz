import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { motion } from "framer-motion";

import useTestService from "../../services/testService";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./testStart.scss";

/**
 * TestStart Component
 *
 * Displays the start interface of a quiz, including test details and a form 
 * for user name input. Fetches test information using the test ID from the URL.
 *
 * Props:
 * - onStart: Function to call when the quiz starts.
 * - setUserName: Function to set the user's name in the application state.
 *
 * State:
 * - testInfo: Object containing test details (name, author, views, description).
 *
 * Functions:
 * - onTestLoaded(tests): Updates the component state with the fetched test data.
 * - handleSubmit(value): Handles form submission and starts the quiz.
 * - setContent(process, Component): Renders different content based on the process state.
 *
 * Example Usage:
 * <TestStart onStart={handleStart} setUserName={setUserName} />
 */


const TestStart = ({ onStart, setUserName }) => {
	const { testId } = useParams();
	const [testInfo, setTestInfo] = useState({
		name: null,
		author: null,
		views: null,
		description: null,
	});
	const { getTestById, process, setProcess } = useTestService();

	useEffect(() => {
		getTestById(testId)
			.then(onTestLoaded)
			.then(() => {
				setProcess("confirmed");
			});
	}, [testId]);

	const onTestLoaded = (tests) => {
		setTestInfo(tests);
	};

	const nameValidation = Yup.object().shape({
		name: Yup.string()
			.min(3, "Too short!")
			.max(50, "Too long!")
			.required("Required"),
	});

	const handleSubmit = (value) => {
		setUserName(value.name);
		onStart();
	}

	const content = () => {
		return (
			<>
				<h1 className="test-start__title">{testInfo.name}</h1>
				<p>Quiz introduction</p>
				<p className="test-start__desc">{testInfo.description}</p>
				<Formik
					initialValues={{ name: "" }}
					validationSchema={nameValidation}
					onSubmit={handleSubmit}>
					{({ errors, touched }) => (
						<Form className="form">
							<div className="form__input">
								<label htmlFor="name">Enter your name</label>
								<Field name="name" id="user-name" placeholder="Right here" />
								{errors.name && touched.name ? <p>{errors.name}</p> : null}
							</div>
							<button className="test-start__button" type="submit">
								start
							</button>
							<p>By {testInfo.author}</p>
						</Form>
					)}
				</Formik>
			</>
		);
	};

	const setContent = (process, Component) => {
		switch (process) {
			case "waiting":
				return <Spinner />;
			case "loading":
				return <Spinner />;
			case "confirmed":
				return <Component />;
			case "error":
				return <ErrorMessage />;
			default:
				throw new Error("Unexpected state");
		}
	};

	return (
		<motion.section
			className="test-start"
			key="start-section"
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 20 }}
			transition={{ duration: 0.5 }}>
			<Helmet>
				<meta
				name={`${testInfo.name} page`}
				descirption={`${testInfo.name} page`}
				/>
				<title>{`Quizcrafter | ${testInfo.name} test page`}</title>
			</Helmet>
			<div className="container">{setContent(process, content)}</div>
		</motion.section>
	);
};

export default TestStart;
