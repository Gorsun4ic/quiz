import { useState, useEffect } from "react";

const useFollowCursor = () => {
	const [mousePosition, setMousePosition] = useState({ x: null, y: null });

	useEffect(() => {
		const handleMouseMove = (event) => {
			setMousePosition({ x: event.clientX, y: event.clientY });
		};

		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return mousePosition;
};

export default useFollowCursor;