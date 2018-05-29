const state = {
  tabs: [
    'classroom',
    'subject',
    'course',
    'software',
  ],
  headers: {
    'classroom': [
      { text: 'Label', value: 'label' },
      { text: 'Description', value: 'description' },
      { text: 'Capacity', value: 'capacity' },
      { text: 'Projector', value: 'projector' },
      { text: 'Board', value: 'board' },
      { text: 'Smart board', value: 'smartBoard' },
      { text: 'Operating system', value: 'os' },
      { text: 'Software', value: 'software' },
    ], 'subject': [
      { text: 'Label', value: 'label' },
      { text: 'Title', value: 'title' },
      { text: 'Course', value: 'course' },
      { text: 'Description', value: 'description' },
      { text: 'Group size', value: 'groupSize' },
      { text: 'Min duration', value: 'duration' },
      { text: 'Lessons', value: 'lessons' },
      { text: 'Projector', value: 'projector' },
      { text: 'Board', value: 'board' },
      { text: 'Smart board', value: 'smartBoard' },
      { text: 'Operating system', value: 'os' },
      { text: 'Software', value: 'software' },
    ], 'course': [
      { text: 'Label', value: 'label' },
      { text: 'Title', value: 'title' },
      { text: 'Description', value: 'description' },
      { text: 'Date', value: 'date' },
    ], 'software': [
      { text: 'Label', value: 'label' },
      { text: 'Title', value: 'title' },
      { text: 'Operating system', value: 'os' },
      { text: 'Manufacturer', value: 'manufacturer' },
      { text: 'Site', value: 'site' },
      { text: 'Publication year', value: 'year' },
      { text: 'Price', value: 'price' },
      { text: 'Description', value: 'description' },
    ],
  },
};

const getters = {
  headers: (state) => state.headers,
  tabs: (state) => state.tabs,
};

export {
  state,
  getters,
};
