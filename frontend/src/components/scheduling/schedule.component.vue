<template>
  <table class="schedule-table">
    <thead>
      <tr class="schedule-row">
        <th class="schedule-cell"/>
        <th
          v-for="(header, i) in model.headers"
          :key="`header${i}`"
          :colspan="header.colspan"
          class="schedule-cell"
        >{{ header.text }}</th>
      </tr>
      <tr class="schedule-row">
        <th class="schedule-cell">Time</th>
        <template
          v-for="(header, i) in model.headers"
          v-if="header.subheaders"
        >
          <th
            v-for="(subheader, j) in header.subheaders"
            :key="`subheader${i}${j}`"
            :colspan="subheader.colspan"
            class="schedule-cell"
          >{{ subheader.text }}</th>
        </template>
      </tr>
    </thead>
    <tr
      v-for="(row, i) in model.data"
      :key="`row${i}`"
      :id="`schedule-row-${i}`"
      class="schedule-row"
    >
      <td
        v-for="(cell, j) in row"
        v-if="cell.active"
        :key="`cell${i}${j}`"
        :id="`schedule-cell-${i}-${j}`"
        :colspan="cell.colspan"
        :rowspan="cell.rowspan"
        class="schedule-cell"
      >
        <v-card
          v-if="!cell.meta && cell.text"
          class="elevation-6 term-card"
        >
          <div class="title">
            {{ cell.text }}
          </div>
        </v-card>
        <span v-else-if="cell.text">{{ cell.text }}</span>
      </td>
    </tr>
  </table>
</template>
<script>
import { TableModel } from 'Models/table.model';

export default {
  name: 'Schedule',
  props: {
    model: {
      type: TableModel,
      required: true,
    },
  },
};
</script>
<style>
.schedule-table, .schedule-cell {
  border: 1px solid black;
  border-collapse: collapse;
}

.schedule-table {
  height: 100%;
  width: 100%;
}

.schedule-cell {
  height: 30px;
  width: 30px;
}

.term-card {
  height: 100% !important;
  width: 100% !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
  background-color: #d4d4d4 !important;
}
</style>
