import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Branch from "./Branch";
import Service from "./Service";
import Doctor from "./Doctor";
import Footer from "./Footer";
import { Container, UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody } from "reactstrap";
import * as actions from "../../store/actions";

class HomePage extends Component {
  async componentDidMount() {
    this.props.getServiceStart();
  }

  render() {
    return (
      <div>
        <HomeHeader />
        <Branch />
        <Service />
        <Doctor />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    services: state.clinicInfo.services,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { getServiceStart: () => dispatch(actions.fetchServiceStart()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
