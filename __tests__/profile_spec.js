import React from 'react';
import DevicesView from '../src/routes/Profile/components/Devices/DevicesView';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

describe('User Profile', () => {
  it('renders ProfileView', () => {
    const component = renderer.create(<DevicesView />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  })
});
