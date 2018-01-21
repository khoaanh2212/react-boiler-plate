import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form/immutable';

import RenderField from 'components/RenderField';


import validate from './validateVisualCode';

export const Wrapper = styled.div``;
const FORM_NAME = 'VISUAL_CODE_FORM';

export class VisualCode extends React.Component { //eslint-disable-line

  onSubmit = (values) => {
    console.log(values.toJS());
  };

  render() {
    const { handleSubmit, valid, pristine } = this.props;
    return (
      <Wrapper>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div className="pane-content">
            <div className="form-group">
              <label className="text-bold" htmlFor="url">URL:</label>
              <Field
                id="url"
                className="form-control"
                name="url"
                component={RenderField}
                type="text"
              />
            </div>
            <div className="form-group">
              <label className="text-bold" htmlFor="text">Text:</label>
              <Field
                id="text"
                className="form-control"
                name="text"
                component={RenderField}
                type="text"
              />
            </div>
            <div className="form-group">
              <label className="text-bold" htmlFor="email">Email:</label>
              <Field
                id="email"
                className="form-control"
                name="email"
                component={RenderField}
                type="text"
              />
            </div>
            <div className="form-group">
              <label className="text-bold" htmlFor="phone">Phone:</label>
              <Field
                id="phone"
                className="form-control"
                name="phone"
                component={RenderField}
                type="number"
              />
            </div>
            <div className="form-group">
              <label className="text-bold" htmlFor="VCard">Vcard:</label>
              <Field
                id="VCard"
                className="form-control"
                name="VCard"
                component={RenderField}
                type="text"
              />
            </div>
            <div className="form-action col-md-12 row group-btn-right">
              <button
                disabled={!valid || pristine}
                className={`btn btn-success m-r-5 ${!valid || pristine ? 'disabled' : ''}`} type="submit"
              >
                Create
              </button>
              <button
                type="button"
                className="btn btn-inverse"
                onClick={() => this.closeModal()}
              >
                Cancel
              </button>
            </div>

          </div>
        </form>
      </Wrapper>
    );
  }
}

VisualCode.propTypes = {
  handleSubmit: PropTypes.func,
  valid: PropTypes.bool,
  pristine: PropTypes.bool,
};

export default reduxForm({
  form: FORM_NAME,
  validate,
})(VisualCode);
