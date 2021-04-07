import React, {Component } from 'react';

class Loader extends Component {
  render() {
    return (
      <div className="wrapper">
        <div className="wrapper_default">
          <div className="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Loader;