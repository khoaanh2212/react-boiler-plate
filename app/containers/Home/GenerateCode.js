import React from 'react';
import styled from 'styled-components';

import svg from './default-preview-qr.svg';

export const Wrapper = styled.div`
  button {
    margin-top: 20px;
    width: 100%
  }
`;

export class GenerateCode extends React.Component { //eslint-disable-line
  render() {
    return (
      <Wrapper>
        <div className="preview">
          <img className="card-img-top" alt="QR Code Preview" src={svg} />

          <div className="loading-screen">
            <span className="loader"></span>
          </div>
        </div>

        <button type="button" title="Generate QR code preview" className="btn btn-success">
          Download QR Code
        </button>
      </Wrapper>
    );
  }
}

export default GenerateCode;
