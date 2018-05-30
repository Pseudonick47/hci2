import SoftwareApiService from 'Api/software.service';

export default {
  create(data) {
    return SoftwareApiService.create(data);
  },
};
