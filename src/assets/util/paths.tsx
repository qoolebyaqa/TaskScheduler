import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import TasksPage from '../pages/TasksPage';

const paths = [
  {path: '/TaskScheduler/', element: <HomePage />, id: 'homepage', description: 'Home'},
  {path: '/TaskScheduler/login', element: <LoginPage />, id: 'loginpage', description: 'Sign up'},
  {path: '/TaskScheduler/own', element: <TasksPage />, id: 'taskspage', description: 'Tasks list'}
]

export default paths;