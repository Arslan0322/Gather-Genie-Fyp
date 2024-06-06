import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: 3,
  name: faker.name.fullName(),
  city: faker.address.cityName(),
  price: faker.random.numeric(),
}));

export default users;
