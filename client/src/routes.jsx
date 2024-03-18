import App from './components/App';
import Home from './components/pages/Home';
import Login from './components/forms/Login';
import Signup from './components/forms/Signup';
import ErrorPage from './components/pages/ErrorPage';
import Faculty from './components/pages/Faculty';

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