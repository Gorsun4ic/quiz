import { lazy, Suspense } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useLocation,
} from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import AnimatedCursor from "react-animated-cursor";
import { AnimatePresence } from "framer-motion";

import AppHeader from "../appHeader/AppHeader";
import ErrorMessage from "../errorMessage/ErrorMessage";
import PageTransition from "../pageTransition/PageTransition";

import "./app.scss";
import "./null.scss";

const MainPage = lazy(() => import("../pages/mainPage/MainPage"));
const TestListPage = lazy(() => import("../pages/testListPage/TesListPage"));
const SingleTestPage = lazy(() =>
	import("../pages/singleTestPage/SingleTestPage")
);
const Page404 = lazy(() => import("../pages/404/404"));

function App() {
	return (
		<Router>
			<div className="app">
				<AnimatedCursor
					innerSize={20}
					outerSize={0}
					color="255,255,255"
					innerScale={2}
					clickables={[{ target: ["h1", "a"] }]}
					innerStyle={{
						mixBlendMode: "exclusion",
					}}
				/>
				<AppHeader />
				<ErrorBoundary fallback={<ErrorMessage />}>
					<Suspense>
						<AppRoutes />
					</Suspense>
				</ErrorBoundary>
			</div>
		</Router>
	);
}

const AppRoutes = () => {
	const location = useLocation();

	return (
		<AnimatePresence mode="wait">
			<Routes location={location} key={location.key}>
				<Route
					index
					element={
						<PageTransition>
							<MainPage />
						</PageTransition>
					}
				/>
				<Route
					path="tests"
					element={
						<PageTransition>
							<TestListPage />
						</PageTransition>
					}
				/>
				<Route
					path="tests/:testId"
					element={
						<PageTransition>
							<SingleTestPage />
						</PageTransition>
					}
				/>
				<Route
					path="*"
					element={
						<PageTransition>
							<Page404 />
						</PageTransition>
					}
				/>
			</Routes>
		</AnimatePresence>
	);
};

export default App;
