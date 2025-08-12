import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import HomeLanding from "./components/home-page-com/HomeLanding";
import ProfilePage from "./pages/ProfilePage";
import ShortlistedVehicles from "./pages/ShortlistedVehicles";
import AddCarForm from "./components/car-page/AddCarForm";
import AllCarsPage from "./components/car-page/AllCarsPage";
import CarDetailsPage from "./components/car-page/CarDetailsPage";
import FilterCar from "./components/car-page/FilteredCar";
import Myvehicles from "./pages/profile-pages/MyVehicles";
import ProfileUpdate from "./pages/profile-pages/ProfileUpdatePage";
import MyOrders from "./components/book-car/BookAppointment";
import BookAppointment from "./components/book-car/BookAppointment";
import UserAppointments from "./pages/profile-pages/UserAppointment";
import ManageAppointments from "./pages/profile-pages/ManageAppointment";
import UpdateCarDetails from "./components/car-page/UpdateCarDetails";
import AdminPage from "./pages/admin/AdminPage";
import AdminUpdate from "./pages/admin/AdminUpdate";
import Teams from './components/static/Teams';
import Services from './components/static/Services';
import Contact from './components/static/Contact';
import Support from './components/static/Support';
import Company from './components/static/Company';
import Location from'./components/static/Location';
import About from './components/static/About';
import OurServices from './components/static/OurServices';
import ProtectedRoute from "./pages/auth/ProtectecRoute";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="home" element={<Home />}>
          <Route index element={<HomeLanding />} />
          <Route path="admin" element={
              <ProtectedRoute>
                <AdminPage />
                  </ProtectedRoute>} />
          <Route path="admin/update/:id" element={
              <ProtectedRoute>
                <AdminUpdate />
                  </ProtectedRoute>} />
          <Route path="Profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>} />
          <Route path="MyWishList" element={<ShortlistedVehicles />} />
          <Route path="AddCar" element={
            <ProtectedRoute>
              <AddCarForm />
              </ProtectedRoute>} />
          <Route path="AllCar" element={<AllCarsPage />} />
          <Route path="cars/:carId" element={
            <CarDetailsPage />} />
          <Route path="Filtercar" element={
            <FilterCar />
            } />
          <Route path="MyVehicles" element={<Myvehicles />} />
          <Route path="ProfileUpdate" element={
            <ProtectedRoute>
            <ProfileUpdate />
            </ProtectedRoute>} />
          <Route path="booking" element={
            <ProtectedRoute>
            <MyOrders />
            </ProtectedRoute>} />
          <Route path="book/:carId" element={
            <ProtectedRoute>
              <BookAppointment />
              </ProtectedRoute>} />
          <Route path="myorder" element={
            <ProtectedRoute>
            <UserAppointments />
            </ProtectedRoute>} />
          <Route path="manage" element={
             <ProtectedRoute>
              <ManageAppointments />
             </ProtectedRoute>} />
          <Route path="updatecar/:carId" element={  
            <ProtectedRoute>
              <UpdateCarDetails />
                </ProtectedRoute>} />
          <Route path="teams" element={<Teams />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          <Route path="support" element={<Support />} />
          <Route path="company" element={<Company />} />
          <Route path="location" element={<Location />} />
          <Route path="about" element={<About />} />
          <Route path="our-services" element={<OurServices />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
