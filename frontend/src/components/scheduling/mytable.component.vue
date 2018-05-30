<template>
  <table style="width:100%;">
    <thead>
      <tr>
        <th />
        <th
          v-for="day in days"
          :key="day"
          :colspan="labs.length"
        >{{ day }}</th>
      </tr>
      <tr>
        <th>Time</th>
        <template
          v-for="day in days"
        >
          <th
            v-for="lab in labs"
            :key="`${day}${lab}`"
          > {{ lab }}</th>
        </template>
      </tr>
    </thead>
    <tr
      v-for="(t, i) in time"
      :key="t"
    >
      <td>{{ t }}</td>
      <template
        v-for="(day, j) in days"
      >
        <td
          v-for="(lab, k) in labs"
          v-if="!hiddenCells[t][day][lab]"
          :key="`${i}${j}${k}`"
          @dragenter="hideCell(t, day, lab)"
          @dragleave="showCell"
        />
      </template>
    </tr>
  </table>
</template>
<script>
const ACTIVE = 0;

export default {
  name: 'MyTable',
  props: {
    headers: {
      type: [Object,
Array],
      required: true,
    },
    indices: {
      type: Array,
      required: true,
    },
  },
  data: {
    state: null,
  },
  methods: {
    initialize() {
      const state = {};

      if (_.isObject(this.headers)) {
        const num = 0;
        _.each(_.values(this.headers), (header) => num += header.length);

        _.each(this.indices, (row) => {
          state[row] = {};
          _.times(num, (col) => state[row][col] = ACTIVE);
        });
      } else {

      }
    },
  },
};

</script>