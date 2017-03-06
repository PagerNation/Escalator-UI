import React from 'react';
import GroupView from '../src/routes/Group/components/GroupView';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

function setup(){
  const props = {
    params: {
      'groupId': 'GroupId'
    }
  }

  const enzymeWrapper = shallow(<GroupView {...props} />)

  return { props, enzymeWrapper }
}
const group = {"_id":"58a09498b73f14c7d6d645a0","name":"AudraDickinson","__v":3,"admins":[],"escalationPolicy":{"_id":"58a09498b73f14c7d6d6459e","subscribers":["58a09497b73f14c7d6d64437","58a09497b73f14c7d6d64438"],"pagingIntervalInDays":10,"rotationIntervalInDays":7},"users":[{"_id":"58a09497b73f14c7d6d64437","name":"Kelly85","email":"Elody39@hotmail.com","role":0,"__v":3,"createdAt":"2017-02-12T17:00:07.376Z","isSysAdmin":false,"delays":[1],"devices":[{"_id":"58a09498b73f14c7d6d64526","contactInformation":"5100426798","type":"phone","name":"et","__v":0,"createdAt":"2017-02-12T17:00:07.368Z"},{"_id":"58a09497b73f14c7d6d644b1","contactInformation":"Granville.Heathcote87@gmail.com","type":"email","name":"at","__v":0,"createdAt":"2017-02-12T17:00:07.368Z"}],"groups":["AudraDickinson"],"auth":null},{"_id":"58a09497b73f14c7d6d64438","name":"Demetrius.Hahn","email":"Jean.Lemke52@hotmail.com","role":0,"__v":3,"createdAt":"2017-02-12T17:00:07.376Z","isSysAdmin":false,"delays":[1],"devices":[{"_id":"58a09498b73f14c7d6d64527","contactInformation":"4674307718","type":"phone","name":"officia","__v":0,"createdAt":"2017-02-12T17:00:07.368Z"},{"_id":"58a09497b73f14c7d6d644b0","contactInformation":"Carley.Hagenes85@hotmail.com","type":"email","name":"quo","__v":0,"createdAt":"2017-02-12T17:00:07.368Z"}],"groups":["AudraDickinson"],"auth":null},{"_id":"58a09497b73f14c7d6d6443a","name":"Seth4","email":"Jovanny_Block@yahoo.com","role":0,"__v":3,"createdAt":"2017-02-12T17:00:07.376Z","isSysAdmin":false,"delays":[1],"devices":[{"_id":"58a09498b73f14c7d6d64528","contactInformation":"1913833319","type":"phone","name":"facere","__v":0,"createdAt":"2017-02-12T17:00:07.368Z"},{"_id":"58a09497b73f14c7d6d644b3","contactInformation":"Maxwell20@hotmail.com","type":"email","name":"magni","__v":0,"createdAt":"2017-02-12T17:00:07.368Z"}],"groups":["AudraDickinson"],"auth":null}]}
describe('GroupView', () => {
  it('renders GroupView', () => {
    spyOn(GroupView.prototype, 'componentWillMount').and.returnValue(null);
    const component = renderer.create(<GroupView group={group}/>);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  })
});
