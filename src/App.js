import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import UploadPage from "./components/UploadPage";
import ListingPage from "./components/ListingPage";
import VideosPage from "./components/VideosPage";
import RootLayout from "./components/RootLayout";

const router = createBrowserRouter([
  {
    index: "",
    element: <RootLayout />,
    children: [
      { path: "/", element: <UploadPage></UploadPage> },
      { path: "/listing", element: <ListingPage /> },
      { path: "/item/:id", element: <VideosPage /> },
    ],
  },
]);
function App() {
  return (
    <RouterProvider router={router}>
      <h1>My app</h1>
    </RouterProvider>
  );
}

export default App;
