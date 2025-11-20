import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Register from "./components/Register.jsx";
import OtpVerify from "./Components/Otpverify.jsx";
import LoginPage from "./Components/LoginPage.jsx";
import FarmerKYCPage from "./Components/Farmer/FarmerKYCPage.jsx";
import FarmerDashboard from "./Components/Farmer/FarmerDashboard.jsx";
import AddRawMaterial from "./Components/Farmer/Addrawmaterial.jsx";
import FarmerRawMaterialList from "./Components/Farmer/FarmerRawMaterialList.jsx";
import SingleItem from "./Components/Farmer/SIngleItem.jsx";
import ManufacturerKYCPage from "./Components/Manufcaturer/ManufacturerKYCPage.jsx";
import CreateProduct from "./Components/Manufcaturer/CreateProduct.jsx";
import Fetchallraws from "./Components/Manufcaturer/Fetchallraws.jsx";
import MarketPricePage from "./Components/MarketPricePage.jsx";
import GoogleMap from "./Components/Farmer/GoogleMap.jsx";
import HomePage from "./Components/HomePage.jsx";
import TraceProduct from "./Components/Traceproduct.jsx";
import Singlerawdetails from "./Components/Manufcaturer/Singlerawdetails.jsx";
import DashboardLayout from "./Components/Manufcaturer/ManuDashboard.jsx";

const router = createBrowserRouter(
  createRoutesFromElements
  (
  <Route path="/" element={<App />}>
    <Route path="" element={<HomePage/>}></Route>
    <Route path="register" element={<Register/>}></Route>
    <Route path="otp" element={<OtpVerify/>}></Route>
    <Route path="login" element={<LoginPage/>}></Route>
    <Route path="FarmerKYCPage" element={<FarmerKYCPage/>}></Route>
    <Route path="FarmerDashboard" element={<FarmerDashboard/>}></Route>
    <Route path="AddRawMaterial" element={<AddRawMaterial/>}></Route>
    <Route path="FarmerRawMaterialList" element={<FarmerRawMaterialList/>}></Route>
    <Route path="SingleItem/:batchCode" element={<SingleItem/>}></Route>
    <Route path="Singlerawdetails/:batchCode" element={<Singlerawdetails/>}></Route>
    <Route path="ManufacturerKYCPage" element={<ManufacturerKYCPage/>}></Route>
    <Route path="CreateProduct" element={<CreateProduct/>}></Route>
    <Route path="Fetchallraws" element={<Fetchallraws/>}></Route>
    <Route path="MarketPricePage" element={<MarketPricePage/>}></Route>
    <Route path="GoogleMap" element={<GoogleMap/>}></Route>
    <Route path="HomePage" element={<HomePage/>}></Route>
    <Route path="TraceProduct" element={<TraceProduct/>}></Route>
    <Route path="DashboardLayout" element={<DashboardLayout/>}></Route>

  </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
