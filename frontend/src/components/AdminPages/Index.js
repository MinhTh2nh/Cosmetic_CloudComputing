import React from "react";
import { connect } from "react-redux";
import { Route, Routes, Navigate, Link } from "react-router-dom";

import Login from "./AdminLogin";
import AdminDashboard from "./Dashboard";
import AdminProductPage from "./AdminProduct";
import AdminUsersPage from "./AdminUsers";

const Index = (props) => {
  return (
    <div>
      <Routes>
        <Route
          path=""
          element={
            props.tokenAdmin ? (
              <div>
                <h1 className="text-success-s2 text-center">
                  Welcome Admin, this is the dashboard Page.
                </h1>
                <div className="d-flex d-row justify-content-center">
                  <Link to="/admin">
                    <h4 className="text-success-s2 admin-nav">Home</h4>
                  </Link>
                  <hr className="vertical-line mx-4 my-0" />
                  <Link to="/admin/users">
                    <h4 className="text-success-s2 admin-nav">Users</h4>
                  </Link>
                  <hr className="vertical-line mx-4 my-0" />
                  <Link to="/admin/product">
                    <h4 className="text-success-s2 admin-nav">Products</h4>
                  </Link>
                </div>
                <AdminDashboard />
              </div>
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/product"
          element={
            props.tokenAdmin ? (
              <div>
                <h1 className="text-success-s2 text-center">
                  Welcome Admin, this is the Product Page.
                </h1>
                <div className="d-flex d-row justify-content-center">
                  <Link to="/admin">
                    <h4 className="text-success-s2 admin-nav">Home</h4>
                  </Link>
                  <hr className="vertical-line mx-4 my-0" />
                  <Link to="/admin/users">
                    <h4 className="text-success-s2 admin-nav">Users</h4>
                  </Link>
                  <hr className="vertical-line mx-4 my-0" />
                  <Link to="/admin/product">
                    <h4 className="text-success-s2 admin-nav">Products</h4>
                  </Link>
                </div>
                <AdminProductPage />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/users"
          element={
            props.tokenAdmin ? (
              <div>
                <h1 className="text-success-s2 text-center">
                  Welcome Admin, this is the Users Page.
                </h1>
                <div className="d-flex d-row justify-content-center">
                  <Link to="/admin">
                    <h4 className="text-success-s2 admin-nav">Home</h4>
                  </Link>
                  <hr className="vertical-line mx-4 my-0" />
                  <Link to="/admin/users">
                    <h4 className="text-success-s2 admin-nav">Users</h4>
                  </Link>
                  <hr className="vertical-line mx-4 my-0" />
                  <Link to="/admin/product">
                    <h4 className="text-success-s2 admin-nav">Products</h4>
                  </Link>
                </div>
                <AdminUsersPage />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    tokenAdmin: state.LoginReducer.tokenAdmin,
  };
};
export default connect(mapStateToProps, null)(Index);
