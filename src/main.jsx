import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from './Components/Home/Home';
import PlayerDetails from './Layout/PlayerDetails/PlayerDetails';

import About from './Layout/About/About';
import Gallery from './Layout/Gallery/Gallery';
import Players from './Layout/Players/Players';
import ErrorPage from './Layout/Error/ErrorPage';








const router = createBrowserRouter([
  
  {
    path: "/",
    Component: App,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
        

      },
      {
        path: "players",
        Component: Players,
        loader: () => fetch("Players.json")
      },

      {
        path: "playerDetails/:id",
        Component: PlayerDetails,
        loader: () => fetch("Players.json")
        

      },
      

      {
        path: "about",
        Component: About,
      },
      {
        path: "gallery",
        Component: Gallery,
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>,
)
