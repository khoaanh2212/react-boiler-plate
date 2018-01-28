import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';
import { Link } from 'react-router';

import RenderField from 'components/RenderField';


import validate from './validateVisualCode';
import messages from './messages';

export const Wrapper = styled.div`
  .custom-tab {
    .tab {
      color: #332c2c !important;
      &.active, &:hover {
        border-color: #332c2c;
        opacity: 1;
      }
    }
  }
`;
const FORM_NAME = 'VISUAL_CODE_FORM';
const URL_TAB = 'URL_TAB';
const TEXT_TAB = 'TEXT_TAB';
const EMAIL_TAB = 'EMAIL_TAB';
const PHONE_TAB = 'PHONE_TAB';
const V_CARD_TAB = 'V_CARD_TAB';

export class VisualCode extends React.Component { //eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      activeTab: URL_TAB,
    };
  }

  onSubmit = (values) => {
    console.log(values.toJS());
  };

  toggleTab = (tab) => {
    this.setState({ activeTab: tab });
  }

  render() {
    const { handleSubmit, valid, pristine } = this.props;
    const { activeTab } = this.state;
    return (
      <Wrapper>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div className="type-bar-inner custom-tab">
            <Link
              className={`tab ${activeTab === URL_TAB && 'active'}`}
              onClick={() => this.toggleTab(URL_TAB)}
            ><FormattedMessage {...messages.yourUrl} /></Link>
            <Link
              className={`tab ${activeTab === TEXT_TAB && 'active'}`}
              onClick={() => this.toggleTab(TEXT_TAB)}
            ><FormattedMessage {...messages.text} /></Link>
            <Link
              className={`tab ${activeTab === EMAIL_TAB && 'active'}`}
              onClick={() => this.toggleTab(EMAIL_TAB)}
            ><FormattedMessage {...messages.email} /></Link>
            <Link
              className={`tab ${activeTab === PHONE_TAB && 'active'}`}
              onClick={() => this.toggleTab(PHONE_TAB)}
            ><FormattedMessage {...messages.phone} /></Link>
            <Link
              className={`tab ${activeTab === V_CARD_TAB && 'active'}`}
              onClick={() => this.toggleTab(V_CARD_TAB)}
            ><FormattedMessage {...messages.vCard} /></Link>
          </div>
          <div className="pane-content">
            <div className={`form-group ${activeTab !== URL_TAB && 'hidden'}`}>
              <label className="text-bold" htmlFor="url"><FormattedMessage {...messages.url} /></label>
              <Field
                id="url"
                className="form-control"
                name="url"
                component={RenderField}
                type="text"
              />
            </div>
            <div className={`form-group ${activeTab !== TEXT_TAB && 'hidden'}`}>
              <label className="text-bold" htmlFor="text"><FormattedMessage {...messages.text} /></label>
              <Field
                id="text"
                className="form-control"
                name="text"
                component={RenderField}
                type="text"
              />
            </div>
            <div className={`form-group ${activeTab !== EMAIL_TAB && 'hidden'}`}>
              <label className="text-bold" htmlFor="email"><FormattedMessage {...messages.email} /></label>
              <Field
                id="email"
                className="form-control"
                name="email"
                component={RenderField}
                type="text"
              />
            </div>
            <div className={`form-group ${activeTab !== PHONE_TAB && 'hidden'}`}>
              <label className="text-bold" htmlFor="phone"><FormattedMessage {...messages.phone} /></label>
              <Field
                id="phone"
                className="form-control"
                name="phone"
                component={RenderField}
                type="number"
              />
            </div>
            <div className={`form-group ${activeTab !== V_CARD_TAB && 'hidden'}`}>
              <div className="row">
                <div className="col-lg-4 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="qrcodeVcardFirstname"><FormattedMessage {...messages.firstName} /></label>
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
                    <label htmlFor="qrcodeVcardLastname"><FormattedMessage {...messages.lastName} /></label>
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
                    <label htmlFor="qrcodeVcardOrganization"><FormattedMessage {...messages.organization} /></label>
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
                    <label htmlFor="qrcodeVcardTitle"><FormattedMessage {...messages.positionWork} /></label>
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
                    <label htmlFor="qrcodeVcardPhoneWork"><FormattedMessage {...messages.phoneWork} /></label>
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
                    <label htmlFor="qrcodeVcardPhonePrivate"><FormattedMessage {...messages.phonePrivate} /></label>
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
                    <label htmlFor="qrcodeVcardPhoneMobile"><FormattedMessage {...messages.phoneMobile} /></label>
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
                    <label htmlFor="qrcodeVcardFaxWork"><FormattedMessage {...messages.faxWork} /></label>
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
                    <label htmlFor="qrcodeVcardFaxPrivate"><FormattedMessage {...messages.faxPrivate} /></label>
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
                    <label htmlFor="qrcodeVcardEmail"><FormattedMessage {...messages.email} /></label>
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
                    <label htmlFor="qrcodeVcardUrl"><FormattedMessage {...messages.website} /></label>
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
                    <label htmlFor="qrcodeVcardStreet"><FormattedMessage {...messages.street} /></label>
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
                    <label htmlFor="qrcodeVcardZipcode"><FormattedMessage {...messages.zipcode} /></label>
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
                    <label htmlFor="qrcodeVcardCity"><FormattedMessage {...messages.city} /></label>
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
                    <label htmlFor="qrcodeVcardState"><FormattedMessage {...messages.state} /></label>
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
                    <label htmlFor="qrcodeVcardCountry"><FormattedMessage {...messages.country} /></label>
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
                <FormattedMessage {...messages.create} />
              </button>
              <button
                type="button"
                className="btn btn-inverse"
                onClick={() => this.closeModal()}
              >
                <FormattedMessage {...messages.cancel} />
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

export default injectIntl(reduxForm({
  form: FORM_NAME,
  validate,
})(VisualCode));
