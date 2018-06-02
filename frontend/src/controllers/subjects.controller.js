import SubjectsApiService from 'Api/subjects.service';

export default {
  create(data) {
    return SubjectsApiService.create(data);
  },
  list() {
    return SubjectsApiService.list();
  },
  delete(data) {
    return SubjectsApiService.delete(data);
  },
  update(id, data) {
    return SubjectsApiService.update(id, data);
  },
};
