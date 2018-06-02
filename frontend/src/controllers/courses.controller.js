import CoursesApiService from 'Api/courses.service';

export default {
  create(data) {
    return CoursesApiService.create(data);
  },
  list() {
    return CoursesApiService.list();
  },
  delete(data) {
    return CoursesApiService.delete(data);
  },
  update(id, data) {
    return CoursesApiService.update(id, data);
  },
};
