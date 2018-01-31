import { validateFile } from 'utils/common';
import messages from './messages';


const validate = (values, props) => { //eslint-disable-line
  const errors = {};
  const { intl: { formatMessage } } = props;
  if (!values.get) {
    return errors;
  }

  const files = values.get('logo');

  if (files && !validateFile(files[0])) {
    errors.logo = formatMessage(messages.invalidFile);
  }

  return errors;
};

export default validate;
