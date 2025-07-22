import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import HomeComp from "../pages/Home/Home";
import { selectToken } from "../app/features/auth/authSlice";
import LoginPage from "../pages/Login/Login";
import AllListingPage from "../pages/AllListing/AllListing";
import HomeCards from "../pages/HomeCards/HomeCards";
import AddListingCategories from "../pages/AddListingCategories/AddListingCategories";
import AddNewListing from "../pages/AddNewListing/AddNewListing";
import CsvFile from "../pages/CsvFile/UploadCsvFile"
import CategoryList from "../pages/CategoryList";
import { DESERT_SAFARI_CATEGORY_ID, RESTAURANTS_CATEGORY_ID, TOP_ACTIVITY_CATEGORY_ID } from "../constant/constant";
import AllListingCategories from "../pages/AllListingCategories/AllListingCategories";

export default function PageRoute() {
  const token = useSelector(selectToken);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/home" element={token ? <HomeComp /> : <Navigate to="/login" replace />}>
          <Route path="/home" element={<HomeCards />} />
          <Route path="alllisting" element={<AllListingPage />} />
          <Route path="newlisting" element={<AddNewListing />} />
          <Route path="editlisting" element={<AddNewListing />} />
          <Route path="alllistingcategories" element={<AllListingCategories />} />
          <Route path="addlistingcategories" element={<AddListingCategories />} />
          {/* <Route path="users" element={<Users />} /> */}
          <Route path="Restaurants" element={<CategoryList id={RESTAURANTS_CATEGORY_ID}/>} />
          <Route path="TopActivities" element={<CategoryList id={TOP_ACTIVITY_CATEGORY_ID}/>} />
          <Route path="DubaiDesert" element={<CategoryList id={DESERT_SAFARI_CATEGORY_ID}/>} />
          <Route path="importcsvfile" element={<CsvFile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
