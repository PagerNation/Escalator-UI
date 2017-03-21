import React from 'react';
import LoginForm from '../src/components/Login/LoginForm';
import SignupForm from '../src/components/Login/SignupForm';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

describe('Login', () => {
  it('renders LoginForm', () => {
    const component = renderer.create(<LoginForm />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  })

  it('renders SignupForm', () => {
    const component = renderer.create(<SignupForm />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  })
});
