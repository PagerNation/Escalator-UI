import React from 'react';
import GroupIndex from '../src/routes/Group/index';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

GroupView = GroupIndex().getComponent();
function setup(){
  const props = {
    params: {
      'groupId': 'GroupId'
    }
  }

  const enzymeWrapper = shallow(<GroupView {...props} />)

  return { props, enzymeWrapper }
}

describe('GroupView', () => {
  it('renders GroupView', () => {
    const {enzymeWrapper } = setup()
    const component = renderer.create(<GroupView />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  })
});
