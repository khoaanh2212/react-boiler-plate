/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import Footer from 'components/Footer';
import withProgressBar from 'components/ProgressBar';
import MainHeader from 'components/MainHeader';

const AppWrapper = styled.div`
  min-height: 100vh
  margin: 0 auto;
  display: flex;
  padding: 0 16px;
  flex-direction: column;
  background-image: linear-gradient(135deg,#0277bd 0,#8bc34a 100%);
  padding: 0 150px;
`;

export function App(props) {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Qr Code"
        defaultTitle="Link Bird"
        meta={[
          { name: 'description', content: 'A Link Bird application' },
        ]}
      />
      <div className="background"></div>
      <MainHeader />
      {React.Children.toArray(props.children)}
      <Footer />
    </AppWrapper>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default withProgressBar(App);
