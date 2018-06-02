<template>
  <div>
    <v-divider></v-divider>
    <v-card>
      <v-card-title>
        <v-layout column>
            <v-checkbox
              v-if="title=='classroom' || title=='subject'"
              v-model="filterBoard"
              value="board"
              label="Board required"
              type="checkbox"
            ></v-checkbox>
            <v-checkbox
              v-if="title=='classroom' || title=='subject'"
              v-model="filterSmartBoard"
              value="smartBoard"
              label="Smart board required"
              type="checkbox"
            ></v-checkbox>
            <v-checkbox
              v-if="title=='classroom' || title=='subject'"
              v-model="filterProjector"
              value="projector"
              label="Projector required"
              type="checkbox"
            ></v-checkbox>
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
            :items="['linux','windows']"
            v-model="filterOs"
            label="Filter by OS"
            chips
            overflow
            deletable-chips
            dense
          ></v-select>
        </v-layout>
      </v-card-title>
    <v-data-table
      :headers="headers"
      :search="search"
      :items="data"
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
  data: () => ({
    search: '',
    dialog: false,
    confirmDialog: false,
    itemToDelete: null,
  }),
  props: [
    'headers',
    'title',
    'data',
  ],
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
    getTableTitle(title) {
      if (title === 'software') {
        return title;
      }
      return title + 's';
  },
  },
};
</script>
