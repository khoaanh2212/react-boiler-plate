/**
 *
 * MainHeader
 *
 */

import React from 'react';
// import styled from 'styled-components';

import './style.scss';


export class MainHeader extends React.PureComponent { //eslint-disable-line

  render() {
    return (
      <div className="header">
        <div className="navigation-bar">
          <div className="container-fluid">
            <div className="row">
              <div className="logo-flex">
                <span>
                  logo here
                </span>
              </div>

              <div className="menu-flex">
                <ul className="menu d-lg-none menu-icon">
                  <li>
                    <i className="fa fa-bars"></i>
                  </li>
                </ul>
                <ul className="menu d-none d-lg-block">
                  <li className="d-lg-none close">
                    <a><i className="fa fa-times"></i></a>
                  </li>
                  <li>
                    <a href="#about">Visual QR code generator</a>
                  </li>
                  <li>
                    <a href="#faq">Track data</a>
                  </li>
                  <li>
                    <a target="_blank">BLOG</a>
                  </li>
                  <li className="login-menu">
                    <span>
                      <a href="https://www.qrcode-monkey.com/qr-code-api-with-logo">Login</a>
                      <a href="https://www.qrcode-monkey.com/qr-code-api-with-logo">|</a>
                      <a href="https://www.qrcode-monkey.com#donate" className="btn btn-donate">Register</a>
                    </span>
                  </li>
                  <li className="register-menu">

                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

MainHeader.propTypes = {};

export default MainHeader;
