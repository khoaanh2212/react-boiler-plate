import React from 'react';
import { shallow } from 'enzyme';

import RenderField, { checkLimitLines } from '../index';

describe('<RenderField />', () => {
  it('should call onChangeAction if we passed into component', () => {
    const onChangeAction = jest.fn();
    const onChange = jest.fn();
    const renderedComponent = shallow(<RenderField
      onChangeAction={onChangeAction} input={{ onChange }}
      meta={{ touched: false }}
    />);
    renderedComponent.find('input').simulate('change', { target: {} });
    expect(onChange).toHaveBeenCalled();
    expect(onChangeAction).toHaveBeenCalled();
  });

  it('should call only onChange in onChangeAction is not function', () => {
    const onChange = jest.fn();
    const renderedComponent = shallow(<RenderField
      input={{ onChange }}
      meta={{ touched: false }}
    />);
    renderedComponent.find('input').simulate('change', { target: {} });
    expect(onChange).toHaveBeenCalled();
  });

  it('should show error if ontouch and has error', () => {
    const onChange = jest.fn();
    const renderedComponent = shallow(<RenderField
      input={{ onChange }}
      meta={{ touched: true, error: 'error' }}
    />);
    expect(renderedComponent.find('span.err').length).toEqual(1);
  });

  it('should show error if ontouch and has error', () => {
    const onChange = jest.fn();
    const renderedComponent = shallow(<RenderField
      input={{ onChange }}
      meta={{ touched: false, error: null }}
    />);
    expect(renderedComponent.find('span.error').length).toEqual(0);
  });

  it('should call both onChangeAction & onChange upon change event for textarea', () => {
    const onChangeSpy = jest.fn();
    const onChangeActionSpy = jest.fn();
    const component = shallow(
      <RenderField
        meta={{ touched: false }}
        textarea input={{ onChange: onChangeSpy }}
        onChangeAction={onChangeActionSpy}
      />
    );
    component.find('textarea').simulate('change', { target: { value: '' } });
    expect(onChangeSpy).toHaveBeenCalled();
    expect(onChangeActionSpy).toHaveBeenCalled();
  });

  describe('checkLimitLines func', () => {
    it('should return true if the line limit is not exceeded', () => {
      expect(checkLimitLines({ target: { value: '' } }, 2)).toBeTruthy();
    });

    it('should return false upon exceeding or equaling the line limit', () => {
      const e = Object.assign(Object.create({
        preventDefault: jest.fn(),
      }), {
        keyCode: 13,
        target: { value: '\n' },
      });
      expect(checkLimitLines(e, 2)).toBeFalsy();
    });
  });
});
