import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Card, CardTitle, CardText } from "reactstrap";
import * as actions from "../../store/actions";
import "./Branch.scss";

class Service extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    this.props.getServiceStart();
  }

  render() {
    let { services } = this.props;
    return (
      <Container className="branch-container px-md-5 pe-4">
        <Row className="text-center">
          <Col sm="12" md="8" className="pe-3 justify-item-center">
            <Col>
              <div className="section mt-5 mb-3">Service</div>
            </Col>
            <Row>
              {services &&
                services.length > 0 &&
                services.map((service) => {
                  return (
                    <Col sm="6" className="branch-card" key={service.id}>
                      <Card body className="card-body">
                        <CardTitle tag="h5" className="branch-title">
                          {service.name}
                        </CardTitle>
                        <CardText className="paragraph">{service.description}</CardText>
                      </Card>
                    </Col>
                  );
                })}
            </Row>
          </Col>
          <Col sm="12" md="4">
            <div className="service-img mw-90 mw-md-34 mt-md-5 mt-0"></div>
          </Col>
        </Row>
      </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(Service);
