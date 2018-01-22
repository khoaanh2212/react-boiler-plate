import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';

import RenderColorPicker from 'components/RenderColorPicker';
import RenderFileField from 'components/RenderFileField';

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
  
`;

const FORM_NAME = 'LOGO_CODE_FORM';
const SINGLE_COLOR = 'SINGLE_COLOR';
const GRADIENT_COLOR = 'GRADIENT_COLOR';

export class LogoCode extends React.Component { //eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      logoPreview: null,
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
      });
    };
    reader.readAsDataURL(file);
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

  render() {
    const { handleSubmit, formColorType, formCustomEyeColor } = this.props;
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
              Single color
            </label>
            <label htmlFor="colorType" className="form-check-label">
              <Field
                name="colorType"
                component="input"
                type="radio"
                value={GRADIENT_COLOR}
              />{' '}
              Color gradient
            </label>
            <label htmlFor="customEyeColor" className="form-check-label">
              <Field
                name="customEyeColor"
                id="customEyeColor"
                component="input"
                type="checkbox"
              />{' '} Custom Eye Color</label>
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
              <Field name="gradientType" component="select" placeholder="please select">
                <option value="linear">Linear Gradient</option>
                <option value="radial">Radial Gradient</option>
              </Field>
            </div>

          </div>
        </div>
        <div className={`form-group eye-color row ${!formCustomEyeColor && 'hidden'}`}>
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
                  Copy foreground
                </button>
              </span>
            </div>

          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-6 col-lg-4 form-group">
            <label className="text-bold" htmlFor="background">Background</label>
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
              <span>No Logo</span>
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
              {/* <div className="btn btn-primary btn-upload">
                Upload Image
              </div>*/}
              <Field
                className="form-control hidden"
                id="logo"
                name="logo"
                component={RenderFileField}
                buttonLabel={'Upload Image'}
                onChangeAction={this.onUploadLogoChange}
              />
              <button className="btn btn-default" onClick={(e) => this.removeLogo(e)}>
                Remove Logo
              </button>
            </div>
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

export default LogoCode;
