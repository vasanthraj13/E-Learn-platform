import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
  useNavigate
} from "react-router-dom";

import LoginPage from "./Login";
import RegisterPage from "./Register";
import AddCoursePage from "./Admin stuffs/Course.create";
import AdmincourseDisplaypage from "./Admin stuffs/Course.display";
import CoursePay from "./User stuffs/Payment";
import UserProfile from "./User stuffs/profile";
import RootLayout from "./Admin stuffs/RootLayout";
import AdminDashboard from "./Admin stuffs/AdminDashboard";
import Userlayout from "./User stuffs/Userlayout";

import CourseDisplayPage from "../src/User stuffs/Course.display"
import MyCourses from "./User stuffs/Mycourses";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/admin" element={<RootLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="/admin/display-course" element={<AdmincourseDisplaypage  />}/>
        <Route path="/admin/create-course" element={<AddCoursePage  />}/>
    </Route>
    
    <Route path="/" element={<Userlayout />}>
        <Route index element={<CourseDisplayPage />} />
        <Route path="/display-course" element={<CourseDisplayPage  />}/>
        <Route path="/mycourses" element={<MyCourses />}/>
        <Route path="/payments/:courseId" element={< CoursePay />}/>
        <Route path="/profile" element={< UserProfile />}/>
     </Route>
    <Route path="/login/user" element={<LoginPage role={'user'}/>} />
    <Route path="/login/admin" element={<LoginPage role={'admin'}/>} />

    <Route path="/register" element={<RegisterPage/>}/>
    


  
 
    <Route path="*" element={<UnauthorizedAccess/>}/>
    </>
  )
);

function UnauthorizedAccess() {
  return (
    <div>
      <h1>Url Not Found</h1>
      <p>Kindly check the Url ..</p>
    </div>
  );
}

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;