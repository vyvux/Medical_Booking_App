import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Card, CardTitle, CardText, UncontrolledCarousel } from "reactstrap";
import * as actions from "../../store/actions";
import "./Branch.scss";

class Doctor extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    this.props.getDoctorStart();
  }

  render() {
    let { doctors } = this.props;
    return (
      <Container className="branch-container px-md-5 pe-4">
        <Row className="text-center">
          {/* <Col sm="12" md="8" className="pe-3 justify-item-center"> */}
          <Col>
            <div className="section mt-5 mb-3">Doctor</div>
          </Col>
          <Row>
            {doctors &&
              doctors.length > 0 &&
              doctors.map((doctor) => {
                return (
                  <Col sm="6" className="branch-card" key={doctor.id}>
                    <Card body className="card-body">
                      <CardTitle tag="h5" className="branch-title">
                        {doctor.name}
                      </CardTitle>
                      <CardText className="paragraph">{doctor.description}</CardText>
                    </Card>
                  </Col>
                );
              })}
          </Row>
          {/* </Col> */}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    doctors: state.doctor.doctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { getDoctorStart: () => dispatch(actions.fetchDoctorStart()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
