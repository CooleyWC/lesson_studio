import App from './components/App';
import Login from './components/Login';
import ErrorPage from './components/ErrorPage';

const routes = [
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/login',
        element: <Login/>,
    },
]

export default routes;