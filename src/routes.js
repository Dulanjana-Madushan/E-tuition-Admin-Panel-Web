import Login from './Login';

import AdminNavbar from './components/AdminComponents/AdminNavbar';
import AdminHome from './pages/AdminPages/AdminHome';
import TeacherDetails from './pages/AdminPages/TeachersDetails';
import AllClasses from './pages/AdminPages/AllClasses';
import SignUp from "./Register";
import Navbar from './components/AdminComponents/AdminNavbar';
import ClassDetails from './pages/AdminPages/ClassDetails';
import TeachersDetails from './pages/AdminPages/TeachersDetails';
import { makeStyles } from '@mui/styles';
import StudentsDetails from './pages/AdminPages/StudentsDetails';
import AdminProfile from './pages/AdminPages/AdminProfile';
import Notification from './pages/AdminPages/Notification';
import OneStudent from './pages/AdminPages/OneStudent';
import OneTeacher from './pages/AdminPages/OneTeacher';

import TeacherNavbar from './components/TeacherComponents/TeacherNavbar';
import TeacherHome from './pages/TeacherPages/TeacherHome';
import Class from './pages/TeacherPages/Class';
import Lms from './pages/TeacherPages/Lms';
import Announcements from './pages/TeacherPages/Announcements';
import Payments from './pages/TeacherPages/Payments';
import StudentList from './pages/TeacherPages/StudentList';
import AddStudent from './pages/TeacherPages/AddStudent';
import Review from './pages/TeacherPages/Review';
import AddDoc from './pages/TeacherPages/AddDocs';
import Chat from './pages/TeacherPages/Chat';
import TNotification from './pages/TeacherPages/Notification';
import AddClass from './pages/TeacherPages/AddClass';
import TeacherProfile from './pages/TeacherPages/TeacherProfile';
import QuizForm from './pages/TeacherPages/QuizForm';
import QuizList from './pages/TeacherPages/QuizList';



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
            { path: 'all-classes', element: <AllClasses/> },
            { path: 'class-details/:subjectid', element: <ClassDetails/> }, 
            { path: 'all-teachers', element: <TeacherDetails/> },
            { path: 'teacher-details/:userid', element: <OneTeacher/> }, 
            { path: 'allstudents', element: <StudentsDetails/> }, 
            { path: 'student-details/:userid', element: <OneStudent/> }, 
            { path: 'notification', element: <Notification/> }, 
            { path: 'admin-profile', element: <AdminProfile/> }, 
        ]
    },
    {
        path: '/teacher',
        element: role == "teacher" ? <TeacherNavbar/> : <Login/>,
        children: [
            { path: '/teacher', element: <TeacherHome/> },
            { path: 'home', element: <TeacherHome/> },  
            { path: 'subjects/:subjectid/lms', element: <Lms/> },
            { path: 'subjects/:subjectid/announcements', element: <Announcements/> },
            { path: 'subjects/:subjectid/payments', element: <Payments/> },
            { path: 'subjects/:subjectid/studentlist', element: <StudentList/> },
            { path: 'subjects/:subjectid/addstudents', element: <AddStudent/> },
            { path: 'subjects/:subjectid/reviews', element: <Review/> },
            { path: 'subjects/:subjectid', element: <Class/> },
            { path: 'lms/:lmsid/lmsdocs', element: <AddDoc/> },
            // { path: '/subjects/:subjectid/quiz', element: <QuizList/> },
            // { path: '/subjects/:subjectid/createquiz', element: <QuizForm/> },
            // { path: '/subjects', element: <AddClass/> },  
            // { path: '/quiz/:quizid', element: <QuizForm/> },
            // { path: '/chat', element: <Chat/> },  
            // { path: '/tnotification', element: <TNotification/> },
            // { path: '/tprofile', element: <TeacherProfile/> }
        ]
    }
]

export default router;