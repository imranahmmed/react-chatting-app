import { ToastContainer } from 'react-toastify';
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<Registration />}></Route>
			<Route path="/login" element={<Login />}></Route>
			<Route path="/home" element={<Home />}></Route>
		</>
	)
);
function App() {
	return (
		<>
			<ToastContainer />
			<RouterProvider router={router} />
		</>
	);
}

export default App;
