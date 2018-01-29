/*
 *
 * Home
 *
 */

import React, { PropTypes } from 'react';
import { injectIntl } from 'react-intl';


import styled from 'styled-components';

import WineImage from './free-visual-tracking-QR-code-generator-brands-design.jpg';


export const Wrapper = styled.div`
  .img-center {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
`;

export class Information extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <Wrapper className="wrapper">
        <div className="section section-get-started">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 img-center">
                <img src={WineImage} alt="" />
              </div>
              <div className="col-md-12 info-content">
                <h3 className="text-center">integrate your visual QR code in your art work!</h3>
                <div>
                  so many QR codes are used daily in posters, flyers and even online. QR zebra allows you
                  to integrate your QR codes in your graphics. These QR codes feel less aggressive than standard QR
                  codes and are part of your brand identity and branding to your consumers. Its very easy to design and
                  visual QR code with our visual QR Code generator or our logo QR code generator. Let a QR code be part
                  of your brand!
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}

Information.propTypes = {
  intl: PropTypes.object,
};


export default injectIntl(Information);
