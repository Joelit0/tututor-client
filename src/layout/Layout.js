import React from "react";
import PropTypes from "prop-types";
import NextNprogress from "nextjs-progressbar";

const Layout = (props) => (
  <div className="layout-container">
    <NextNprogress
      color="#FF66A7" // Pink Cyclamen
      startPosition="0.3"
      stopDelayMs="400"
      height="4"
    />
    {props.children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

export default Layout;
