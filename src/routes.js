import AdminNavbar from './components/AdminComponents/AdminNavbar';
import TeacherNavbar from './components/TeacherComponents/TeacherNavbar';
import TeacherDetails from './pages/AdminPages/TeachersDetails';
import Login from './Login';
import AdminHome from './pages/AdminPages/AdminHome';
import AllClasses from './pages/AdminPages/AllClasses';
import SignUp from "./Register";
import Navbar from './components/AdminComponents/AdminNavbar';
import ClassDetails from './pages/AdminPages/ClassDetails';
import TeachersDetails from './pages/AdminPages/TeachersDetails';
import { makeStyles } from '@mui/styles';
import StudentsDetails from './pages/AdminPages/StudentsDetails';
import Notification from './pages/AdminPages/Notification';

import AdminProfile from './pages/AdminPages/AdminProfile';
import OneStudent from './pages/AdminPages/OneStudent';
import OneTeacher from './pages/AdminPages/OneTeacher';
import TeacherHome from './pages/TeacherPages/TeacherHome';
import Chat from './pages/TeacherPages/Chat';
import TNotification from './pages/TeacherPages/Notification';
import AddClass from './pages/TeacherPages/AddClass';
import TeacherProfile from './pages/TeacherPages/TeacherProfile';
import MaterialGrid from './pages/TeacherPages/ClassMaterials';
import QuizForm from './pages/TeacherPages/QuizForm';
import QuizList from './pages/TeacherPages/QuizList';
import Lms from './pages/TeacherPages/Lms';
import Review from './pages/TeacherPages/Review';
import Announcements from './pages/TeacherPages/Announcements';
import Payments from './pages/TeacherPages/Payments';
import StudentList from './pages/TeacherPages/StudentList';
import AddStudent from './pages/TeacherPages/AddStudent';



const router = (role, setToken)=>[
    {
        path: '/login',
        element: <Login setToken={setToken}/>,
    },
    {
        path: '/admin',
        element: role == "admin" ? <AdminNavbar/> :  <Login/>,
        children: [
            { path: '/admin', element: <AdminHome/> },
            { path: 'home', element: <AdminHome/> },
            { path: 'allclasses', element: <AllClasses/> },
            { path: 'classdetails/:subjectid', element: <ClassDetails/> }, 
            { path: 'allteachers', element: <TeacherDetails/> },
            { path: 'teacherdetails/:userid', element: <OneTeacher/> }, 
            { path: 'allstudents', element: <StudentsDetails/> }, 
            { path: 'studentdetails/:userid', element: <OneStudent/> }, 
            { path: 'notification', element: <Notification/> }, 
            { path: 'profile', element: <AdminProfile/> }, 
        ]
    },
    {
        path: '/teacher',
        element: role == "teacher" ? <TeacherNavbar/> : <Login/>,
        children: [
            { path: '/teacher', element: <TeacherHome/> },
            { path: 'home', element: <TeacherHome/> },  
            // { path: '/subjects/:subjectid/quiz', element: <QuizList/> },
            // { path: '/subjects/:subjectid/createquiz', element: <QuizForm/> },
            { path: 'subjects/:subjectid/lms', element: <Lms/> },
            // { path: '/subjects/:subjectid/announcements', element: <Announcements/> },
            // { path: '/subjects/:subjectid/payments', element: <Payments/> },
            // { path: '/subjects/:subjectid/studentlist', element: <StudentList/> },
            // { path: '/subjects/:subjectid/addstudent', element: <AddStudent/> },
            // { path: '/subjects/:subjectid/reviews', element: <Review/> },
            { path: 'subjects/:subjectid', element: <MaterialGrid/> },
            // { path: '/subjects', element: <AddClass/> },  
            // { path: '/quiz/:quizid', element: <QuizForm/> },
            // { path: '/chat', element: <Chat/> },  
            // { path: '/tnotification', element: <TNotification/> },
            // { path: '/tprofile', element: <TeacherProfile/> }
        ]
    }
]

export default router;