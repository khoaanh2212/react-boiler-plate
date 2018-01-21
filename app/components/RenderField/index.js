/**
 *
 * RenderField
 *
 */

import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

export const Wrapper = styled.div`
  position: relative;
  .flag-icon {
    position:absolute;
    top: 7px;
    right: 7px;
  }

  .fa {
    position:absolute;
    top: 10px;
    right: 10px;
    width: 6px;
    &.left {
      left: 7px;
    }
  }
`;

export const checkLimitLines = (e, lines) => {
  if (!lines) {
    return true;
  }
  const currentLines = e.target.value.split('\n').length;
  if (e.keyCode === 13 && currentLines >= lines) {
    e.preventDefault();
    return false;
  }
  return true;
};

const RenderField = (field) => { // eslint-disable-line
  const error = field.meta.touched && field.meta.error;

  let className = field.className || 'form-control';
  if (className.indexOf('form-control') === -1) {
    className = `${className} form-control`;
  }

  return (
    <Wrapper className={`${field.wrapperClass || ''}`}>
      {field.textarea ? <textarea
        {...field.input}
        rows={field.rows}
        placeholder={field.placeholder}
        className={classNames({ err: error }, className)}
        onChange={(e) => {
          if (typeof field.onChangeAction === 'function') {
            field.onChangeAction(e.target.value);
          }
          field.input.onChange(e);
        }}
        type={field.type}
        onKeyDown={(e) => checkLimitLines(e, field.rowsLimit)}
      /> :
        <input
          {...field.input}
          placeholder={field.placeholder}
          className={classNames({ err: error }, className)}
          onChange={(e) => {
            if (typeof field.onChangeAction === 'function') {
              field.onChangeAction(e.target.value);
            }
            field.input.onChange(e);
          }}
          onKeyDown={(e) => {
            if (typeof field.onKeyDown === 'function') {
              field.onKeyDown(e);
            }
          }}
          type={field.type}
        />}
      {field.rightImage}
      {field.meta.touched && field.meta.error && <span className="err">{field.meta.error}</span>}
    </Wrapper>
  );
};

RenderField.propTypes = {
  field: React.PropTypes.object, // eslint-disable-line
};

export default RenderField;
