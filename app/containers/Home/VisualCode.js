import React from 'react';
import styled from 'styled-components';


import VisualCodeMainInfo from './VisualCodeMainInfo';
import CustomVisualCode from './CustomVisualCode';

export const Wrapper = styled.div`
  .custom-tab {
    .tab {
      color: #332c2c !important;
      &.active, &:hover {
        border-color: #332c2c;
        opacity: 1;
      }
    }
  }
`;

export class VisualCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  nextPage = () => {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  render() {
    const { page } = this.state;
    return (
      <div>
        {page === 1 && <VisualCodeMainInfo onSubmit={this.nextPage} />}
        {page === 2 &&
        <CustomVisualCode
          previousPage={this.previousPage}
          onSubmit={this.nextPage}
        />}
      </div>
    );
  }
}

VisualCode.propTypes = {};

export default VisualCode;
