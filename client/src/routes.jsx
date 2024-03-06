import App from './components/App';
import Login from './components/Login';

const routes = [
    {
        path: '/',
        element: <App />
    },
    {
        path: '/login',
        element: <Login/>,
    },
]

export default routes;