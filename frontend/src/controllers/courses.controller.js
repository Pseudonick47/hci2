import CoursesApiService from 'Api/courses.service';

export default {
  create(data) {
    return CoursesApiService.create(data);
  },
  list() {
    return CoursesApiService.list();
  },
};
