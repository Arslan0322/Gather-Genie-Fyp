import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const clients = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  city: faker.address.cityName(),
  status: sample(['accepted', 'rejected']),
  servicetype: sample(['EventPlanner', 'Caterer', 'Hall Owner', 'Decorator']),
}));

export default clients;
