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
              <div className="row">
                <div className="col-lg-4 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="qrcodeVcardFirstname">Firstname</label>
                    <Field
                      id="qrcodeVcardFirstname"
                      className="form-control"
                      name="qrcodeVcardFirstname"
                      component={RenderField}
                      type="text"
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="qrcodeVcardLastname">Lastname</label>
                    <Field
                      id="qrcodeVcardLastname"
                      className="form-control"
                      name="qrcodeVcardLastname"
                      component={RenderField}
                      type="text"
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="qrcodeVcardOrganization">Organization</label>
                    <Field
                      id="qrcodeVcardOrganization"
                      className="form-control"
                      name="qrcodeVcardOrganization"
                      component={RenderField}
                      type="text"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-4 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="qrcodeVcardTitle">Position (Work)</label>
                    <Field
                      id="qrcodeVcardTitle"
                      className="form-control"
                      name="qrcodeVcardTitle"
                      component={RenderField}
                      type="text"
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="qrcodeVcardPhoneWork">Phone (Work)</label>
                    <Field
                      id="qrcodeVcardPhoneWork"
                      className="form-control"
                      name="qrcodeVcardPhoneWork"
                      component={RenderField}
                      type="number"
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="qrcodeVcardPhonePrivate">Phone (Private)</label>
                    <Field
                      id="qrcodeVcardPhonePrivate"
                      className="form-control"
                      name="qrcodeVcardPhonePrivate"
                      component={RenderField}
                      type="number"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-4 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="qrcodeVcardPhoneMobile">Phone (Mobile)</label>
                    <Field
                      id="qrcodeVcardPhoneMobile"
                      className="form-control"
                      name="qrcodeVcardPhoneMobile"
                      component={RenderField}
                      type="number"
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="qrcodeVcardFaxWork">Fax (Work)</label>
                    <Field
                      id="qrcodeVcardFaxWork"
                      className="form-control"
                      name="qrcodeVcardFaxWork"
                      component={RenderField}
                      type="number"
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="qrcodeVcardFaxPrivate">Fax (Private)</label>
                    <Field
                      id="qrcodeVcardFaxPrivate"
                      className="form-control"
                      name="qrcodeVcardFaxPrivate"
                      component={RenderField}
                      type="number"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-4 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="qrcodeVcardEmail">Email</label>
                    <Field
                      id="qrcodeVcardEmail"
                      className="form-control"
                      name="qrcodeVcardEmail"
                      component={RenderField}
                      type="text"
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="qrcodeVcardUrl">Website</label>
                    <Field
                      id="qrcodeVcardUrl"
                      className="form-control"
                      name="qrcodeVcardUrl"
                      component={RenderField}
                      type="text"
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="qrcodeVcardStreet">Street</label>
                    <Field
                      id="qrcodeVcardStreet"
                      className="form-control"
                      name="qrcodeVcardStreet"
                      component={RenderField}
                      type="text"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-4 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="qrcodeVcardZipcode">Zipcode</label>
                    <Field
                      id="qrcodeVcardZipcode"
                      className="form-control"
                      name="qrcodeVcardZipcode"
                      component={RenderField}
                      type="number"
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="qrcodeVcardCity">City</label>
                    <Field
                      id="qrcodeVcardCity"
                      className="form-control"
                      name="qrcodeVcardCity"
                      component={RenderField}
                      type="text"
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="qrcodeVcardState">State</label>
                    <Field
                      id="qrcodeVcardState"
                      className="form-control"
                      name="qrcodeVcardState"
                      component={RenderField}
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="qrcodeVcardCountry">Country</label>
                    <Field
                      id="qrcodeVcardCountry"
                      className="form-control"
                      name="qrcodeVcardCountry"
                      component={RenderField}
                      type="text"
                    />
                  </div>
                </div>
              </div>
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
