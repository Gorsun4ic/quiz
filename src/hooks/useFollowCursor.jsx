import { useState, useEffect } from "react";

/**
 * useFollowCursor Hook
 *
 * A custom React hook that tracks the mouse cursor's position on the screen.
 *
 * Returns:
 * - mousePosition: An object containing the current mouse coordinates (x and y).
 *
 * Usage:
 * const mousePosition = useFollowCursor();
 * console.log(mousePosition); // { x: <current_x_position>, y: <current_y_position> }
 *
 * Note:
 * The hook sets up an event listener for mouse movement on component mount and 
 * cleans up the listener on component unmount.
 */


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