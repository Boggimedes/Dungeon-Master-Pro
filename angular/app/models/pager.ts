export class PagerInfo {
  current_page: number = 1;
  date_from: number = 1;
  date_to: number = 1;
  last_page: number = 1;
  per_page: number = 15;
  total: number = 1;

  starting_page: number;
  pageRange: number[] = [];

  constructor(data: any = {}) {
    const compare = {};
    for (const i in data) {
      if (this.hasOwnProperty(i)) {
        compare[i] = data[i];
      }
    }
    Object.assign(this, compare);
    if (this.current_page > this.last_page) this.current_page = this.last_page;
    const min = Math.max(this.current_page - 5, 1);
    const max = this.last_page;
    this.starting_page = Math.max(Math.min(max, min), 1);
    this.pageRange = range(
      this.starting_page,
      max > this.starting_page + 10 ? this.starting_page + 10 : max
    );
  }
}

export function range(start, end) {
  return Array.from({ length: end - start }, (v, k) => k + start);
}
