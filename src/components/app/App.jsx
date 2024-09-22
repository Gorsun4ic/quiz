import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AnimatedCursor from "react-animated-cursor";

import AppHeader from "../appHeader/AppHeader";

import "./app.scss";
import "./null.scss";

const MainPage = lazy(() => import("../pages/MainPage"));
const TestListPage = lazy(() => import("../pages/TestListPage"));

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
				<Suspense>
					<Routes>
						<Route index element={<MainPage />} />
						<Route path="tests" element={<TestListPage />} />
					</Routes>
				</Suspense>
			</div>
		</Router>
	);
}

export default App;
