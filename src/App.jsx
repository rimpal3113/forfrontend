import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import LoginPage from "./components/LoginPage"

import AddMember from "./pages/admin/Addmember"
import Bills from "./pages/admin/Bills"
import DietPlans from "./pages/admin/DietPlans"
import FeePackages from "./pages/admin/FeePackages"
import Members from "./pages/admin/Members"
import Notifications from "./pages/admin/Notifications"
import Reports from "./pages/admin/Reports"
import Search from "./pages/admin/Search"
import Supplements from "./pages/admin/Supplements"

import Dashboard from "./pages/members/Dashboard"
import AdminDashboard from "./pages/admin/DashBoard"
import UserDashboard from "./pages/users/Dashboard"
import SearchRecords from "./pages/users/SearchRecords"

import MyBills from "./pages/members/MyBills"

import MemberNotifications from "./pages/members/Notifications"
import UserProfile from "./pages/users/UserProfile"





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
       <Route path="/admin/dashboard" element={<AdminDashboard/>} />

        <Route path="/member/dashboard" element={<Dashboard/>} />
       
         <Route path="/user/dashboard" element={<UserDashboard/>} />

       

        <Route path="/addmember" element={<AddMember/>} />
        <Route path="/bills" element={<Bills />} />
        <Route path="/dietplans" element={<DietPlans />} />
         <Route path="/feepackages" element={<FeePackages />} />
         <Route path="/members" element={<Members />} />
          <Route path="/notifications" element={<Notifications />} />
            <Route path="/reports" element={<Reports />} />
             <Route path="/search" element={<Search />} />
               <Route path="/supplements" element={<Supplements />} />
             
                <Route path="/user/searchrecords" element={<SearchRecords />} />
              
              <Route path="/member/mybills" element={<MyBills/>} />
               <Route path="/member/notifications" element={<MemberNotifications/>} />
             <Route path="/user/profile" element={<UserProfile />} />

      </Routes>
    </Router>
  )
}

export default App
