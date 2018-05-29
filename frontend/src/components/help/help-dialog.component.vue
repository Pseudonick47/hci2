<template>
  <v-layout row>
    <v-dialog v-model="dialog" persistent max-width="1200px" style="height: 100%;">
      <v-icon slot="activator">help</v-icon>
      <v-card style="max-height: 100%">
        <v-card-title>
          <span class="headline">Help</span>
        </v-card-title>


        <v-card-text>
          <v-layout row>
            <v-flex xs3 sm3>
              <v-card>
                <v-list>
                  <v-list-group
                    v-for="item in items"
                    v-model="item.active"
                    :key="item.title"
                    :prepend-icon="item.action"
                    no-action
                  >
                    <v-list-tile slot="activator">
                      <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-for="subItem in item.items" :key="subItem.title" @click="subitemSelected(subItem, item)">
                      <v-list-tile-content>
                        <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <v-icon>{{ subItem.action }}</v-icon>
                      </v-list-tile-action>
                    </v-list-tile>
                  </v-list-group>
                </v-list>
              </v-card>
            </v-flex>
            <v-flex xs9 sm9>
              <v-card class="pa-2 ml-3">
               <p>{{ selectedText }}</p>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card-text>


        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import { TEXTS } from './../../constants';
export default {
  name: 'HelpDialog',
  computed: {
    selectedText() {
      return TEXTS[this.selectedSubitem] || 'Comming soon';
    },
  },
  data: () => ({
    dialog: false,
    selectedSubitem: '',
    items: [
          {
            action: 'local_activity',
            title: 'Entities',
            active: true,
            items: [
              { title: 'Prvi', value: 'entities1' },
              { title: 'Drugi', value: 'entities2' },
              { title: 'Treci', value: 'entities3' },
              { title: 'Cetvrti', value: 'entities4' },
              { title: 'Peti', value: 'entities5' },
            ],
          },
          {
            action: 'calendar_today',
            title: 'Schedule',
            items: [
              { title: 'Subject Selection', value: 'schedule1' },
              { title: 'Term Adding', value: 'schedule2' },
            ],
          },
        ],
  }),
  methods: {
    subitemSelected(subItem, item) {
      console.log(subItem, item);
      this.selectedSubitem = subItem.value;
      item['active'] = true;
    },
  },
};
</script>
