import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/root';
import Product from './routes/product';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "product/:productId",
    element: <Product />,
  },
]);

function App() {
  return (
    <div className="App">
    holi
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
