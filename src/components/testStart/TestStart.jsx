import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import useTestService from "../../services/testService";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./testStart.scss";

const TestStart = ({ onStart }) => {
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

	const content = () => {
		return (
			<>
				<p>Personality quiz</p>
				<h1 className="test-start__title">{testInfo.name}</h1>
				<p>Quiz introduction</p>
				<p className="test-start__desc">{testInfo.description}</p>
				<Formik
					initialValues={{ name: "" }}
					validationSchema={nameValidation}
					onSubmit={onStart}>
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
		<section
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
		</section>
	);
};

export default TestStart;
