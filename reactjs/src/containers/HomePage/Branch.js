import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Card, CardTitle, CardSubtitle, CardText } from "reactstrap";
import * as actions from "../../store/actions";
import "./Branch.scss";

class Branch extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    this.props.getBranchStart();
  }

  render() {
    let { branches } = this.props;
    return (
      <Container className="branch-container px-md-5 pe-4">
        <Row className="text-center">
          <Col sm="12" md="4">
            <div className="branch-img mw-70 mw-md-34"></div>
          </Col>
          <Col sm="12" md="8" className="pe-3">
            <Col>
              <div className="section mt-md-5 mb-3">Branches</div>
            </Col>
            <Row>
              {branches &&
                branches.length > 0 &&
                branches.map((branch) => {
                  return (
                    <Col sm="6" className="branch-card" key={branch.id}>
                      <Card body>
                        <CardTitle tag="h5" className="branch-title">
                          {branch.name}
                        </CardTitle>
                        <CardSubtitle>Adress: {branch.address}</CardSubtitle>
                        <CardSubtitle>Tel: {branch.phoneNumber}</CardSubtitle>
                        <CardText className="paragraph">{branch.description}</CardText>
                      </Card>
                    </Col>
                  );
                })}
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    branches: state.clinicInfo.branches,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { getBranchStart: () => dispatch(actions.fetchBranchStart()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Branch);
