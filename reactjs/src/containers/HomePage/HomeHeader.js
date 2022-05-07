import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from "reactstrap";
import Login from "../Authenticate/Login";
import Logo from "../Logo/Logo";

class HomeHeader extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      // <div className="home-header-container px-md-5">
      //   <div className="home-header-content">
      //     <div className="left-content align-items-center">
      //       <i className="fas fa-bars fa-2x"></i>
      //       <div className="header-logo"></div>
      //     </div>
      //     <div className="center-content"></div>
      //     <div className="right-content"></div>
      //   </div>
      // </div>
      <div className="home-header-container justif-items-between">
        <Navbar color="light" light expand="md" className="px-auto px-md-5">
          <NavbarBrand href="/home">
            <Logo lightBg={true} smallSize={false} />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <div className="clearfix" style={{ padding: ".5rem" }}>
                <Link to="/register" className="btn ">
                  Sign up
                </Link>
                <Link to="/login" className="btn ">
                  Log in
                </Link>
              </div>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
