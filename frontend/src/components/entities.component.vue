<template>
  <div>
    <v-tabs
      slot="extension"
      v-model="tab"
      grow
    >
      <v-tabs-slider></v-tabs-slider>
      <v-tab
        v-for="item in tabs"
        :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabs" :key="item">
        <v-layout row>
          <v-flex sm4>
            <classroom-form v-if="item=='classroom'"></classroom-form>
            <subject-form v-if="item=='subject'"></subject-form>
            <software-form v-if="item=='software'"></software-form>
            <course-form v-if="item=='course'"></course-form>
          </v-flex>
          <v-flex
            sm7
            offset-sm1
          >
            <v-card flat>
              <Table
                :headers="getHeaders(item)"
                :title="item"
                :data="data[item]"
              ></Table>
            </v-card>
          </v-flex>
        </v-layout>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import Table from 'Components/table.component';
import ClassroomForm from 'Components/forms/ClassroomForm.component';
import SubjectForm from 'Components/forms/SubjectForm.component';
import SoftwareForm from 'Components/forms/SoftwareForm.component';
import CourseForm from 'Components/forms/CourseForm.component';
import { mapGetters } from 'vuex';

export default {
  components: { Table, ClassroomForm, SubjectForm, SoftwareForm, CourseForm },
  data () {
    return {
      tab: null,
      data: {
        classroom: [
          { label: 'jen' },
          { label: 'dva' },
        ],
        subject: [
          { label: 'tri' },
          { label: 'cetri' },
        ],
        course: [
          { label: 'pet' },
          { label: 'ses' },
        ],
        software: [
          { label: 'sedam' },
          { label: 'osam' },
        ],
      },
    };
  },
  computed: {
    ...mapGetters([
      'headers',
      'tabs',
    ]),
  },
  methods: {
    getHeaders(entity) {
      return this.headers[entity];
    },
  },
};
</script>
