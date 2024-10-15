import { useState, useEffect } from "react";
/**
 * useWindowResize Hook
 *
 * A custom React hook that tracks the current width of the browser window.
 * It updates the width value whenever the window is resized.
 *
 * Returns:
 * - {number} windowWidth - The current width of the browser window.
 *
 * Usage:
 * const windowWidth = useWindowResize();
 *
 * Example:
 * const MyComponent = () => {
 *   const width = useWindowResize();
 *
 *   return (
 *     <div>
 *       <p>Current window width: {width}px</p>
 *     </div>
 *   );
 * };
 *
 * Notes:
 * - The hook sets up an event listener for the window's resize event and
 *   cleans it up when the component using the hook unmounts to prevent memory leaks.
 */

const useWindowResize = () => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	// Function to handle window resize and update the state
	const handleResize = () => {
		setWindowWidth(window.innerWidth);
	};

	useEffect(() => {
		// Add event listener on component mount
		window.addEventListener("resize", handleResize);

		// Cleanup event listener on component unmount
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return windowWidth;
};

export default useWindowResize;
