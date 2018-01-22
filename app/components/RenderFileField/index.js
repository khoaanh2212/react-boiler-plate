import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';

export const Wrapper = styled.div`
  .file-input {
    position: relative;
    button {
      position: absolute;
      top: 3px;
      right: 3px;
      padding: 5px 12px;
      overflow: hidden;
      input {
        position: absolute;
        top: -24px;
        left: 0;
        right: 0;
        bottom: 0;
        cursor: pointer;
      }
    }
  }
`;

class RenderFileField extends Component {
  state = {
    input: '',
  }

  updateInput = (e) => {
    const { onChangeAction } = this.props;
    this.setState({
      input: e.target.files[0].name,
    });
    this.props.input.onChange(e);
    if (typeof onChangeAction === 'function') onChangeAction(e);
  }

  render() {
    const { meta: { error }, input, buttonLabel, placeholder, className } = this.props;
    return (
      <Wrapper>
        <div className="file-input">
          <input
            value={this.state.input}
            className={`${className}${error && input.value && input.value.length !== 0 ? ' err' : ''}`}
            type="text"
            readOnly
            placeholder={placeholder}
          />
          <button className="btn btn-primary">
            <input type="file" {...{ ...input, value: undefined }} onChange={this.updateInput} />
            {buttonLabel}
          </button>
        </div>
        {error && input.value && input.value.length !== 0 && <span className="err">{error}</span>}
      </Wrapper>
    );
  }
}

RenderFileField.propTypes = {
  meta: PropTypes.object,
  input: PropTypes.object,
  buttonLabel: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onChangeAction: PropTypes.func,
};

export default RenderFileField;
