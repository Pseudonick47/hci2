import ScheduleApiService from 'Api/schedule.service';

export default {
  create(data) {
    return ScheduleApiService.create(data);
  },
  list() {
    return ScheduleApiService.list();
  },
  delete(data) {
    return ScheduleApiService.delete(data);
  },
  update(id, data) {
    return ScheduleApiService.update(id, data);
  },
};
