import { useState, useCallback } from "react";

/**
 * useHttp Hook
 *
 * A custom React hook for making HTTP requests with error handling and loading states.
 *
 * Returns:
 * - request: A function to perform the HTTP request.
 * - clearError: A function to reset the loading state.
 * - process: A string representing the current process state ("waiting", "loading", or "error").
 * - setProcess: A function to manually set the process state.
 *
 * request Parameters:
 * - url (string): The URL to make the request to.
 * - method (string): The HTTP method to use (default is "GET").
 * - body (any): The request body (default is null).
 * - headers (object): The headers for the request (default includes "Content-type": "application/json").
 *
 * Usage Example:
 * const { request, process } = useHttp();
 * 
 * const fetchData = async () => {
 *   try {
 *     const data = await request('https://api.example.com/data');
 *     console.log(data);
 *   } catch (error) {
 *     console.error(error);
 *   }
 * };
 *
 * Note:
 * The hook handles loading and error states, making it easier to manage API calls in components.
 */


export const useHttp = () => {
	const [process, setProcess] = useState("waiting");

	const request = useCallback(
		async (
			url,
			method = "GET",
			body = null,
			headers = { "Content-type": "application/json" }
		) => {
			setProcess("loading");

			try {
				const response = await fetch(url, { method, body, headers });

				if (!response.ok) {
					throw new Error(`Could not fetch ${url}, status: ${response.status}`);
				}
				const data = await response.json();
				return data;
			} catch (e) {
				setProcess("error");
				throw e;
			}
		},
		[]
	);

	const clearError = useCallback(() => {
		setProcess("loading");
	}, []);

	return {
		request, clearError, process, setProcess
	}
};
