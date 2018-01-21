/*
 *
 * Home
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import makeSelectHome from './selectors';
import './style.scss';
import VisualCode from './VisualCode';
import GenerateCode from './GenerateCode';

export const Wrapper = styled.div`
  padding-bottom: 50px;
`;

const VISUAL_QR_CODE = 'VISUAL_QR_CODE';
const LOGO_QR_CODE = 'LOGO_QR_CODE';

export class Home extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      activeTab: VISUAL_QR_CODE,
    };
  }

  toggleTab = (tab) => {
    this.setState({ activeTab: tab });
  }

  render() {
    const { activeTab } = this.state;
    return (
      <Wrapper>
        <Helmet
          title="Home"
          meta={[
            { name: 'description', content: 'Description of Home' },
          ]}
        />
        <div className="type-bar-inner">
          <Link
            className={`tab ${activeTab === VISUAL_QR_CODE && 'active'}`}
            onClick={() => this.toggleTab(VISUAL_QR_CODE)}
          >Visual QR Code</Link>
          <Link
            className={`tab ${activeTab === LOGO_QR_CODE && 'active'}`}
            onClick={() => this.toggleTab(LOGO_QR_CODE)}
          >Logo QR Code</Link>
        </div>
        <div className="settings">
          <div className="container-fluid">
            <div className="row inner">
              <div className="col-md-7 col-lg-8 settings-options">
                {activeTab === VISUAL_QR_CODE && <VisualCode />}
              </div>
              <div className="col-md-5 col-lg-4 settings-download">
                <GenerateCode />
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Home: makeSelectHome(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
