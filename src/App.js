import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "./Login";
// import SignUp from "./Register";
import Navbar from './components/Navbar';
import AnalyzeCards from './components/AnalyzeCards';
import AllClasses from './pages/AllClasses';
import TeachersDetails from './pages/TeachersDetails';
import Notification from './pages/Notification';
import { makeStyles } from '@mui/styles';
import AdminHome from './pages/AdminHome';
import StudentsDetails from './pages/StudentsDetails';
// import PayTable from './PayTable';
import useToken from './useToken';
import { useState } from 'react'; 
// import ClassCard from './TeacherClassList';


const useStyles = makeStyles({
  container:{
    display: "flex"
  }
});

function App() {

   const classes =useStyles();


  // const [ token, setToken ] = useState(null);
  // setToken(localStorage.getItem('token'));

  // if(!token) {
  // window.navigate("/login");
  //   return <Login/>
  // }

 
  return (
    <div className={classes.container}>
    <Router>
      <Navbar />
          <Switch>
            {/*<Route path='/login' component={Login}/>*/}
            <Route path='/' exact component={AdminHome} />
            <Route path='/allclasses' component={AllClasses} />
            <Route path='/teachersDetails' component={TeachersDetails} />
            <Route path='/studentsDetails' component={StudentsDetails} />
            <Route path='/notification' component={Notification} />
            
            
            {/*<Route path='/table'>
              <PayTable/>
            </Route> */}
          </Switch>
    </Router>
    </div>
  );
}

export default App;
