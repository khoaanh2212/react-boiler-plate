/**
 *
 * RenderColorPicker
 *
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { SketchPicker } from 'react-color';

import styled from 'styled-components';

export const Wrapper = styled.div`
  .block-color {
    display: flex;
  }
  .square-color {
    width: 41px;
  }
  .form-control[readonly]{
    background: #fff !important;
  }
  .sketch-picker {
    position: absolute;
    z-index: 8;
  }
`;

export class RenderColorPicker extends React.Component { //eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      colorCode: '#000',
      openPicker: false,
    };
  }

  componentDidMount() {
    window.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.wrapperPicker && !this.wrapperPicker.contains(event.target)) {
      this.setState({ openPicker: false });
    }
  }

  changeColor = (color) => {
    this.setState({ colorCode: color.hex });
    this.refInput.value = color.hex;
  }

  openPicker = () => {
    this.setState({ openPicker: true });
  }

  render() {
    const { input, placeholder, meta, onKeyDown } = this.props;
    const error = meta && meta.touched && meta.error;
    let className = this.props.className || 'form-control';
    if (className.indexOf('form-control') === -1) {
      className = `${className} form-control`;
    }
    return (
      <div
        ref={(node) => {
          this.wrapperPicker = node;
        }}
      >
        <Wrapper>
          <div className="block-color">
            <div className="square-color d-inline-block" style={{ background: this.state.colorCode }}></div>
            <input
              ref={(node) => {
                this.refInput = node;
              }}
              {...input}
              placeholder={placeholder}
              className={classNames({ err: error }, className)}
              onChange={(e) => {
                input.onChange(e);
              }}
              onKeyDown={(e) => {
                if (typeof onKeyDown === 'function') {
                  onKeyDown(e);
                }
              }}
              type="text"
              readOnly
              onClick={() => this.openPicker()}
            />
          </div>

          {meta.touched && meta.error && <span className="err">{meta.error}</span>}
          {this.state.openPicker &&
          <SketchPicker
            color={this.state.colorCode}
            onChangeComplete={this.changeColor}
          />}
        </Wrapper>
      </div>
    );
  }
}

RenderColorPicker.propTypes = {
  input: PropTypes.object,
  placeholder: PropTypes.string,
  meta: PropTypes.object,
  className: PropTypes.string,
  onKeyDown: PropTypes.func,
};

export default RenderColorPicker;