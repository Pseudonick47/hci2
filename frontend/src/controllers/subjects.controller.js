import SubjectsApiService from 'Api/subjects.service';

export default {
  create(data) {
    return SubjectsApiService.create(data);
  },
  list() {
    return SubjectsApiService.list();
  },
};
