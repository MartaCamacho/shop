import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/root';
import Product from './routes/product';
import HeaderComponent from './components/HeaderComponent';

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
      <HeaderComponent />
      <main>
        <RouterProvider router={router} />
      </main>
    </div>
  );
}

export default App;
