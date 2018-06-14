<template>
<div>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <software-form :editOrCreate="'create'" @clicked="closeChildDialog" @change="warning"></software-form>
      <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="close">Cancel</v-btn>
        </v-card-actions>
    </v-card>
  </v-dialog>
  <form
    v-shortcuts="[
      { shortcut: [ 'ctrl', 'enter' ], callback: () => submit(), disabled: isDisabled },
    ]"
  >
    <v-text-field
      v-validate="'required'"
      v-model="classroom.label"
      :error-messages="errors.collect('label')"
      label="Label"
      data-vv-name="label"
      required
      clearable
      autofocus
    ></v-text-field>
    <v-text-field
      v-validate="'required'"
      v-model="classroom.description"
      :error-messages="errors.collect('description')"
      label="Description"
      data-vv-name="description"
      clearable
      required
    ></v-text-field>
    <v-text-field
      v-validate="'required'"
      v-model.number="classroom.capacity"
      :error-messages="errors.collect('capacity')"
      label="Capacity"
      data-vv-name="capacity"
      required
      clearable
      type="number"
    ></v-text-field>
    <v-layout row>
    <v-checkbox
      v-model="classroom.projector"
      value="yes"
      label="Projector"
      type="checkbox"
    ></v-checkbox>
    <v-checkbox
      v-model="classroom.board"
      value="yes"
      label="Board"
      type="checkbox"
    ></v-checkbox>
    <v-checkbox
      v-model="classroom.smartBoard"
      value="yes"
      label="Smart board"
      type="checkbox"
    ></v-checkbox>
    </v-layout>
    <hr>
    <v-layout row>
    <v-checkbox
      v-model="classroom.os"
      value="windows"
      label="Windows"
      data-vv-name="os"
      type="checkbox"
    ></v-checkbox>
   <v-checkbox
      v-model="classroom.os"
      value="linux"
      label="Linux"
      data-vv-name="os"
      type="checkbox"
    ></v-checkbox>
    </v-layout>
    <v-layout row>
    <v-select
      :items="softwareList"
      v-model="classroom.software"
      label="Choose software"
      multiple
      item-text="title"
      item-value="id"
      autocomplete
      hint="Please select OS first!"
    ></v-select>
    <v-tooltip bottom>
      <v-btn
        slot="activator"
        icon
        @click="newSoftware">
        <v-icon>add</v-icon>
      </v-btn>
      <span>Create software</span>
    </v-tooltip>
    </v-layout>

    <v-btn @click="submit">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
</div>
</template>

<script>
import * as _ from 'lodash';
import SoftwareForm from 'Components/forms/SoftwareForm.component';
import { Classroom } from 'Models/classroom.model';
import ClassroomsController from 'Controllers/classrooms.controller';
import store from 'Store';
import { mapGetters } from 'vuex';

export default {
  name: 'ClassroomForm',
  components: { SoftwareForm },
  computed: {
    isDisabled() {
      return this.currentForm !== 'classroom';
    },
    softwareList() {
      if (this.classroom.os.length === 1 && this.classroom.os[0] === 'windows') {
        return _.map(this.windowsSoftwares, (x) => x);
      } else if (this.classroom.os.length === 1 && this.classroom.os[0] === 'linux') {
        return _.map(this.linuxSoftwares, (x) => x);
      } else if (this.classroom.os.length === 2) {
        return _.map(this.softwares, (x) => x);
      }
      return _.map([]);
    },
    ...mapGetters([
      'softwares',
      'windowsSoftwares',
      'linuxSoftwares',
      'currentForm',
    ]),
  },
  props: {
    classroom: {
      type: Classroom,
      required: false,
      default: () => new Classroom(),
    },
    editOrCreate: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    dialog: false,
  }),
  methods: {
    submit () {
      if (this.classroom.projector === null) {
        this.classroom.projector = 'no';
      }
      if (this.classroom.board === null) {
        this.classroom.board = 'no';
      }
      if (this.classroom.smartBoard === null) {
        this.classroom.smartBoard = 'no';
      }
      this.$validator.validateAll().then((result) => {
      if (result) {
        if (this.editOrCreate === 'create') {
          ClassroomsController.create(this.classroom).then(({ data }) => {
            this.$alert.success('Successfully added! ');
            store.commit('addClassroom', data);
            this.clear();
          }).
          catch(() => {
            this.$alert.error('Error occurred.');
          });
        } else if (this.editOrCreate === 'edit') {
          if (_.has(this.classroom.software[0], 'createdAt')) {
            this.classroom.software = this.classroom.software.map((x) => x.id);
          }
          ClassroomsController.update(this.classroom.id, this.classroom).then(() => {
            this.$alert.success('Successfully edited! ');
            this.$emit('clicked');
          });
        }
      } else {
        this.$emit('changed');
        this.$alert.warning('Please fill out the form.');
      }
    });
    },
    clear () {
      this.classroom = new Classroom();
      this.$validator.reset();
    },
    close() {
      this.dialog = false;
    },
    newSoftware() {
      this.dialog = true;
    },
    closeChildDialog(value) {
      this.dialog = value;
    },
    warning() {
      this.$alert.warning('Please fill out the form.');
    },
  },
};
</script>
