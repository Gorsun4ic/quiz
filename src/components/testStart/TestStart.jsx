import {Formik, Form, Field} from "formik";

import "./testStart.scss";

const TestStart = () => {
	return (
		<div className="test-start">
			<div className="container">
				<p>Personality quiz</p>
				<h1 className="test-start__title">Ballistic missiles types</h1>
				<p>Quiz introduction</p>
				<p className="test-start__desc">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam volutpat
					nibh sed eLorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
					volutpat nibh sed e
				</p>
				<Formik
					initialValues={{name: ""}} onSubmit={value => console.log(value)}
				>
					<Form>
						<label htmlFor="name">Enter your name</label>
						<Field name="name" id="user-name" placeholder="Right here"/>
						<button className="test-start__button" type="submit">start</button>
						<p>By Admin</p>
					</Form>
				</Formik>
			</div>
		</div>
	);
};

export default TestStart;