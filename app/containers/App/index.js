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

import withProgressBar from 'components/ProgressBar';
import MainHeader from 'components/MainHeader';

const AppWrapper = styled.div`
  min-height: 100vh
  margin: 0 auto;
  display: flex;
  @media (min-width: 768px) {
    padding: 0 100px;  
  }
  @media (max-width: 768px) {
    padding: 0 16px;  
  }
 
  flex-direction: column;
  background-image: linear-gradient(135deg,#0277bd 0,#8bc34a 100%);
  ;
  overflow: auto;
`;

export function App(props) {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Qr Code"
        defaultTitle="Qr Code"
        meta={[
          { name: 'description', content: 'Qr Code application' },
        ]}
      />
      <MainHeader />
      {React.Children.toArray(props.children)}
    </AppWrapper>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default withProgressBar(App);
