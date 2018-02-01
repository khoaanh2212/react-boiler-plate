import React, { PropTypes } from 'react';
import { BubbleSpinLoader } from 'react-css-loaders';

const SpinLoader = ({ color = '#fff', size = 7, withoutSpinner, className }) => (
  <div className={`cover flex-center ${className}`}>
    {!withoutSpinner && <BubbleSpinLoader color={color} size={size} />}
  </div>
);

SpinLoader.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  withoutSpinner: PropTypes.bool,
  className: PropTypes.string,
};

export default SpinLoader;
