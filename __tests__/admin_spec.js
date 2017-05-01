import React from 'react';
import AdminView from '../src/routes/Group/components/admin/AdminView';
import renderer from 'react-test-renderer';
import timezone_mock from 'timezone-mock';

import group from './fixtures/group_response.json';
import user from './fixtures/user.json';
import tickets from './fixtures/tickets.json'

describe('AdminView', () => {
  it('renders AdminView', () => {
    timezone_mock.register('US/Eastern');
    group.admins.push(user._id);
    const component = renderer.create(<AdminView group={group} user={user} />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  })
});

