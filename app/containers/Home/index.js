/*
 *
 * Home
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import makeSelectHome from './selectors';
import './style.scss';
import VisualCode from './VisualCode';
import GenerateCode from './GenerateCode';
import LogoCode from './LogoCode';
import messages from './messages';
import Information from './Information/Information';

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
    const { intl: { formatMessage } } = this.props;
    return (
      <Wrapper>
        <Helmet
          title={formatMessage(messages.header)}
          meta={[
            { name: 'description', content: 'Description of Home' },
          ]}
        />
        <div className="type-bar-inner">
          <Link
            className={`tab ${activeTab === VISUAL_QR_CODE && 'active'}`}
            onClick={() => this.toggleTab(VISUAL_QR_CODE)}
          ><FormattedMessage {...messages.visualQRCode} /></Link>
          <Link
            className={`tab ${activeTab === LOGO_QR_CODE && 'active'}`}
            onClick={() => this.toggleTab(LOGO_QR_CODE)}
          ><FormattedMessage {...messages.logoQRCode} /></Link>
        </div>
        <div className="settings">
          <div className="container-fluid">
            {activeTab === VISUAL_QR_CODE && <div className="row inner">
              <div className="col-md-12 settings-options">
                <VisualCode />
              </div>
            </div>}
            {activeTab === LOGO_QR_CODE &&
            <div className="row inner">
              <div className="col-md-7 col-lg-8 settings-options">
                {activeTab === LOGO_QR_CODE && <LogoCode />}
              </div>
              <div className="col-md-5 col-lg-4 settings-download">
                <GenerateCode />
              </div>
            </div>}
          </div>
        </div>
        <Information />
      </Wrapper>
    );
  }
}

Home.propTypes = {
  intl: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  Home: makeSelectHome(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Home));
