import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";

import useTestService from "../../services/testService";

import "./testList.scss";
import searchIcon from "../../resources/img/search.svg";
import userIcon from "../../resources/img/user-profile.svg";
import view from "../../resources/img/eye-open.svg";

const TestList = () => {
	const [testList, setTestList] = useState([]);
	const [term, setTerm] = useState("");
	const { getAllTests } = useTestService();

	useEffect(() => {
		getAllTests()
			.then((tests) => {
				setTestList(tests); // Set fetched tests directly
				console.log(tests); // Log fetched tests
			})
			.catch((error) => {
				console.error("Failed to fetch tests:", error); // Handle errors
			});
	}, []);

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
		return arr.map(
			(
				item,
				index // Use parentheses to return the JSX
			) => (
				<li className="tests__item" key={index}>
					<a href="#">
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
					</a>
				</li>
			)
		); // Ensure to use parentheses to implicitly return
	};

	const items = renderItems(searchTest(term));

	return (
		<section className="tests">
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
				<ul className="tests__list">{items}</ul>
			</div>
		</section>
	);
};

export default TestList;
