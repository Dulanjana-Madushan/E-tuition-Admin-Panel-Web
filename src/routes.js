import Login from './pages/AuthPages/Login';
import Register from './pages/AuthPages/Register';
import ForgetPwd from './pages/AuthPages/ForgetPwd';

import AdminNavbar from './components/AdminComponents/AdminNavbar';
import AdminHome from './pages/AdminPages/AdminHome';
import TeacherDetails from './pages/AdminPages/TeachersDetails';
import AllClasses from './pages/AdminPages/AllClasses';
// import SignUp from "./pages/AuthPages/Register";
// import Navbar from './components/AdminComponents/AdminNavbar';
import ClassDetails from './pages/AdminPages/ClassDetails';
// import TeachersDetails from './pages/AdminPages/TeachersDetails';
// import { makeStyles } from '@mui/styles';
import StudentsDetails from './pages/AdminPages/StudentsDetails';
import AdminProfile from './pages/AdminPages/AdminProfile';
import Notification from './pages/AdminPages/Notification';
import Verification from './pages/AdminPages/Verifications';
import OneStudent from './pages/AdminPages/OneStudent';
import OneTeacher from './pages/AdminPages/OneTeacher';
import AdminPayments from './pages/AdminPages/AdminPayments';
import ProfileEdit from './pages/AdminPages/ProfileEdit';
import Settings from './pages/AdminPages/Settings';
import PageNotFound from './pages/PageNotFound';

import TeacherNavbar from './components/TeacherComponents/TeacherNavbar';
import TeacherHome from './pages/TeacherPages/TeacherHome';
import AddClass from './pages/TeacherPages/AddClass';
import UpdateClass from './pages/TeacherPages/UpdateClass';
import Class from './pages/TeacherPages/Class';
import Lms from './pages/TeacherPages/Lms';
import Announcements from './pages/TeacherPages/Announcements';
import Payments from './pages/TeacherPages/Payments';
import StudentList from './pages/TeacherPages/StudentList';
import AddStudent from './pages/TeacherPages/AddStudent';
import Review from './pages/TeacherPages/Review';
import AddDoc from './pages/TeacherPages/AddDocs';
import ViewSubmissions from './pages/TeacherPages/ViewSubmissions';
import Chat from './pages/TeacherPages/Chat';
import TNotification from './pages/TeacherPages/Notification';
import TeacherSettings from './pages/TeacherPages/TeacherSettings';
import TeacherProfile from './pages/TeacherPages/TeacherProfile';
import QuizForm from './pages/TeacherPages/QuizForm';
import QuizList from './pages/TeacherPages/QuizList';

const router = (role, setToken)=>[
    {
        path: '/login',
        element: <Login setToken={setToken}/>,
    },
    {
        path: '/register',
        element: <Register/>,
    },
    {
        path: '/forgetpwd',
        element: <ForgetPwd/>,
    },
    // {
    //     path: '/admin',
    //     element: role === "admin" ? <AdminNavbar/> :  <Login/>,
    //     children: [
    //         { path: '/admin', element: <AdminHome/> },
    //         { path: 'home', element: <AdminHome/> },
    //         { path: 'all-classes', element: <AllClasses/> },
    //         { path: 'class-details/:subjectid', element: <ClassDetails/> }, 
    //         { path: 'all-teachers', element: <TeacherDetails/> },
    //         { path: 'teacher-details/:userid', element: <OneTeacher/> }, 
    //         { path: 'allstudents', element: <StudentsDetails/> }, 
    //         { path: 'student-details/:userid', element: <OneStudent/> }, 
    //         { path: 'notification', element: <Notification/> }, 
    //         { path: 'admin-profile', element: <AdminProfile/> }, 
    //     ]
    // },
    {
        path: '/admin',
        element: role == "admin" ? <AdminNavbar/> :  <Login/>,
        children: [
            { path: '/admin', element: <AdminHome/> },
            { path: 'home', element: <AdminHome/> },
            { path: 'allclasses', element: <AllClasses/> },
            { path: 'classdetails/:subjectid', element: <ClassDetails/> }, 
            { path: 'allteachers', element: <TeacherDetails/> },
            { path: 'adminteacherdetails/:userid', element: <OneTeacher/> }, 
            { path: 'allstudents', element: <StudentsDetails/> }, 
            { path: 'studentdetails/:userid', element: <OneStudent/> }, 
            { path: 'notification', element: <Notification/> }, 
            { path: 'verification', element: <Verification/> },
            { path: 'settings', element: <Settings setToken={setToken}/> }, 
            { path: 'aprofile', element: <AdminProfile/> },
            { path: 'profileedit', element: <ProfileEdit/> },
            { path: 'adminpayments/:subjectid', element: <AdminPayments/> },
        ]
    },
    {
        path: '/teacher',
        element: role === "teacher" ? <TeacherNavbar/> : <Login/>,
        children: [
            { path: '/teacher', element: <TeacherHome/> },
            { path: 'home', element: <TeacherHome/> },  
            { path: 'subjects', element: <AddClass/> },  
            { path: 'subjects/:subjectid/update', element: <UpdateClass/> },
            { path: 'subjects/:subjectid/lms', element: <Lms/> },
            { path: 'subjects/:subjectid/announcements', element: <Announcements/> },
            { path: 'subjects/:subjectid/payments', element: <Payments/> },
            { path: 'subjects/:subjectid/studentlist', element: <StudentList/> },
            { path: 'subjects/:subjectid/addstudents', element: <AddStudent/> },
            { path: 'subjects/:subjectid/reviews', element: <Review/> },
            { path: 'subjects/:subjectid/lms/:lmsid', element: <AddDoc/> },
            { path: 'subjects/:subjectid/submissions/:submissionid/all', element: <ViewSubmissions/> },
            { path: 'subjects/:subjectid', element: <Class/> },
            { path: 'subjects/:subjectid/quiz', element: <QuizList/> },
            { path: 'subjects/:subjectid/createquiz', element: <QuizForm/> },
            { path: 'quiz/:quizid', element: <QuizForm/> },
            { path: 'chat', element: <Chat/> },  
            { path: 'tnotification', element: <TNotification/> },
            { path: 'tsettings', element: <TeacherSettings/> }, 
            { path: 'tprofile', element: <TeacherProfile/> }
        ]
    },
    {
        path: '*',
        element: <PageNotFound/>,
    }
]

export default router;