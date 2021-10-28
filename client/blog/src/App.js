import './App.css';
import { useLocation } from 'react-router-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import NotFound from './pages/Notfound';
import AdminPage from './pages/SecretAdminPage';

function App() {
  return <>
    <Router>
      <Switch>
        <Route path="/" exact render={(props) => <Login />} />
        <Route path="/register" exact render={(props) => <Register />} />
        <Route path="/mainpage" exact render={(props) => <MainPage />} />
        <Route path="/createpost" exact render={(props) => <CreatePost />} />
        <Route path="/adminPage" exact render={(props) => <AdminPage/>} />
        <Route path="/post/:postId" exact render={(props) => <Post />} />
        <Route path='*' exact={true} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </>
}

export default App;
