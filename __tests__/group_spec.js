import React from 'react';
import GroupView from '../src/routes/Group/components/GroupView';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import group from './fixtures/group_response.json';

describe('GroupView', () => {
  it('renders GroupView', () => {
    spyOn(GroupView.prototype, 'componentWillMount').and.returnValue(null);
    const component = renderer.create(<GroupView group={group}/>);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  })
});
