
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './assets/pages/RootLayout';
import paths from './assets/util/paths';
import './App.css';

function App() {
  
  

  const router = createBrowserRouter([
    {
      path: '/TaskScheduler/',
      element: <RootLayout />,
      children: paths
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
