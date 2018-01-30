import { isURL } from 'utils/common';
import messages from './messages';


const validate = (values, props) => { //eslint-disable-line
  const errors = {};
  const { intl: { formatMessage } } = props;
  if (!values.get) {
    return errors;
  }


  if (!values.get('url')) {
    errors.url = formatMessage(messages.requireField);
  } else if (!isURL(values.get('url'))) {
    errors.url = formatMessage(messages.invalidUrl);
  }

  if (values.get('email') && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('email'))) {
    errors.email = formatMessage(messages.invalidEmail);
  }

  return errors;
};

export default validate;
