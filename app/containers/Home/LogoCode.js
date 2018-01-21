import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';

import RenderColorPicker from 'components/RenderColorPicker';

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
  
`;

const FORM_NAME = 'LOGO_CODE_FORM';
const SINGLE_COLOR = 'SINGLE_COLOR';
const GRADIENT_COLOR = 'GRADIENT_COLOR';

export class LogoCode extends React.Component { //eslint-disable-line

  onSubmit = (values) => {
    console.log(values.toJS());
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

  render() {
    const { handleSubmit, formColorType, formCustomEyeColor } = this.props;
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
            <label htmlFor="customEyeColor" className="form-check-label"><Field
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
