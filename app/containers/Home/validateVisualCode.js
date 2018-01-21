import { isURL } from 'utils/common';


const validate = (values, props) => { //eslint-disable-line
  const errors = {};
  if (!values.get) {
    return errors;
  }

  if (!values.get('url')) {
    errors.url = 'required field';
  } else if (!isURL(values.get('url'))) {
    errors.url = 'invalid url';
  }

  return errors;
};

export default validate;
