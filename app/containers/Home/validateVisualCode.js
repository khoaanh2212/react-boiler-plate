import { isURL, validateFile } from 'utils/common';
import messages from './messages';


const validate = (values, props) => { //eslint-disable-line
  const errors = {};
  const { intl: { formatMessage } } = props;
  if (!values.get) {
    return errors;
  }

  const files = values.get('logo');

  if (!values.get('url')) {
    errors.url = formatMessage(messages.requireField);
  } else if (!isURL(values.get('url'))) {
    errors.url = formatMessage(messages.invalidUrl);
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('email'))) {
    errors.email = formatMessage(messages.invalidEmail);
  }

  if (files && !validateFile(files[0])) {
    errors.logo = formatMessage(messages.invalidFile);
  }

  return errors;
};

export default validate;
