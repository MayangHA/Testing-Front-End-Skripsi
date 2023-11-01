import logo from './logo.svg';
import './App.css';
import {
  Routes,
  Route,
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router= createBrowserRouter([
  {}
])

function App() {
  return (
    <RouterProvider router={router}> 

    </RouterProvider>
  );
}

export default App;
