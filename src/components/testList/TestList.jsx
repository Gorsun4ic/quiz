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

const TestList = () => {
	const [testList, setTestList] = useState([]);
	const [term, setTerm] = useState("");
	const { getAllTests, process, setProcess } = useTestService();

	useEffect(() => {
		getAllTests()
			.then(onTestLoaded)
			.then(() => setProcess("confirmed"));
	}, []);

	const onTestLoaded = (tests) => {
		setTestList(tests);
	};

	const transformViews = (view) => {
		return view.toString().length > 3
			? `${view.toString().slice(0, -3)}k`
			: view;
	};

	const searchTest = (string) => {
		if (!string || string.length === 0) return testList;

		return testList.filter((item) => {
			return item.name.toLowerCase().indexOf(string.toLowerCase()) > -1;
		});
	};

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
								setTerm(e.target.value);
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
