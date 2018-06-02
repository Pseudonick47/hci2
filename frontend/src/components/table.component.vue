<template>
  <div>
    <v-divider></v-divider>
    <v-card>
      <v-card-title>
        <v-layout column>
          <div v-if="title=='classroom' || title=='subject'">
            <span style="color:grey;font-size:18px;">Filter by:</span>
            <v-checkbox
              v-model="filterParams.board"
              value="yes"
              label="Board required"
              type="checkbox"
              @change="filterBy"
            ></v-checkbox>
            <v-checkbox
              v-model="filterParams.smartBoard"
              value="yes"
              label="Smart board required"
              type="checkbox"
              @change="filterBy"
            ></v-checkbox>
            <v-checkbox
              v-model="filterParams.projector"
              value="yes"
              label="Projector required"
              type="checkbox"
              @change="filterBy"
            ></v-checkbox>
          </div>
        </v-layout>
        <v-layout column wrap>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <span>&nbsp;&nbsp;&nbsp;</span>
        <v-select
          v-if="title!='course'"
          :items="[{name:'Linux',value:'linux'},{name:'Windows',value:'windows'}]"
          v-model="filterParams.os"
          label="Filter by OS"
          overflow
          item-text="name"
          item-value="value"
          dense
          chips
          deletable-chips
          @input="filterBy"
        ></v-select>
        </v-layout>
      </v-card-title>
    <v-data-table
      :headers="headers"
      :search="search"
      :items="filteredData"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td
            v-for="(header) in headers"
            :key="header.text"
          >{{ showItem(props.item, header.value) }}
          </td>
          <td class="justify-left layout px-0">
            <v-btn icon class="mx-0" @click="editItem(props.item)">
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click="deleteButton(props.item)">
              <v-icon>delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
      <template slot="no-data">
      </template>
    </v-data-table>
    </v-card>
    <v-dialog v-model="confirmDialog" width="300px">
      <v-card>
        <v-card-text>Are you sure?</v-card-text>
        <v-card-actions>
          <v-btn @click="deleteItem">Confirm</v-btn>
          <v-btn @click="confirmDialog=false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import CoursesController from 'Controllers/courses.controller';
import SubjectsController from 'Controllers/subjects.controller';
import ClassroomsController from 'Controllers/classrooms.controller';
import SoftwareController from 'Controllers/software.controller';
import store from 'Store';

export default {
  name: 'Table',
  data() {
 return {
    search: '',
    dialog: false,
    confirmDialog: false,
    itemToDelete: null,
    filterParams: { os: '', board: '', smartBoard: '', projector: '' },
    filter: false,
  };
},
  props: [
    'headers',
    'title',
    'data',
  ],
  computed: {
    filteredData() {
      if (this.filter) {
        let result = this.data;
        if (this.filterParams.os !== '') {
          result = result.filter((item) => {
            return item.os[0] === this.filterParams.os || item.os[1] === this.filterParams.os;
          });
        }

        if (this.filterParams.board !== '') {
          result = result.filter((item) => {
            return item.board === this.filterParams.board;
          });
        }

        if (this.filterParams.smartBoard !== '') {
          result = result.filter((item) => {
            return item.smartBoard === this.filterParams.smartBoard;
          });
        }

        if (this.filterParams.projector !== '') {
          result = result.filter((item) => {
            return item.projector === this.filterParams.projector;
          });
        }
        return result;
      }
      return this.data;
    },
  },
  methods: {
    showItem (item, header) {
      if (header === 'course') {
        return item[header].map((a) => a.label).join(',');
      } else if (header === 'software') {
        return item[header].map((a) => a.label).join(',');
      } else if (header === 'os') {
        return item[header].join(',');
      }
      return item[header];
    },
    editItem (item) {
      this.$emit('clicked', item);
    },
    deleteButton(item) {
      this.itemToDelete = item;
      this.confirmDialog = true;
    },
    deleteItem () {
      if (this.title === 'classroom') {
        ClassroomsController.delete(this.itemToDelete.id).then(({ data }) => {
          this.$alert.success('Successfully deleted! ');
          store.commit('deleteClassroom', data);
        });
      } else if (this.title === 'course') {
        CoursesController.delete(this.itemToDelete.id).then(({ data }) => {
          this.$alert.success('Successfully deleted! ');
          store.commit('deleteCourse', data);
        });
      } else if (this.title === 'subject') {
        SubjectsController.delete(this.itemToDelete.id).then(({ data }) => {
          this.$alert.success('Successfully deleted! ');
          store.commit('deleteSubject', data);
        });
      } else {
        SoftwareController.delete(this.itemToDelete.id).then(({ data }) => {
          this.$alert.success('Successfully deleted! ');
          store.commit('deleteSoftware', data);
        });
      }
      this.confirmDialog = false;
    },
    filterBy() {
      if (this.filterParams.board === null) {
        this.filterParams.board = '';
      }
      if (this.filterParams.smartBoard === null) {
        this.filterParams.smartBoard = '';
      }
      if (this.filterParams.projector === null) {
        this.filterParams.projector = '';
      }
      if (this.filterParams.os === null) {
        this.filterParams.os = '';
      }

      if (this.filterParams.os === '' &&
        this.filterParams.board === '' &&
        this.filterParams.smartBoard === '' &&
        this.filterParams.projector === '') {
          this.filter = false;
      } else {
        this.filter = true;
      }
    },
  },
};
</script>
