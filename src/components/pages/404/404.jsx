import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

import "./404.scss";

const Page404 = () => {
	const navigate = useNavigate();

	return (
		<section className="page-404">
			<Helmet>
				<meta name="Page was not found" descirption="Page was not found" />
				<title>Quizcrafter | Page was not found</title>
			</Helmet>
			<div className="container">
				<h1>404</h1>
				<h2>
					Looks like somebody stole this page. <br /> Try looking at another page.
				</h2>
				<a
					href="#"
					onClick={() => navigate(-1)}
					className="previous-page-button"
					to="/">
					Back to previous page
				</a>
			</div>
		</section>
	);
};

export default Page404;
