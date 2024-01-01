import { makeId } from './idMaker'

export const invoices = [
  {
    id: makeId(6),
    due: '19 Aug 2021',
    name: 'Jensen Huang',
    email: 'alexgrim@mail.com',
    billTo: {
      street: '84 Church Way',
      city: 'Bradford',
      postCode: 'BD1 9PB',
      country: 'United Kingdom',
    },
    amount: 1800.9,
    status: 'paid',
    items: [
      {
        name: 'Banner design',
        quantity: 1,
        price: 156.41,
      },
      {
        name: 'Email design',
        quantity: 2,
        price: 426.41,
      },
    ],
    project: 'Graphics Design',
    billFrom: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom',
    },
    invoiceDate: '21 Aug 2021',
  },
  // Invoice 2 - Pending
  {
    id: makeId(6),
    due: '19 Sep 2021',
    name: 'John Doe',
    email: 'john.doe@mail.com',
    billTo: {
      street: '123 Main Street',
      city: 'New York',
      postCode: '10001',
      country: 'USA',
    },
    amount: 1200.5,
    status: 'pending',
    items: [
      {
        name: 'Website Development',
        quantity: 1,
        price: 800.25,
      },
    ],
    project: 'Web Development',
    billFrom: {
      street: '456 Tech Avenue',
      city: 'San Francisco',
      postCode: '94105',
      country: 'USA',
    },
    invoiceDate: '15 Sep 2021',
  },
  // Invoice 3 - Draft
  {
    id: makeId(6),
    due: '25 Sep 2021',
    name: 'Alice Smith',
    email: 'alice.smith@mail.com',
    billTo: {
      street: '555 Elm Street',
      city: 'Los Angeles',
      postCode: '90001',
      country: 'USA',
    },
    amount: 750.75,
    status: 'draft',
    items: [
      {
        name: 'Logo Design',
        quantity: 1,
        price: 500.5,
      },
    ],
    project: 'Brand Identity',
    billFrom: {
      street: '789 Design Avenue',
      city: 'Chicago',
      postCode: '60601',
      country: 'USA',
    },
    invoiceDate: '18 Sep 2021',
  },
  {
    id: makeId(6),
    due: '19 Aug 2021',
    name: 'Jensen Huang',
    email: 'alexgrim@mail.com',
    billTo: {
      street: '84 Church Way',
      city: 'Bradford',
      postCode: 'BD1 9PB',
      country: 'United Kingdom',
    },
    amount: 1800.9,
    status: 'paid',
    items: [
      {
        name: 'Banner design',
        quantity: 1,
        price: 156.41,
      },
      {
        name: 'Email design',
        quantity: 2,
        price: 426.41,
      },
    ],
    project: 'Graphics Design',
    billFrom: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom',
    },
    invoiceDate: '21 Aug 2021',
  },
  // Invoice 2 - Pending
  {
    id: makeId(6),
    due: '19 Sep 2021',
    name: 'John Doe',
    email: 'john.doe@mail.com',
    billTo: {
      street: '123 Main Street',
      city: 'New York',
      postCode: '10001',
      country: 'USA',
    },
    amount: 1200.5,
    status: 'pending',
    items: [
      {
        name: 'Website Development',
        quantity: 1,
        price: 800.25,
      },
    ],
    project: 'Web Development',
    billFrom: {
      street: '456 Tech Avenue',
      city: 'San Francisco',
      postCode: '94105',
      country: 'USA',
    },
    invoiceDate: '15 Sep 2021',
  },
  // Invoice 3 - Draft
  {
    id: makeId(6),
    due: '25 Sep 2021',
    name: 'Alice Smith',
    email: 'alice.smith@mail.com',
    billTo: {
      street: '555 Elm Street',
      city: 'Los Angeles',
      postCode: '90001',
      country: 'USA',
    },
    amount: 750.75,
    status: 'draft',
    items: [
      {
        name: 'Logo Design',
        quantity: 1,
        price: 500.5,
      },
    ],
    project: 'Brand Identity',
    billFrom: {
      street: '789 Design Avenue',
      city: 'Chicago',
      postCode: '60601',
      country: 'USA',
    },
    invoiceDate: '18 Sep 2021',
  },
  // Invoice 4 - Paid
  {
    id: makeId(6),
    due: '10 Oct 2021',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@mail.com',
    billTo: {
      street: '321 Pine Street',
      city: 'Toronto',
      postCode: 'M5V 2E1',
      country: 'Canada',
    },
    amount: 2200.2,
    status: 'paid',
    items: [
      {
        name: 'Print Design',
        quantity: 1,
        price: 1800.0,
      },
      {
        name: 'Brochure Design',
        quantity: 2,
        price: 200.2,
      },
    ],
    project: 'Print Marketing',
    billFrom: {
      street: '456 Print Avenue',
      city: 'Vancouver',
      postCode: 'V6B 1P1',
      country: 'Canada',
    },
    invoiceDate: '5 Oct 2021',
  },
  // Invoice 5 - Pending
  {
    id: makeId(6),
    due: '15 Oct 2021',
    name: 'Robert Miller',
    email: 'robert.miller@mail.com',
    billTo: {
      street: '876 Oak Lane',
      city: 'Sydney',
      postCode: '2000',
      country: 'Australia',
    },
    amount: 950.8,
    status: 'pending',
    items: [
      {
        name: 'Social Media Graphics',
        quantity: 3,
        price: 300.6,
      },
      {
        name: 'Banner Ads',
        quantity: 1,
        price: 250.2,
      },
    ],
    project: 'Digital Marketing',
    billFrom: {
      street: '123 Marketing Street',
      city: 'Melbourne',
      postCode: '3000',
      country: 'Australia',
    },
    invoiceDate: '8 Oct 2021',
  },
  // Invoice 6 - Draft
  {
    id: makeId(6),
    due: '20 Oct 2021',
    name: 'Emma Turner',
    email: 'emma.turner@mail.com',
    billTo: {
      street: '432 Birch Avenue',
      city: 'Berlin',
      postCode: '10115',
      country: 'Germany',
    },
    amount: 600.3,
    status: 'draft',
    items: [
      {
        name: 'Website Mockup',
        quantity: 2,
        price: 300.15,
      },
    ],
    project: 'Web Design',
    billFrom: {
      street: '567 Design Street',
      city: 'Munich',
      postCode: '80331',
      country: 'Germany',
    },
    invoiceDate: '15 Oct 2021',
  },
  // Invoice 7 - Paid
  {
    id: makeId(6),
    due: '25 Oct 2021',
    name: 'Daniel Brown',
    email: 'daniel.brown@mail.com',
    billTo: {
      street: '789 Maple Lane',
      city: 'Paris',
      postCode: '75001',
      country: 'France',
    },
    amount: 1300.4,
    status: 'paid',
    items: [
      {
        name: 'Illustration',
        quantity: 2,
        price: 650.2,
      },
    ],
    project: 'Digital Art',
    billFrom: {
      street: '910 Art Avenue',
      city: 'Nice',
      postCode: '06300',
      country: 'France',
    },
    invoiceDate: '18 Oct 2021',
  },
]
