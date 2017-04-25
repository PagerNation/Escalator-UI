import React from 'react';
import GroupView from '../src/routes/Group/components/GroupView';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import timezone_mock from 'timezone-mock';

import group from './fixtures/group_response.json';
import user from './fixtures/user.json';
import tickets from './fixtures/tickets.json'

describe('GroupView', () => {
  it('renders GroupView', () => {
    timezone_mock.register('US/Eastern');
    spyOn(GroupView.prototype, 'componentWillMount').and.returnValue(null);
    const component = renderer.create(<GroupView group={group} user={user} tickets={tickets}/>);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  })
});
