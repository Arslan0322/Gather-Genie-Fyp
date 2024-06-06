import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: 3,
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  status: sample(['accepted', 'rejected']),
  servicetype: sample(['EventPlanner', 'Caterer', 'Hall Owner', 'Decorator']),
}));

export default users;
