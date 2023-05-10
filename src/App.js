import logo from './logo.svg';
import './App.css';
import Topnav from './Components/Navbar Component/Topnav';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import {
  lazy,
  Suspense
} from 'react'
import FallbackUI from './Components/FallbackUI';
import PageNotFound from './Components/PageNotFound';

const Task1 = lazy(()=>import("./Components/Task1"))
const Task2 = lazy(()=>import("./Components/Task2"))
const Task3 = lazy(()=>import("./Components/Task3"))
const Task4 = lazy(()=>import("./Components/Task4"))
const Task5 = lazy(()=>import("./Components/Task5"))
const Task6 = lazy(()=>import("./Components/Task6"))
const Task7 = lazy(()=>import("./Components/Task7"))
const Task8 = lazy(()=>import("./Components/Task8"))
const Viewdetail = lazy(()=>import("./Components/Viewdetail"))
const Cart = lazy(()=>import("./Components/Cart"))
const ViewProduct = lazy(()=>import("./Components/ViewProduct"))

function App() {
  return (
      <BrowserRouter>
        <Suspense fallback={<FallbackUI />}>
          <Topnav />
          <Routes>
            <Route path='/' element={<Task1 />} />
            <Route path="/task1" element={<Task1 />} />
            <Route path="/task2" element={<Task2 />} />
            <Route path="/task3" element={<Task3 />} />
            <Route path="/task4" element={<Task4 />} />
            <Route path="/task5" element={<Task5 />} />
            <Route path="/task6" element={<Task6 />} />
            <Route path="/task7" element={<Task7 />} />
            <Route path="/task8" element={<Task8 />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/viewdetailuser" element={<Viewdetail />} />
            <Route path="/product/:id" element={<ViewProduct />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
  );
}

export default App;
