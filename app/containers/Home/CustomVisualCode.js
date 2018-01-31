/* eslint-disable jsx-a11y/no-static-element-interactions,react/jsx-no-bind,array-callback-return,react/no-find-dom-node, no-nested-ternary */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';
import Rnd from 'react-rnd';
import ReactDOM from 'react-dom';

import RenderFileField from 'components/RenderFileField';

import messages from './messages';
import { VISUAL_CODE_FORM } from './constants';
import blankQRCode from './Images/qr-code_QRzebra.svg';
import { actionGetQRCode } from './actions';
// import Naive from './Naive';

export const Wrapper = styled.div`
  .container-qrfields {
    position: relative;
    padding-left: 2px;
    min-height: 344px;
    h4 {
      font-style: normal;
      color: #c0392b;
      font-size: 18px;
    }
  }
  .scanova-header {
    border-bottom: 1px solid #dedede;
    padding: 5px;
  }
  
  .flex-row {
    // display: flex;
    margin-left: -10px;
    margin-right: -10px;
    .logo-preview {
      width: 120px;
      height: 120px;
      flex-shrink: 0;
      padding: 8px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      margin: 0 16px 0 0;
      overflow: hidden;
      margin: 0 auto 10px;
      
      .placeholder {
        height: 100%;
      width: 100%;
      border: 3px dashed #e8eef2;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #6f787f;
      text-transform: uppercase;
      font-size: .8rem;
      }
    }
    .file-input {
      text-align: center;
    }
    .btn {
      border-radius: 0;
      min-width: 135px;
    }
    .btn-primary {
      margin-bottom: 5px;
    }
  }
  .file-input {
    .btn {
      position: relative;
      height: 38px;
      margin-left: 3px;
      border: none;
    }
  }
  .canvas-area {
    border: 1px solid #dedede;
    .title {
      position: relative;
      height: 38px;
      margin-top: 10px;
    }
    .canvas-wrapper {
      text-align: -webkit-center;
      padding: 20px;
      opacity: 1;
      .canvas-container {
        display: inline-block;
        .img-cover {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .btn-action {
    margin: 0px 0px 25px 0px;
  }
  .cover-canvas {
    position: relative;
    .dnd-container {
      width: 400px !important;
      height: 400px !important;
      position: absolute !important;
      top: 0;
    }
  }
`;

