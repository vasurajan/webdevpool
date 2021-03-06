import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import '../CSS/login.css';
import Footer from '../layout/footer';
import { url } from "gravatar";

const Login = ({ login, isAuthenticated }) => {
  //intializing a state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoginAuth, setisLoginAuth] = useState(false);
  const { email, password } = formData;

  // making a controlled component
  const onChange = (e) =>
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password)
    setisLoginAuth(true);
    // if(isAuthenticated){
    //   onDashboard()
    // } else {
    //   onsame()
    // }
  };

  if (isAuthenticated && isLoginAuth) {
    return <Redirect to="/dashboard" />;
  }

  // const onDashboard = () => {
  //   return <Redirect to='/dashboard'></Redirect>
  // };
  // const onsame = () => {
  //   return <Redirect to='/login'></Redirect>
  // };

  return (
    <div className="main">
      <span></span>
    <div className="login">
      <Link to="/">
      </Link>
      <div className="login-form" style={{border: '1px solid darkgrey'}}>
        <h1>Sign in</h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <h5 className="text-size">E-mail</h5>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
          <h5 className="text-size">Password</h5>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
          <input type="submit" style={{backgroundColor:'darkorange',color:'white'}} className="signIn" value="Login" />
        </form>
        <p style={{ textAlign: "center", fontWeight: "bold" }} className="my-1">
        <b>Don't have an account?</b> 
        <Link style={{ textAlign: "center", fontSize: "1.1rem", fontWeight: "bold", textDecoration: "underline" }} to="/register">Sign Up</Link>
        </p>
        {/* {isAuthenticated ? onDashboard : onsame} */}
      </div>
    </div>
    {/* <Footer /> */}
    </div>
  )
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);