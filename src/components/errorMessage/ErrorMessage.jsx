import img from "./error.gif";

const ErrorMessage = () => {
	return (
		<div className="error-message">
			<img src={img} alt="Ooops. Something gone wrong!" width="128" height="128" loading="lazy"/>
			<p>Looks like something gone wrong!</p>
		</div>
	)
} 
export default ErrorMessage;