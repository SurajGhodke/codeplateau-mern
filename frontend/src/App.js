import React from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Route, Switch } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";
import PrivateRoute from "./components/helper/PrivateRoutes";
import Home from "./components/Home";

const App = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/user/dashboard" component={UserDashboard} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
