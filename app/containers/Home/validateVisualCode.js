import { isURL, validateFile } from 'utils/common';


const validate = (values, props) => { //eslint-disable-line
  const errors = {};
  if (!values.get) {
    return errors;
  }

  const files = values.get('logo');

  if (!values.get('url')) {
    errors.url = 'required field';
  } else if (!isURL(values.get('url'))) {
    errors.url = 'invalid url';
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('email'))) {
    errors.email = 'invalid email';
  }

  if (files && !validateFile(files[0])) {
    errors.logo = 'Invalid file';
  }

  return errors;
};

export default validate;
