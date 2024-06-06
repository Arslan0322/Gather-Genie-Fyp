import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const services = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  servicename: faker.name.fullName(),
  serviceprice: faker.random.numeric(),
  description: faker.lorem.sentence(),
  status: sample(['accepted', 'rejected']),
  servicetype: sample(['EventPlanner', 'Caterer', 'Hall Owner', 'Decorator']),
}));

export default services;
