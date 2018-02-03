import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';

import RenderColorPicker from 'components/RenderColorPicker';
import RenderFileField from 'components/RenderFileField';

import instagramLogo from './Images/instagram-circle.svg';
import facebookLogo from './Images/facebook-circle.svg';
import twitterLogo from './Images/twitter-circle.svg';
import messages from './messages';

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

const FORM_NAME = 'LOGO_CODE_FORM';
const SINGLE_COLOR = 'SINGLE_COLOR';
const GRADIENT_COLOR = 'GRADIENT_COLOR';

export class LogoCode extends React.Component { //eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      logoPreview: null,
      indexImage: 0,
      left: 0,
      top: 0,
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
        logoPreview: reader.result,
        indexImage: this.state.indexImage + 1,
      });
    };
    reader.readAsDataURL(file);
    this.drawImageInCanvas(e);
  }

  switchGradientColor = () => {
    const { change, formFirstColor, formSecondColor } = this.props;
    change('firstColor', formSecondColor);
    change('secondColor', formFirstColor);
  }

  switchEyeColor = () => {
    const { change, formEyeFirstColor, formEyeSecondColor } = this.props;
    change('eyeFirstColor', formEyeSecondColor);
    change('eyeSecondColor', formEyeFirstColor);
  }

  copyForeGround = () => {
    const { change, formFirstColor, formSecondColor, formColorType } = this.props;
    if (formColorType === SINGLE_COLOR) {
      change('eyeFirstColor', formFirstColor);
      change('eyeSecondColor', formFirstColor);
    } else {
      change('eyeFirstColor', formFirstColor);
      change('eyeSecondColor', formSecondColor);
    }
  }

  removeLogo = (e) => {
    e.preventDefault();
    this.setState({ logoPreview: null });
    this.props.change('logo', null);
  }

  chooseExampleLogo = (e, logo) => {
    e.preventDefault();
    this.setState({ logoPreview: logo });
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
        const { top, left } = me.state;
        ctx.drawImage(this, left, top, 150, 150);
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
    const { handleSubmit, formColorType, formCustomEyeColor, intl: { formatMessage } } = this.props;
    const { logoPreview } = this.state;
    return (<Wrapper>
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div className="form-group ">
          <div className="form-check-inline color-group">
            <label htmlFor="colorType" className="form-check-label">
              <Field
                name="colorType"
                component="input"
                type="radio"
                value={SINGLE_COLOR}
              />{' '}
              <FormattedMessage {...messages.singleColor} />
            </label>
            <label htmlFor="colorType" className="form-check-label">
              <Field
                name="colorType"
                component="input"
                type="radio"
                value={GRADIENT_COLOR}
              />{' '}
              <FormattedMessage {...messages.colorGradient} />
            </label>
            <label htmlFor="customEyeColor" className="form-check-label">
              <Field
                name="customEyeColor"
                id="customEyeColor"
                component="input"
                type="checkbox"
              />{' '}<FormattedMessage {...messages.customEyeColor} /></label>
          </div>
        </div>
        <div className="form-group foreground-color row">
          <div className="col-sm-6 col-lg-4">
            <Field
              id="firstColor"
              className="form-control "
              name="firstColor"
              component={RenderColorPicker}
              type="text"
            />
          </div>
          <div className={`col-sm-6 col-lg-4 ${formColorType === SINGLE_COLOR && 'hidden'}`}>
            <Field
              id="secondColor"
              className="form-control"
              name="secondColor"
              component={RenderColorPicker}
              type="text"
            />
          </div>
          <div className={`col-sm-6 col-lg-4 form-group ${formColorType === SINGLE_COLOR && 'hidden'}`}>
            <div className="input-group">
              <span className="input-group-btn">
                <button className="btn btn-swap" type="button" onClick={() => this.switchGradientColor()}>
                  <i className="fa fa-exchange"></i>
                </button>
              </span>
              <Field name="gradientType" component="select" placeholder={formatMessage(messages.pleaseSelect)}>
                <option value="linear"><FormattedMessage {...messages.linearGradient} /></option>
                <option value="radial"><FormattedMessage {...messages.radialGradient} /></option>
              </Field>
            </div>

          </div>
        </div>
        <div className={`${!formCustomEyeColor && 'hidden'}`}>
          <div className={`form-group eye-color row ${!formCustomEyeColor && 'hidden'}`}>
            <label className="text-bold ml-1" htmlFor="eyeColor"><FormattedMessage {...messages.eyeColor} /></label>
            <div className="flex">
              <div className="col-sm-6 col-lg-4">
                <Field
                  id="eyeFirstColor"
                  className="form-control "
                  name="eyeFirstColor"
                  component={RenderColorPicker}
                  type="text"
                />
              </div>
              <div className="col-sm-6 col-lg-4">
                <Field
                  id="eyeSecondColor"
                  className="form-control"
                  name="eyeSecondColor"
                  component={RenderColorPicker}
                  type="text"
                />
              </div>
              <div className="col-sm-6 col-lg-4 form-group">
                <div className="input-group">
                  <span className="input-group-btn">
                    <button className="btn btn-swap" type="button" onClick={() => this.switchEyeColor()}>
                      <i className="fa fa-exchange"></i>
                    </button>
                  </span>
                  <span className="input-group-btn copy-foreground">
                    <button className="btn btn-swap" type="button" onClick={() => this.copyForeGround()}>
                      <FormattedMessage {...messages.copyForeground} />
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-6 col-lg-4 form-group">
            <label className="text-bold" htmlFor="background"><FormattedMessage {...messages.background} /></label>
            <Field
              id="background"
              className="form-control"
              name="background"
              component={RenderColorPicker}
              defaultValue={'#000000'}
            />
          </div>
        </div>
        <div className="flex-row form-group">
          <div className="logo-preview">
            <img
              className={`${!logoPreview && 'hidden'}`} src={logoPreview || ''}
              style={{ width: '100%', height: '100%' }} alt=""
            />
            <div className={`placeholder ${logoPreview && 'hidden'}`}>
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
          <div className="shape-options">
            <button className="shape" onClick={(e) => this.chooseExampleLogo(e, facebookLogo)}>
              <img src={facebookLogo} alt="facebook logo" />
            </button>
            <button className="shape" onClick={(e) => this.chooseExampleLogo(e, twitterLogo)}>
              <img src={twitterLogo} alt="twitter logo" />
            </button>
            <button className="shape" onClick={(e) => this.chooseExampleLogo(e, instagramLogo)}>
              <img src={instagramLogo} alt="instagram logo" />
            </button>

          </div>
        </div>
      </form>
    </Wrapper>);
  }
}

