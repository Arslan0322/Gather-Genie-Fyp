import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  servicename: faker.name.fullName(),
  clientname: faker.name.fullName(),
  ratings: faker.random.numeric(),
  comments: faker.lorem.sentences(),
  status: sample(['accepted', 'rejected']),
  servicetype: sample(['EventPlanner', 'Caterer', 'Hall Owner', 'Decorator']),
}));

export default users;
