import React, { useState } from "react";
import { connect } from "react-redux";
import { authenticate, authFailure, authSuccess } from "../redux/authActions";
import "./loginpage.css";
import { userLogin } from "../services/authenticationService";
import { Alert, Spinner } from "react-bootstrap";

const LoginPage = ({ loading, error, ...props }) => {
  
  const [values, setValues] = useState({
    userName: "",
    password: "",
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.authenticate();
    // console.log(props);
    //method called userLogin(userName,password) in authentication service as a authRequest
    userLogin(values)
      .then((response) => {
        // console.log("response->", response);
        if (response.status === 200) {
          // console.log("logging success");
          props.setUser(response.data);
          window.location.href = "/dashboard";        
        } else {
          props.loginFailure("1.Something Wrong!Please Try Again");
        }
      })
      .catch((err) => {
        if (err && err.response) {
          switch (err.response.status) {
            case 401:
              console.log("401 status");
              props.loginFailure("Authentication Failed.Bad Credentials");
              break;
            default:
              props.loginFailure("2.Something Wrong!Please Try Again!");
          }
        } else {
          props.loginFailure("3.Something Wrong!Please Try Again");
        }
      });
    //console.log("Loading again",loading);
  };

  const handleChange = (e) => {
    e.persist();
    // console.log(e.target.name+"-"+e.target.value)
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="login-page">
      <section className="h-100">
        <div>
          <div className="row justify-content-md-center h-100">
            <div className="card-wrapper">
              <div className="card fat">
                <div className="card-body">
                  <h4 className="card-title">Login</h4>
                  {/* onsubmit then, call to {handleSubmit}*/}
                  <form
                    className="my-login-validation"
                    onSubmit={handleSubmit}
                    noValidate={false}
                  >
                    <div className="form-group">
                      <label htmlFor="email">User Name</label>
                      <input
                        id="username"
                        type="text"
                        className="form-control"
                        minLength={5}
                        value={values.userName}
                        onChange={handleChange}
                        name="userName"
                        required
                      />

                      <div className="invalid-feedback">UserId is invalid</div>
                    </div>

                    <div className="form-group">
                      <label>Password</label>
                      <input
                        id="password"
                        type="password"
                        className="form-control"
                        minLength={8}
                        value={values.password}
                        onChange={handleChange}
                        name="password"
                        required
                      />
                      <a href="forgot.html" className="float-right">
                        Forgot Password?
                      </a>
                      <div className="invalid-feedback">
                        Password is required
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck1"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck1"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>

                    <div className="form-group m-0">
                      <button type="submit" className="btn btn-primary">
                        Login
                        {loading && (
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    </div>
                  </form>
                  {error && (
                    <Alert style={{ marginTop: "20px" }} variant="danger">
                      {error}
                    </Alert>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  console.log("state ", auth);
  return {
    loading: auth.loading,
    error: auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: () => dispatch(authenticate()),
    //user details setted in above
    setUser: (data) => dispatch(authSuccess(data)),
    //error messages setted in above
    loginFailure: (message) => dispatch(authFailure(message)),
  };
};
//get data from store
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
