import React, { Component, PropTypes } from 'react';
import Container from './Container';

export default class DragAroundNaive extends Component {
  constructor(props) {
    super(props);
    this.handleHideSourceClick = this.handleHideSourceClick.bind(this);
    this.state = {
      hideSourceOnDrag: true,
    };
  }

  handleHideSourceClick() {
    this.setState({
      hideSourceOnDrag: !this.state.hideSourceOnDrag,
    });
  }

  render() {
    const { hideSourceOnDrag } = this.state;
    const { changePosition } = this.props;

    return (
      <Container hideSourceOnDrag={hideSourceOnDrag} changePosition={changePosition} />
      /* <div>
        <Container hideSourceOnDrag={hideSourceOnDrag} />
        <p>
          <label htmlFor="hideSourceOnDrag">
            <input
              id="hideSourceOnDrag"
              type="checkbox"
              checked={hideSourceOnDrag}
              onChange={this.handleHideSourceClick}
            />
            <small>Hide the source item while dragging</small>
          </label>
        </p>
      </div>*/
    );
  }
}

DragAroundNaive.propTypes = {
  changePosition: PropTypes.func,
};
