/*
 *
 * Home
 *
 */

import React, { PropTypes } from 'react';
import { injectIntl } from 'react-intl';


import styled from 'styled-components';

import WineImage from './free-visual-tracking-QR-code-generator-brands-design.jpg';
import ThreeStep from './3-step-create-qr-code.jpg';


export const Wrapper = styled.div`
  .section {
    padding-top: 30px;
    border-radius: 3px;
  }
  h3 {
    margin-bottom: 30px;
  }
  .img-content {
    margin-top: 0px;
    margin-bottom: 0px;
    img {
      width: 100%;
    }
    
  }
  .block-content {
    padding: 30px 0;
  }
`;

export class Information extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <Wrapper className="wrapper">
        <div className="section section-get-started">
          <div className="container-fluid">
            <div className="block-content">
              <div className="row hidden-sm-down mb-lg-5 mt-lg-5">
                <div className="col-md-6 img-content">
                  <img src={WineImage} alt="" />
                </div>
                <div className="col-md-6 info-content">
                  <h3 className="text-center">Integrate your visual QR code in your art work!</h3>
                  <div>
                    so many QR codes are used daily in posters, flyers and even online. QR zebra allows you
                    to integrate your QR codes in your graphics. These QR codes feel less aggressive than standard QR
                    codes and are part of your brand identity and branding to your consumers. Its very easy to design
                    and
                    visual QR code with our visual QR Code generator or our logo QR code generator. Let a QR code be
                    part
                    of your brand!
                  </div>
                </div>
              </div>
              <div className="row hidden-md-up mb-5">
                <div className="col-md-6 info-content mb-4">
                  <h3 className="text-center">Integrate your visual QR code in your art work!</h3>
                  <div>
                    so many QR codes are used daily in posters, flyers and even online. QR zebra allows you
                    to integrate your QR codes in your graphics. These QR codes feel less aggressive than standard QR
                    codes and are part of your brand identity and branding to your consumers. Its very easy to design
                    and
                    visual QR code with our visual QR Code generator or our logo QR code generator. Let a QR code be
                    part
                    of your brand!
                  </div>
                </div>
                <div className="col-md-6 img-content">
                  <img src={WineImage} alt="" />
                </div>
              </div>
            </div>
            <div className="block-content">
              <div className="row hidden-sm-down mb-lg-5 mt-lg-5">
                <div className="col-md-6 info-content">
                  <h3 className="text-center">Easy to setup your customized Free QR code!</h3>
                  <div>
                    <p>To design a customized visual QR code is very easy with our free customized visual QR code generator. Upload your URL or data, choose what type of visual QR code your want to generate, customize all parameters of your visual QR code design and your visual QR code is ready to download and use it.</p>

                    <p>Here we explain it step by step how to generate a QR code on QR zebra with our visual QR code generator:</p>

                    <p>Step 1 Select the type of visual QR code you need.
                      Do you want to make a free logo qr code or do you want to make a free visual qr code for your brand, Select the QR code that fits with your brand indentity</p>

                    <p>Step 2 Add the data for the visual QR code content that you selected.
                      Depending on the type of QR code data you have chosen; enter the content for the QR code eg; the website URL, the Facebook page, text message, the email message details, etc.</p>

                    <p>Step 3 Style your visual QR code.
                      Change shape and the colour of your visual QR code using our handy colour picker. You can add your logo or any other image you want on your visual QR page.</p>

                    <p>Step 5 Download your visual QR code.
                      Download your completed free QR code image. A range of different formats are available for your free visual QR code.</p>
                  </div>
                </div>
                <div className="col-md-6 img-content">
                  <img src={ThreeStep} alt="" />
                </div>
              </div>
              <div className="row hidden-md-up mb-5">
                <div className="col-md-6 info-content mb-4">
                  <h3 className="text-center">Integrate your visual QR code in your art work!</h3>
                  <div>
                    <p>To design a customized visual QR code is very easy with our free customized visual QR code generator. Upload your URL or data, choose what type of visual QR code your want to generate, customize all parameters of your visual QR code design and your visual QR code is ready to download and use it.</p>

                    <p>Here we explain it step by step how to generate a QR code on QR zebra with our visual QR code generator:</p>

                    <p>Step 1 Select the type of visual QR code you need.
                      Do you want to make a free logo qr code or do you want to make a free visual qr code for your brand, Select the QR code that fits with your brand indentity</p>

                    <p>Step 2 Add the data for the visual QR code content that you selected.
                      Depending on the type of QR code data you have chosen; enter the content for the QR code eg; the website URL, the Facebook page, text message, the email message details, etc.</p>

                    <p>Step 3 Style your visual QR code.
                      Change shape and the colour of your visual QR code using our handy colour picker. You can add your logo or any other image you want on your visual QR page.</p>

                    <p>Step 5 Download your visual QR code.
                      Download your completed free QR code image. A range of different formats are available for your free visual QR code.</p>
                  </div>
                </div>
                <div className="col-md-6 img-content">
                  <img src={ThreeStep} alt="" />
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
