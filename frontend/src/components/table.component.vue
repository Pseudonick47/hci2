<template>
  <div>
    <v-divider></v-divider>
    <v-card>
    <v-card-title>
      <span style="text-transform: uppercase;"><b>{{ getTableTitle(title) }}</b></span>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="data"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <tr>
          <td 
            v-for="(header) in headers"
            :key="header.text"
          >{{ props.item[header.value] }}
          </td>
          <td class="justify-left layout px-0">
            <v-btn icon class="mx-0" @click="editItem(props.item)">
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click="deleteItem(props.item)">
              <v-icon>delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
      <template slot="no-data">
      </template>
    </v-data-table>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: 'Table',
    data: () => ({
      search: '',
      dialog: false,
      // editedIndex: -1,
      // editedItem: {
      //   name: '',
      //   calories: 0,
      //   fat: 0,
      //   carbs: 0,
      //   protein: 0,
      // },
      // defaultItem: {
      //   name: '',
      //   calories: 0,
      //   fat: 0,
      //   carbs: 0,
      //   protein: 0,
      // },
    }),
    props: [
      'headers',
      'title',
      'data',
    ],
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
      },
    },
    methods: {
      editItem (item) {
        console.log('todo', item);
        // this.editedIndex = this.desserts.indexOf(item);
        // this.editedItem = Object.assign({}, item);
        // this.dialog = true;
      },

      deleteItem (item) {
        console.log('todo', item);
        // const index = this.desserts.indexOf(item);
        // confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1);
      },

      close () {
        console.log('todo');
        // this.dialog = false;
        // setTimeout(() => {
        //   this.editedItem = Object.assign({}, this.defaultItem);
        //   this.editedIndex = -1;
        // }, 300);
      },

      save () {
        console.log('todo');
        // if (this.editedIndex > -1) {
        //   Object.assign(this.desserts[this.editedIndex], this.editedItem);
        // } else {
        //   this.desserts.push(this.editedItem);
        // }
        // this.close();
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
