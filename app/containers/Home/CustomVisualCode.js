import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';
import Rnd from 'react-rnd';

import RenderFileField from 'components/RenderFileField';

import messages from './messages';
import { VISUAL_CODE_FORM } from './constants';
// import Naive from './Naive';

export const Wrapper = styled.div`
  .color-group {
    // display: flex;
    .form-check-label {
      cursor: pointer;
      font-weight: 400;
      padding-left: 0;
      margin-right: 0.75rem;
    }
  }
  .col-sm-6 {
    padding-left: 4px;
    padding-right: 4px;
  }
  select, .btn-swap {
    font-size: 13px;
    line-height: 20px;
    background: #fff;
  }
  select , .copy-foreground {
    width: 100%;
    .btn-swap {
      width: 100%;
    }
  }
  
  .block-color {
    margin-bottom: 5px;
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
  
  .shape-options {
    margin-left: -10px;
    display: flex;
    .shape {
      transition: all .3s;
      cursor: pointer;
      padding: 6px;
      width: 60px;
      height: 60px;
      border: 3px solid transparent;
      margin: 0 8px 8px 0;
      background: #fff;
      border-radius: .25rem;
      float: left;
      opacity: .99;
      display: flex;
      align-items: center;
      justify-content: center;
      .sprite-logo {
        background-repeat: no-repeat;
        display: block;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
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
    };
  }

  onSubmit = (values) => {
    console.log(values.toJS());
  }

  onUploadLogoChange = (e) => {
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

  removeLogo = (e) => {
    e.preventDefault();
    this.setState({ backgroudPreview: null });
    this.props.change('logo', null);
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
    img.onload = function () {
      if (me.state.indexImage === 1) {
        ctx.drawImage(this, 0, 0, 400, 400);
      } else {
        // ctx.globalAlpha = 0.8;
        const { x, y, width, height } = me.state;
        ctx.drawImage(this, x, y, width, height);
      }

      // this line needs to go here
      const dataImg = me.refCanvas.toDataURL(); // note `me` being used here
      console.log(dataImg);
      // consider a callback to pass result to next function in chain
    };
    img.src = url;
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
            <div >
              <h4 className="title scanova-header">Background Image</h4>
              <div className="row">
                <div className="com-md-12 text-center">
                  <img role="presentation" className="posterImg" src="https://s3-eu-west-1.amazonaws.com/scanova-bucket/assets/auto_design/background/web.png" />
                </div>
                <div className="col-md-6 col-md-offset-3 text-center">
                  <a className="btn btn-block btn-scanova ng-isolate-scope">Add New Image</a>
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
            <div>
              <div className="text-center">
                <p className="">Drag to Reposition QR Code on Background Image</p>
              </div>
              <div is-loading="false">
                <div className="canvas-container">
                  <canvas id="poster-canvas" liquidsize="" width="270" height="270" className="lower-canvas"></canvas>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-4 col-lg-4">
                  <button id="preview-but" className="btn btn-default btn-block btn-sm btn-scanova-def">
                    Reposition QR Code
                  </button>
                </div>
                <div className="col-sm-5 col-lg-4">
                  <button id="preview-but" className="btn btn-default btn-block btn-scanova-def btn-sm ng-isolate-scope">
                    Save Design to My Templates
                  </button>
                </div>
                <div className="col-sm-3 col-lg-4">
                  <button id="preview-but" className="btn btn-default btn-block btn-sm btn-scanova-def">Preview</button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-8 col-sm-offset-2 col-lg-6 col-lg-offset-3">
                <div className="row">
                  <div className="col-sm-6">
                    <button className=" btn btn-block btn-scanova">
                      <i className="glyphicon glyphicon-floppy-disk button-left-icon"></i>
                      Update
                    </button>
                  </div>
                  <div className="col-sm-6">
                    <div className="btn-group btn-block">
                      <a className="btn btn-default btn-block">
                        <div>
                          <i className="glyphicon glyphicon-download-alt"></i>
                        </div>
                        <div>
                          <span className="visible-lg">Download</span>
                        </div>
                      </a>
                      <a type="button" className="btn btn-default download-drop-down">
                        <span className="caret"></span>
                        <span className="sr-only">Toggle Dropdown</span>
                      </a>
                      <ul className="dropdown-menu pull-right scanova-child-dropdown" role="menu">
                        <li>
                          <a ng-click="posterExport('png');">Export as PNG</a>
                        </li>
                        <li>
                          <a ng-click="posterExport('jpeg');">Export as JPG</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-row form-group">
          <div className="logo-preview">
            <img
              className={`${!backgroudPreview && 'hidden'}`} src={backgroudPreview || ''}
              style={{ width: '100%', height: '100%' }} alt=""
            />
            <div className={`placeholder ${backgroudPreview && 'hidden'}`}>
              <span><FormattedMessage {...messages.noLogo} /></span>
            </div>
            <div className="loading-screen">
              <span className="loader"></span>
            </div>
            <div className="upload-progress fade-animation">
              <div className="loading-bar" style={{ width: '100%' }}></div>
            </div>
          </div>
          <div>
            <div className="form-group">
              <Field
                className="form-control hidden"
                id="logo"
                name="logo"
                component={RenderFileField}
                buttonLabel={'Upload Image'}
                onChangeAction={this.onUploadLogoChange}
              />
              <button className="btn btn-default" onClick={(e) => this.removeLogo(e)}>
                <FormattedMessage {...messages.removeLogo} />
              </button>
            </div>
          </div>
        </div>
        <div className="form-group shape-group">
          <div className="cover-canvas">
            <canvas
              ref={(node) => {
                this.refCanvas = node;
              }} width={400} height={400}
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
