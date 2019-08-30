import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Row, Card, CardTitle, Form, Label, Input, Button } from "reactstrap";
import { NavLink } from "react-router-dom";

import { Colxx } from "Components/CustomBootstrap";

import { connect } from "react-redux";
import { registerUser } from "Redux/actions";

class RegisterLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: "test@111.com",
        password: "123456",
        firstname: "aaa",
        lastname: "hhh"
    };
  }
  onUserRegister() {
    if (this.state.email !== "" && this.state.password !== "" && this.state.firstname !== "" && this.state.lastname !== "") {
      this.props.registerUser(this.state, this.props.history); // wait, i am coming, open code where fields are set in state
      // this.props.history.push("/");
    }
  }

  componentDidMount() {
    document.body.classList.add("background");
  }
  componentWillUnmount() {
    document.body.classList.remove("background");
  }
  render() {
    return (
      <Fragment>
        <div className="fixed-background" />
        <main>
          <div className="container">
            <Row className="h-100">
              <Colxx xxs="12" md="10" className="mx-auto my-auto">
                <Card className="auth-card">
                  <div className="position-relative image-side ">
                    <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
                    <p className="white mb-0">
                      Please use this form to register. <br />
                      If you are a member, please{" "}
                      <NavLink to={`/login`} className="white">
                        login
                      </NavLink>
                      .
                    </p>
                  </div>
                  <div className="form-side">
                    <NavLink to={`/`} className="white">
                      <span className="logo-single" />
                    </NavLink>
                    <CardTitle className="mb-4">
                      <IntlMessages id="user.register" />
                    </CardTitle>
                    <Form>
                      <Label className="form-group has-float-label mb-4">
                        <Input type="name" name="firstname" defaultValue="" onChange={(e)=>{this.state.firstname = e.target.value}} />
                        <IntlMessages id="First Name" />
                      </Label>
                      <Label className="form-group has-float-label mb-4">
                        <Input type="name" name="lastname" defaultValue="" onChange={(e)=>{this.state.lastname = e.target.value}}/>
                        <IntlMessages id="Last Name" />
                      </Label>
                      <Label className="form-group has-float-label mb-4">
                        <Input type="email" name="email" defaultValue="" onChange={(e)=>{this.state.email = e.target.value}}/>
                        <IntlMessages id="Email" />
                      </Label>
                      <Label className="form-group has-float-label mb-4">
                        <Input type="password" name="password" onChange={(e)=>{this.state.password = e.target.value}}/>
                        <IntlMessages
                          id="user.password"
                          defaultValue=""
                          name="password"
                        />
                      </Label>
                      <div className="d-flex justify-content-end align-items-center">
                        <Button
                          color="primary"
                          className="btn-shadow"
                          size="lg"
                          onClick={() => this.onUserRegister()}
                        >
                          <IntlMessages id="user.register-button" />
                        </Button>
                      </div>
                    </Form>
                  </div>
                </Card>
              </Colxx>
            </Row>
          </div>
        </main>
      </Fragment>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, loading } = authUser;
  return { user, loading };
};

export default connect(
  mapStateToProps,
  {
    registerUser
  }
)(RegisterLayout);