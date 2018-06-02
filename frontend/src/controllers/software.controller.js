import SoftwareApiService from 'Api/software.service';

export default {
  create(data) {
    return SoftwareApiService.create(data);
  },
  list() {
    return SoftwareApiService.list();
  },
  delete(data) {
    return SoftwareApiService.delete(data);
  },
  update(id, data) {
    return SoftwareApiService.update(id, data);
  },
};
