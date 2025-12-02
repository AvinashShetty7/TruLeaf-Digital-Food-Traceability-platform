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
import Register from "./Components/Register.jsx";
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
import HomePage from "./Components/HomePage.jsx";
import TraceProduct from "./Components/Traceproduct.jsx";
import Singlerawdetails from "./Components/Manufcaturer/Singlerawdetails.jsx";
import DashboardLayout from "./Components/Manufcaturer/ManuDashboard.jsx";
import MyProducts from "./Components/Manufcaturer/MyProduct.jsx";
import AdminDashboardLayout from "./Components/Admin/Admindashboard.jsx";
import VerifyFarmers from "./Components/Admin/verifyfarmers.jsx";
import VerifyManufacturers from "./Components/Admin/verifymanufactueres.jsx";
import AdminStats from "./Components/Admin/AdminStats.jsx";
import RawMaterialList from "./Components/Admin/RawMaterialList.jsx";
import Productlist from "./Components/Admin/Productlist.jsx";
import Farmers from "./Components/Admin/Farmer.jsx";
import Manufacturer from "./Components/Admin/Manufacturer.jsx";
import Myreservedraws from "./Components/Manufcaturer/Myreservedraws.jsx";
import Myconsumedraws from "./Components/Manufcaturer/Myconsumedraws.jsx";
import Mybuyedraws from "./Components/Manufcaturer/buyedraws.jsx";

const router = createBrowserRouter(
  createRoutesFromElements
  (
  <Route path="/" element={<App />}>
    <Route path="" element={<HomePage/>}></Route>
    <Route path="HomePage" element={<HomePage/>}></Route>
    <Route path="register" element={<Register/>}></Route>
    <Route path="otp" element={<OtpVerify/>}></Route>
    <Route path="login" element={<LoginPage/>}></Route>
    <Route path="traceproduct/:id" element={<TraceProduct/>}></Route>
    <Route path="FarmerKYCPage" element={<FarmerKYCPage/>}></Route>
    <Route path="ManufacturerKYCPage" element={<ManufacturerKYCPage/>}></Route>

    <Route path="farmer" element={<FarmerDashboard/>}>
        <Route path="" element={<MarketPricePage/>}></Route>
        <Route path="marketprice" element={<MarketPricePage/>}></Route>
        <Route path="AddRawMaterial" element={<AddRawMaterial/>}></Route>
        <Route path="FarmerRawMaterialList" element={<FarmerRawMaterialList/>}></Route>
        <Route path="SingleItem/:batchCode" element={<SingleItem/>}></Route>
    </Route>

    <Route path="manu" element={<DashboardLayout/>}>
        <Route path="" element={<MarketPricePage/>}></Route>
        <Route path="marketprice" element={<MarketPricePage/>}></Route>
        <Route path="Singlerawdetails/:batchCode" element={<Singlerawdetails/>}></Route>
        <Route path="CreateProduct" element={<CreateProduct/>}></Route>
        <Route path="Fetchallraws" element={<Fetchallraws/>}></Route>
        <Route path="MyProducts" element={<MyProducts/>}></Route>
        <Route path="Myreservedraws" element={<Myreservedraws/>}></Route>
        <Route path="Myconsumedraws" element={<Myconsumedraws/>}></Route>
        <Route path="Mybuyedraws" element={<Mybuyedraws/>}></Route>

    </Route>

    <Route path="Admin" element={<AdminDashboardLayout/>}>
        <Route path="" element={<AdminStats/>}></Route>
        <Route path="marketprice" element={<MarketPricePage/>}></Route>
        <Route path="VerifyFarmers" element={<VerifyFarmers/>}></Route>
        <Route path="VerifyManufacturers" element={<VerifyManufacturers/>}></Route>
        <Route path="stats" element={<AdminStats/>}></Route>
        <Route path="rawmaterials" element={<RawMaterialList/>}></Route>
        <Route path="products" element={<Productlist/>}></Route>
        <Route path="farmers" element={<Farmers/>}></Route>
        <Route path="manufacturers" element={<Manufacturer/>}></Route>
    </Route>

  </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
