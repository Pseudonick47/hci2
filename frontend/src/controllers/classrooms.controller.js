import ClassroomsApiService from 'Api/classrooms.service';

export default {
  create(data) {
    return ClassroomsApiService.create(data);
  },
  list() {
    return ClassroomsApiService.list();
  },
  delete(data) {
    return ClassroomsApiService.delete(data);
  },
  update(id, data) {
    return ClassroomsApiService.update(id, data);
  },
};