export class CustomVisualCode extends React.Component { //eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      backgroudPreview: null,
      indexImage: 0,
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      canvasWidth: 270,
      canvasHeight: 270,
    };
  }

  onSubmit = (values) => { //eslint-disable-line
    const { onGetCode } = this.props;
    const { dominantColorOfBackground } = this.state;
    const data = {
      text: 'http://www.qrzebra.com',
      size: 500,
      colorDark: `rgba(${dominantColorOfBackground.r},${dominantColorOfBackground.g},${dominantColorOfBackground.b},1)`,
      dotScale: 0.75,
      eye_outer: 1,
      eye_inner: 1,
      radiusData: 10,
    };
    onGetCode(data);
    console.log(values.toJS(), this.state.dominantColorOfBackground);
  }

  onUploadBackgroundChange = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file,
        backgroudPreview: reader.result,
        indexImage: this.state.indexImage + 1,
      });
    };
    reader.readAsDataURL(file);
    this.drawImageInCanvas(e);
  }

  getMaxWidthCanvas = () => {
    const wrapperPosition = ReactDOM.findDOMNode(this.refWrapperCanvas) &&
      ReactDOM.findDOMNode(this.refWrapperCanvas).getBoundingClientRect();
    return wrapperPosition.width - 40;
  }

  getMaxHeightCanvas = () => {
    const wrapperPosition = ReactDOM.findDOMNode(this.refWrapperCanvas) &&
      ReactDOM.findDOMNode(this.refWrapperCanvas).getBoundingClientRect();
    return wrapperPosition.height - 40;
  }

  getAverageRGB = (imgEl) => { // eslint-disable-line
    const blockSize = 5;
    const defaultRGB = { r: 0, g: 0, b: 0 };
    const canvas = document.createElement('canvas');
    const context = canvas.getContext && canvas.getContext('2d');
    let data = null;
    let width = null;
    let height = null;
    let i = -4;
    let length = null;
    const rgb = { r: 0, g: 0, b: 0 };
    let count = 0;

    if (!context) {
      return defaultRGB;
    }

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
      data = context.getImageData(0, 0, width, height);
    } catch (e) {
      /* security error, img on diff domain */
      return defaultRGB;
    }

    length = data.data.length;

    while ((i += blockSize * 4) < length) { // eslint-disable-line
      ++count; // eslint-disable-line
      rgb.r += data.data[i];
      rgb.g += data.data[i + 1];
      rgb.b += data.data[i + 2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count); // eslint-disable-line
    rgb.g = ~~(rgb.g / count); // eslint-disable-line
    rgb.b = ~~(rgb.b / count); // eslint-disable-line

    return rgb;
  }

  removeBackground = (e) => {
    e.preventDefault();
    this.setState({ backgroudPreview: null });
    this.props.change('background', null);
  }

  chooseExampleLogo = (e, logo) => {
    e.preventDefault();
    this.setState({ backgroudPreview: logo });
  }

  drawImageInCanvas = (e) => {
    const ctx = this.refCanvas.getContext('2d');
    const url = URL.createObjectURL(e.target.files[0]);

    const img = new Image();
    const me = this;
    img.src = url;
    img.onload = function () {
      const imgWidth = this.width;
      const imgHeight = this.height;
      const maxWidth = me.getMaxWidthCanvas();
      const ratio = maxWidth / imgWidth;
      const newHeight = imgHeight * ratio;
      const rgb = me.getAverageRGB(this);
      me.setState({ canvasWidth: maxWidth, canvasHeight: newHeight, dominantColorOfBackground: rgb });
      if (me.state.indexImage === 1) {
        ctx.drawImage(this, 0, 0, maxWidth, newHeight);
      } else {
        const { x, y, width, height } = me.state;
        ctx.drawImage(this, x, y, width, height);
      }

      // this line needs to go here
      const dataImg = me.refCanvas.toDataURL(); // eslint-disable-line
      // console.log(dataImg);
      // consider a callback to pass result to next function in chain
    };
    // img.src = url;
  }

  positionPlaceCode = (left, top) => {
    this.setState({ left, top });
  }

  render() {
    const { handleSubmit } = this.props;
    const { backgroudPreview } = this.state;
    return (<Wrapper>
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div className="container-qrfields scanova-qrbox row">
          <div className="col-md-4 col-sm-12 designer-options">
            <div>
              <h4 className="title scanova-header">Background Image</h4>
              <div className="flex-row form-group">
                <div className="logo-preview">
                  <img
                    className={`${!backgroudPreview && 'hidden'}`} src={backgroudPreview || ''}
                    style={{ width: '100%', height: '100%' }} alt=""
                  />
                  <div className={`placeholder ${backgroudPreview && 'hidden'}`}>
                    <span><FormattedMessage {...messages.noLogo} /></span>
                  </div>
                </div>
                <div className="col-sx-12">
                  <div className="form-group">
                    <Field
                      className="form-control hidden"
                      id="background"
                      name="background"
                      component={RenderFileField}
                      buttonLabel={'Upload Image'}
                      onChangeAction={this.onUploadBackgroundChange}
                    />
                  </div>
                </div>
              </div>
              <h4 className="title scanova-header">Data Patterns</h4>
              <div className="row">
                <div id="data-patterns" className="col-md-12">
                </div>
              </div>
              <h4 className="title scanova-header">Eye Patterns</h4>
              <div className="row">

              </div>
            </div>
          </div>
          <div className="col-md-8 col-sm-12 designer-options">
            <div className="canvas-area">
              <div className="text-center title">
                <p className="">Drag to Reposition QR Code on Background Image</p>
              </div>
              <div
                className="canvas-wrapper"
                ref={(node) => {
                  this.refWrapperCanvas = node;
                }}
              >
                <div className="canvas-container">
                  <canvas
                    ref={(node) => {
                      this.refCanvas = node;
                    }} width={this.state.canvasWidth} height={this.state.canvasHeight}
                  />
                  <Rnd
                    // style={{ background: '#ddd' }}
                    style={{ backgroundImage: `url(${blankQRCode})`, backgroundSize: '100%', background: '#ddd' }}
                    size={{ width: this.state.width, height: this.state.height }}
                    position={{ x: this.state.x, y: this.state.y }}
                    bounds="parent"
                    enableResizing={{
                      top: false,
                      right: false,
                      bottom: false,
                      left: false,
                      topRight: true,
                      bottomRight: true,
                      bottomLeft: true,
                      topLeft: true,
                    }}
                    onDragStop={(e, d) => {
                      this.setState({ x: d.x, y: d.y });
                    }}
                    onResize={(e, direction, ref, delta, position) => {
                      const maxWidthBox = this.getMaxWidthCanvas();
                      const maxHeightBox = this.getMaxHeightCanvas();
                      const diffWidth = (ref.offsetWidth + position.x) - maxWidthBox;
                      const diffHeight = (ref.offsetHeight + position.y) - maxHeightBox;
                      /* const mainWidth = diffWidth > 0 ? ref.offsetWidth - diffWidth : ref.offsetWidth;
                      const mainHeight = diffHeight > 0 ? ref.offsetHeight - diffHeight : ref.offsetHeight;
                      const diffSwitchWidth = (mainHeight + position.x) - maxWidthBox;
                      const diffSwitchHeight = (mainWidth + position.y) - maxHeightBox;
                      const mainSize = diffSwitchWidth < 0 ? mainWidth : mainHeight;*/
                      this.setState({
                        width: diffWidth > 0 ? ref.offsetWidth - diffWidth : ref.offsetWidth,
                        height: diffHeight > 0 ? ref.offsetHeight - diffHeight : ref.offsetHeight,
                        ...position,
                      });
                    }}
                  >

                  </Rnd>
                </div>
              </div>
              <div className="row btn-action">
                <div className="col-sm-4 col-lg-4">
                  <button id="preview-but" className="btn btn-default btn-block btn-sm btn-scanova-def">
                    Reposition QR Code
                  </button>
                </div>
                <div className="col-sm-5 col-lg-4">
                  <button
                    id="preview-but"
                    className="btn btn-default btn-block btn-scanova-def btn-sm ng-isolate-scope"
                  >
                    Save Design
                  </button>
                </div>
                <div className="col-sm-3 col-lg-4">
                  <button id="preview-but" className="btn btn-default btn-block btn-sm btn-scanova-def">Preview</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Wrapper>);
  }
}

CustomVisualCode.propTypes = {
  onGetCode: PropTypes.func,
};

export const mapDispatchToProps = (dispatch) => ({
  onGetCode: (data) => dispatch(actionGetQRCode(data)),
});

CustomVisualCode.propTypes = {
  handleSubmit: PropTypes.func,
  change: PropTypes.func,
};

// Decorate with redux-form
CustomVisualCode = reduxForm({ //eslint-disable-line
  form: VISUAL_CODE_FORM,
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  onChange: (values, dispatch, props) => { //eslint-disable-line
  },
})(CustomVisualCode);

// Decorate with connect to read form values
const selector = formValueSelector(VISUAL_CODE_FORM); // <-- same as form name
CustomVisualCode = connect( //eslint-disable-line
  state => { //eslint-disable-line
    // can select values individually
    const formUrl = selector(state, 'url');
    return {
      formUrl,
    };
  }
)(CustomVisualCode);

export default injectIntl(connect(undefined, mapDispatchToProps)(CustomVisualCode));
