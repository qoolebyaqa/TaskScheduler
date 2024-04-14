import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import TasksPage from '../pages/TasksPage';

const paths = [
  {path: '', element: <HomePage />, id: 'homepage', description: 'Home'},
  {path: '/login', element: <LoginPage />, id: 'loginpage', description: 'Sign up'},
  {path: '/own', element: <TasksPage />, id: 'taskspage', description: 'Tasks list'}
]

export default paths;