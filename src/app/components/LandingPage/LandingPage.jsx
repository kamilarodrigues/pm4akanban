import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import "./LandingPage.scss";

class LandingPage extends Component {
  static propTypes = {
    dispatch: { type: "ENTER_AS_GUEST" }
  };

  render = () => (
    <div className="landing-page">
      <Helmet>
        <title>PM4A</title>
      </Helmet>
    </div>
  );
}

export default connect()(LandingPage);
