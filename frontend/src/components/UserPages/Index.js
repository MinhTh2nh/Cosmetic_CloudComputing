import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mainBg from "../../assets/mainBackground.png";
import logo from "../../assets/logo.png";
import Footer from "./Footer";
import Carousel from "./Carousel";
import ProductField from "./Products";
import LoginModal from "./Login";
import "../Users.css";

import { userLogout } from "../../actionCreators/LoginAction";

const Index = (props) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [NavLoginSuccess, setNavLoginSuccess] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [submitSearch, setSubmitSearch] = useState(false);

  const loginSuccess = (boolean) => {
    setNavLoginSuccess(boolean);
  };

  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace("-", "+").replace("_", "/");
      const decoded = JSON.parse(atob(base64));
      return decoded;
    } catch (e) {
      console.error("Error parsing JWT:", e);
      return null;
    }
  };
  
  // Usage
  if (localStorage.getItem("token-user")) {
    var userData = parseJwt(localStorage.getItem("token-user"));
    // Now userData contains the decoded JWT payload
  }

  const noLoginCartNotification = () => {
    toast.error("Please login first to continue.", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const comingSoonNotification = () => {
    toast.success("This Feature will coming soon, Stay tune!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const searchNotification = () => {
    toast.success("Discover the clothe that you search below.", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleSearchInput = (event) => {
    let { value } = event.currentTarget;
    setSearchInput(value);
  };

  const handleSearchSubmit = () => {
    setSubmitSearch(true);
    searchNotification();
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
    // cause warning but needed to stop logout alert shows 2 times.
  };

  const closeLoginModal = (boolean) => {
    setShowLoginModal(boolean);
  };

  const Logout = () => {
    props.userLogout();
    setNavLoginSuccess(false);
  };


  const picture = (image) => {
    return {
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  };

  return (
    <div
      style={{
        fontFamily: "Karla,sans-serif",
        backgroundColor: "#f8f9fa",
      }}
    >
      {/* start header - part1 */}
      <div className="main-bg-height" style={picture(mainBg)}>
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand" href="/">
              <img src={logo} className="logo-fx" alt="..." />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                {props.tokenUser ? (
                  <Link to="/cart" style={{ textDecoration: "none" }}>
                    <li className="nav-item">
                      <button className="btn btn-success d-flex d-row">
                        <i className="fas fa-shopping-cart align-self-center mr-2" />
                        <p className="my-0">Cart : {props.dataCart.length}</p>
                      </button>
                    </li>
                  </Link>
                ) : (
                  <li className="nav-item">
                    <button
                      onClick={() => noLoginCartNotification()}
                      className="btn btn-secondary d-flex d-row"
                    >
                      <i className="fas fa-shopping-cart align-self-center mr-2" />
                      <p className="my-0">Cart : {props.dataCart.length}</p>
                    </button>
                  </li>
                )}

                <li className="nav-item mx-4">
                  {NavLoginSuccess ? (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-success dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {`Hello, ${userData.username}`}
                      </button>
                      <div className="dropdown-menu">
                        <button
                          className="dropdown-item text-danger"
                          onClick={Logout}
                        >
                          Logout <i className="fas fa-sign-out-alt"></i>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={openLoginModal}
                      className="btn btn-success"
                    >
                      Sign In <i className="fas fa-sign-in-alt ml-2"></i>
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <ToastContainer />

        <div className="vertical-center">
          <h1
            className="display-4 font-weight-bold text-center"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Radiant Reverie Beauty
          </h1>
          <p className="text-center text-secondary">
            Illuminate Your Beauty with Radiant Reverie.
          </p>
          <div className="input-group mt-5">
            <input
              type="text"
              className="form-control py-4"
              placeholder="Search the fashion name that you want here"
              name="searchinput"
              onChange={handleSearchInput}
              onKeyPress={(event) =>
                event.key === "Enter" ? handleSearchSubmit() : null
              }
            />
            <div className="input-group-append">
              <button
                className="btn btn-success px-4 btn-50"
                type="button"
                id="button-addon2"
                onClick={handleSearchSubmit}
              >
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* start header - part 1 */}

      {/* carousel-brochure */}
      <div className="container my-5">
        <Carousel />
      </div>
      {/* carousel-brochure */}

      {/* part 3 - content */}
      <div className="container">
        <div className="row mb-5">
          {/* Sidebar */}
          <div className="col-md-3 mt-3">
            <div className="list-group">
              <button
                onClick={comingSoonNotification}
                type="button"
                className="list-group-item list-group-item-action d-flex d-row mb-2"
              >
                Face
              </button>
              <button
                onClick={comingSoonNotification}
                type="button"
                className="list-group-item list-group-item-action d-flex d-row mb-2"
              >
                Eyes
              </button>
              <button
                onClick={comingSoonNotification}
                type="button"
                className="list-group-item list-group-item-action d-flex d-row mb-4"
              >
                Lips
              </button>
              <button
                onClick={comingSoonNotification}
                type="button"
                className="list-group-item list-group-item-action d-flex d-row mb-2"
              >
                Accessories
              </button>
              <button
                onClick={comingSoonNotification}
                type="button"
                className="list-group-item list-group-item-action d-flex d-row mb-2"
              >
                Shaving Needs
              </button>
            </div>
          </div>
          {/* Sidebar */}

          <div className="col-md-9">
            <ProductField
              searchInput={searchInput}
              submitSearch={submitSearch}
            />
          </div>
        </div>
      </div>
      {/* part 3 - content */}

      {/* Footer */}
      <hr className="horizontal-line" />
      <Footer />
      {/* Footer */}

      {/* Modals */}
      <LoginModal
        showLoginModal={showLoginModal}
        closeLoginModal={closeLoginModal}
        loginSuccess={loginSuccess}
      />
      {/* Modals */}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    tokenUser: state.LoginReducer.tokenUser,
  };
};

const mapDispatchToProps = {
  userLogout,
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
