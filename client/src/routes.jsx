import App from './components/App';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import ErrorPage from './components/ErrorPage';
import Faculty from './components/Faculty';

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
            {
                path: '/faculty',
                element: <Faculty />,
            },
            // why do this not need /api in front
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/signup',
                element: <Signup />,
            }
        ],  
    },
]

export default routes;