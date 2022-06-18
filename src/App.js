import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "./Login";
import SignUp from "./Register";
import Navbar from './components/AdminComponents/Navbar';
import AnalyzeCards from './components/AdminComponents/AnalyzeCards';
import AllClasses from './pages/AdminPages/AllClasses';
import TeachersDetails from './pages/AdminPages/TeachersDetails';
import Notification from './pages/AdminPages/Notification';
import { makeStyles } from '@mui/styles';
import AdminHome from './pages/AdminPages/AdminHome';
import StudentsDetails from './pages/AdminPages/StudentsDetails';
// import PayTable from './PayTable';
import useToken from './useToken';
import { useState } from 'react'; 
import AdminProfile from './pages/AdminPages/AdminProfile';
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
      <Switch>
     
        <Route path='/login' component={Login}/>
        <Route path='/register' component={SignUp}/>
     
      <>  
        <Navbar />

            <Route path='/' exact component={AdminHome} />
            <Route path='/profile' component={AdminProfile} />
            <Route path='/allclasses' component={AllClasses} />
            <Route path='/teachersDetails' component={TeachersDetails} />
            <Route path='/studentsDetails' component={StudentsDetails} />
            <Route path='/notification' component={Notification} />
            
            </>  
      
            {/*<Route path='/table'>
              <PayTable/>
            </Route> */}
          </Switch>
    </Router>
    </div>
  );
}

export default App;