LogoCode.propTypes = {
  handleSubmit: PropTypes.func,
  formColorType: PropTypes.string,
  change: PropTypes.func,
  formFirstColor: PropTypes.string,
  formSecondColor: PropTypes.string,
  formEyeFirstColor: PropTypes.string,
  formEyeSecondColor: PropTypes.string,
  formCustomEyeColor: PropTypes.bool,
  intl: PropTypes.object,
};

// Decorate with redux-form
LogoCode = reduxForm({ //eslint-disable-line
  form: FORM_NAME,
  onChange: (values, dispatch, props) => { //eslint-disable-line
  },
})(LogoCode);

// Decorate with connect to read form values
const selector = formValueSelector(FORM_NAME); // <-- same as form name
LogoCode = connect( //eslint-disable-line
  state => { //eslint-disable-line
    // can select values individually
    const formCustomEyeColor = selector(state, 'customEyeColor');
    const formColorType = selector(state, 'colorType');
    const formFirstColor = selector(state, 'firstColor');
    const formSecondColor = selector(state, 'secondColor');
    const formEyeFirstColor = selector(state, 'eyeFirstColor');
    const formEyeSecondColor = selector(state, 'eyeSecondColor');
    return {
      formCustomEyeColor,
      formColorType,
      formFirstColor,
      formSecondColor,
      formEyeFirstColor,
      formEyeSecondColor,
    };
  }
)(LogoCode);

export default injectIntl(LogoCode);
