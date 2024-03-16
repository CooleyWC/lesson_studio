import App from './components/App';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import ErrorPage from './components/ErrorPage';

const routes = [
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            // why do this not need /api in front
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/api/signup',
                element: <Signup />,
            }
        ],  
    },
]

export default routes;