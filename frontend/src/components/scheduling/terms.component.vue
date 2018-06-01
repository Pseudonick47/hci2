<template>
  <v-navigation-drawer
    v-model="drawer"
    class="pa-5"
    id="terms-drawer"
    right
  >
    <table id="terms-table">
      <template v-for="(term, i) in model">
        <tr
          :key="i"
          py-2
          :id="`terms-row-${i * term.rowspan}`"
        >
          <td
            :rowspan="term.rowspan"
            :id="`terms-cell-${i}-1`"
            class="schedule-cell"
            pa-1
          >
            <v-card>
              <div class="title">
                {{ term.text }}
              </div>
            </v-card>
          </td>
        </tr>
        <template v-if="term.rowspan > 1">
          <tr
            v-for="j in term.rowspan"
            :key="`terms-row-${i * term.rowspan + j}`"
          />
        </template>
      </template>
    </table>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: 'Terms',
  props: {
    model: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      drawer: true,
    };
  },
};
</script>
<style>
.terms-cell {
  height: 30px;
  width: 30px;
}

#terms-table {
  width: 100%;
}

#terms-drawer {
  width: 400px;
}
</style>
