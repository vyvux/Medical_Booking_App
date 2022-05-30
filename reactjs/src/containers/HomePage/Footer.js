import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Card, CardTitle, CardText, UncontrolledCarousel } from "reactstrap";
import * as actions from "../../store/actions";
import Logo from "../Logo/Logo";
import "./Footer.scss";

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {}

  render() {
    return (
      <Container className="footer mh-md-15 mh-35 py-3">
        <Row>
          <Col className="logo">
            <Logo />
          </Col>
          <Col className="text">© 2022 MedCare.</Col>
        </Row>
      </Container>
    );
  }
}

export default Footer;
