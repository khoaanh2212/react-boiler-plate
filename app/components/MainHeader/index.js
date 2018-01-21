/**
 *
 * MainHeader
 *
 */

import React from 'react';
import { Link } from 'react-router';
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
                    <Link><i className="fa fa-times"></i></Link>
                  </li>
                  <li>
                    <Link>Visual QR code generator</Link>
                  </li>
                  <li>
                    <Link>Track data</Link>
                  </li>
                  <li>
                    <Link>BLOG</Link>
                  </li>
                  <li className="login-menu">
                    <span>
                      <Link>Login</Link>
                      <Link>|</Link>
                      <Link>Register</Link>
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
