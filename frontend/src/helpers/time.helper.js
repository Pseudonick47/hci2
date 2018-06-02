export default {
  generateTimePoints(start, end, step) {
    const ret = [];
    let c = start;

    let h = null;
    let m = null;
    while (c <= end) {
      h = Math.floor(c / 60);
      m = c % 60;

      ret.push(`${this.pad(h)}:${this.pad(m)}`);

      c += step;
    }

    return ret;
  },

  pad(num) {
    if (num >= 10) {
      return `${num}`;
    }
    return `0${num}`;
  },
};
