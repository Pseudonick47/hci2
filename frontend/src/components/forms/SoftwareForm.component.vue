<template>
  <form class="pa-3">
    <v-layout row>
      <v-text-field
        v-validate="'required'"
        v-model="software.label"
        :error-messages="errors.collect('label')"
        label="Label"
        data-vv-name="label"
        required
        autofocus
      ></v-text-field>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <v-text-field
        v-validate="'required'"
        v-model="software.title"
        :error-messages="errors.collect('title')"
        label="Title"
        data-vv-name="title"
        required
      ></v-text-field>
      </v-layout>
      <v-text-field
        v-validate="'required'"
        v-model="software.description"
        :error-messages="errors.collect('description')"
        label="Description"
        data-vv-name="description"
        required
      ></v-text-field>
      <v-layout row>
      <v-text-field
        v-validate="'required'"
        v-model="software.manufacturer"
        :error-messages="errors.collect('manufacturer')"
        label="Manufacturer"
        data-vv-name="manufacturer"
        required
      ></v-text-field>
      <span>&nbsp;&nbsp;</span>
      <v-text-field
        v-validate="'required'"
        v-model.number="software.year"
        :error-messages="errors.collect('year')"
        label="Publication year"
        data-vv-name="year"
        prepend-icon="event"
        required
        type="number"
      ></v-text-field>
      </v-layout>
      <v-text-field
        v-validate="'required'"
        v-model="software.site"
        :error-messages="errors.collect('site')"
        label="Site"
        data-vv-name="site"
        required
      ></v-text-field>
      <v-text-field
        v-validate="'required'"
        v-model.number="software.price"
        :error-messages="errors.collect('price')"
        label="Price"
        data-vv-name="price"
        required
        type="number"
        suffix="$"
      ></v-text-field>
      <v-layout row>
      <v-checkbox
        v-validate="'required'"
        v-model="software.os"
        :error-messages="errors.collect('os')"
        value="windows"
        label="Windows"
        data-vv-name="os"
        type="checkbox"
      ></v-checkbox>
    <v-checkbox
        v-validate="'required'"
        v-model="software.os"
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
</template>

<script>
import { Software } from 'Models/software.model';
import SoftwareController from 'Controllers/software.controller';
import store from 'Store';

export default {
  name: 'ClassroomForm',
  data: () => ({
    software: new Software(),
  }),

  methods: {
    submit () {
      this.$validator.validateAll().then((result) => {
      if (result) {
        SoftwareController.create(this.software).then(({ data }) => {
          this.$alert.success('Successfully added! ');
          store.commit('addSoftware', data);
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
      this.software = new Software();
      this.$validator.reset();
    },
  },
};
</script>
