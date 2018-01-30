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
    display: flex;
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

  onSubmit = (values) => {
    console.log(values.toJS());
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
      console.log(maxWidth, newHeight);
      me.setState({ canvasWidth: maxWidth, canvasHeight: newHeight });
      if (me.state.indexImage === 1) {
        ctx.drawImage(this, 0, 0, maxWidth, newHeight);
      } else {
        // ctx.globalAlpha = 0.8;
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
          <div className="col-md-4 designer-options">
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
                <div>
                  <div className="form-group">
                    <Field
                      className="form-control hidden"
                      id="background"
                      name="background"
                      component={RenderFileField}
                      buttonLabel={'Upload Image'}
                      onChangeAction={this.onUploadBackgroundChange}
                    />
                    <button className="btn btn-default" onClick={(e) => this.removeBackground(e)}>
                      <FormattedMessage {...messages.removeLogo} />
                    </button>
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
          <div className="col-md-8 designer-options">
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
                    style={{ background: '#ddd' }}
                    bounds="parent"
                    default={{
                      x: 0,
                      y: 0,
                      width: 100,
                      height: 100,
                    }}
                    onDragStop={(e, d) => {
                      this.setState({ x: d.x, y: d.y });
                    }}
                    onResize={(e, direction, ref, delta, position) => {
                      console.log(position);
                      this.setState({
                        width: ref.offsetWidth,
                        height: ref.offsetHeight,
                        ...position,
                      });
                    }}
                  >
                    Choose position for QRCode
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

export default injectIntl(CustomVisualCode);
