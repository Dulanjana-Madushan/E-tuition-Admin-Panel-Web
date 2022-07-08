import React, { useState } from 'react'; 
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "./Login";
import SignUp from "./Register";
import Navbar from './components/AdminComponents/Navbar';
import AnalyzeCards from './components/AdminComponents/AnalyzeCards';
import AllClasses from './pages/AdminPages/AllClasses';
import TeachersDetails from './pages/AdminPages/TeachersDetails';
import { makeStyles } from '@mui/styles';
import AdminHome from './pages/AdminPages/AdminHome';
import StudentsDetails from './pages/AdminPages/StudentsDetails';
import Notification from './pages/AdminPages/Notification';
// import PayTable from './PayTable';
// import ClassCard from './TeacherClassList';
import useToken from './useToken';
import AdminProfile from './pages/AdminPages/AdminProfile';
import TeacherNavbar from './components/TeacherComponents/TeacherNavbar';
import TeacherHome from './pages/TeacherPages/TeacherHome';
import Chat from './pages/TeacherPages/Chat';
import TNotification from './pages/TeacherPages/Notification';
import AddClass from './pages/TeacherPages/AddClass';
import TeacherProfile from './pages/TeacherPages/TeacherProfile';
import MaterialGrid from './components/TeacherComponents/ClassMaterials';

const useStyles = makeStyles({
  container:{
    display: "flex"
  }
});


function App() {

  const classes =useStyles();
  const { token, setToken } = useToken();


  if(!token) {
    return <Login setToken={setToken} />
  }


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
        {/* <Route path='/register' component={SignUp}/> */}
     
      <>  
        <Navbar />
            <Route path='/adminDashboard' exact component={AdminHome} />
            <Route path='/aprofile' component={AdminProfile} />
            <Route path='/allclasses' component={AllClasses} />
            <Route path='/teachersDetails' component={TeachersDetails} />
            <Route path='/studentsDetails' component={StudentsDetails} />
            <Route path='/tnotification' component={TNotification} />       
      </> 

      {/* <>
        <TeacherNavbar/>
            <Route path='/teacherHome' component={TeacherHome} />  
            <Route path='/chat' component={Chat} />  
            <Route path='/tnotification' component={TNotification} />
            <Route path='/teacherHome/addClass' component={AddClass} />  
            <Route path='/tprofile' component={TeacherProfile} />
            <Route path='/teacherHome/sinhala' component={MaterialGrid} />

      </>  */}


      
            {/*<Route path='/table'>
              <PayTable/>
            </Route> */}
          </Switch>
    </Router>
    </div>
  );
}

export default App;
