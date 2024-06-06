import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const payments = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  vendorname: faker.name.fullName(),
  clientname: faker.name.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  serviceprice: faker.random.numeric(),
  status: sample(['accepted', 'rejected']),
  servicetype: sample(['EventPlanner', 'Caterer', 'Hall Owner', 'Decorator']),
}));

export default payments;
