import ClassroomsApiService from 'Api/classrooms.service';

export default {
  create(data) {
    return ClassroomsApiService.create(data);
  },
};
