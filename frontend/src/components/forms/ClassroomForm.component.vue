<template>
<div>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <software-form></software-form>
      <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="close">Cancel</v-btn>
        </v-card-actions>
    </v-card>
  </v-dialog>
  <form>
    <v-text-field
      v-validate="'required'"
      v-model="classroom.label"
      :error-messages="errors.collect('label')"
      label="Label"
      data-vv-name="label"
      required
      autofocus
    ></v-text-field>
    <v-text-field
      v-validate="'required'"
      v-model="classroom.description"
      :error-messages="errors.collect('description')"
      label="Description"
      data-vv-name="description"
      required
    ></v-text-field>
    <v-text-field
      v-validate="'required'"
      v-model.number="classroom.capacity"
      :error-messages="errors.collect('capacity')"
      label="Capacity"
      data-vv-name="capacity"
      required
      type="number"
    ></v-text-field>
    <v-layout row>
    <v-select
      :items="sofwareList"
      v-model="classroom.sofware"
      label="Sofware"
      multiple
    ></v-select>
    <v-btn
      icon
      @click="newSoftware">
      <v-icon>add</v-icon>
    </v-btn>
    </v-layout>
    <v-layout row>
    <v-checkbox
      v-model="classroom.projector"
      value="1"
      label="Projector"
      type="checkbox"
    ></v-checkbox>
    <v-checkbox
      v-model="classroom.board"
      value="1"
      label="Board"
      type="checkbox"
    ></v-checkbox>
    <v-checkbox
      v-model="classroom.smartBoard"
      value="1"
      label="Smart board"
      type="checkbox"
    ></v-checkbox>
    </v-layout>
    <hr>
    <v-layout row>
    <v-checkbox
      v-validate="'required'"
      v-model="classroom.os"
      :error-messages="errors.collect('os')"
      value="windows"
      label="Windows"
      data-vv-name="os"
      type="checkbox"
    ></v-checkbox>
   <v-checkbox
      v-validate="'required'"
      v-model="classroom.os"
      :error-messages="errors.collect('os')"
      value="linux"
      label="Linux"
      data-vv-name="os"
      type="checkbox"
    ></v-checkbox>
    </v-layout>

    <v-btn @click="submit">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
</div>
</template>

<script>
import SoftwareForm from 'Components/forms/SoftwareForm.component';
import { Classroom } from 'Models/classroom.model';
import ClassroomsController from 'Controllers/classrooms.controller';

export default {
  name: 'ClassroomForm',
  components: { SoftwareForm },
  data: () => ({
    classroom: new Classroom(),
    sofwareList: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
    ],
    dialog: false,
  }),

  methods: {
    submit () {
      this.$validator.validateAll().then((result) => {
      if (result) {
        ClassroomsController.create(this.classroom).then(() => {
            this.$alert.success('Successfully added! ');
          }).
          catch(() => {
            this.$alert.error('Error occurred.');
          });
      } else {
          this.$alert.warning('Please fill out the form.');
      }
    });
    },
    clear () {
      this.classroom = new Classroom();
      this.$validator.reset();
    },
    newSoftware() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    save() {
      console.log('save');
    },
  },
};
</script>
