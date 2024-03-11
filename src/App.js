import './App.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Home from './components/home/Home';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Aboutus from './components/aboutus/Aboutus';
import UserProfile from './components/user-profile/UserProfile'
import Products from './components/products/Products';
import Cart from './components/cart/Cart';



function App() {
  //create object of Browser Router 
  const routerObj = createBrowserRouter([
    //routing details
    {
      path:'/',
      element:<RootLayout/>,
      children:[
        //route for home
        {
          path:'/',
          element:<Home/>
        },//route for register
        {
          path:'/signup',
          element:<Register/>
        },//route for login
        {
          path:'/signin',
          element:<Login/>
        },//route for aboutus
        {
          path:'/aboutus',
          element:<Aboutus/>
        },//user-profile
        {
          path:'/user-profile',
          element:<UserProfile/>,
          children:[
            //route for products
            {
              path:'products',
              element:<Products/>
            },//route for cart
            {
              path:'cart',
              element:<Cart/>
            }
          ]
        }
      ]
    }
  ])
  
  return (
    <div>
      {/* provide Browser Router */}
      <RouterProvider router={routerObj}/>
    </div>
  );
}

export default App;
