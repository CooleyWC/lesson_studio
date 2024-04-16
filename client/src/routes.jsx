import App from './components/App';
import Home from './components/pages/Home';
import Login from './components/forms/Login';
import Signup from './components/forms/Signup';
import ErrorPage from './components/pages/ErrorPage';
import Faculty from './components/pages/Faculty';
import Dashboard from './components/pages/Dashboard';
import Instructor from './components/pages/Instructor';

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
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/signup',
                element: <Signup />,
            },
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
            {
                path: 'instructor',
                element: <Instructor />,
            },
        ],  
    },
]

export default routes;