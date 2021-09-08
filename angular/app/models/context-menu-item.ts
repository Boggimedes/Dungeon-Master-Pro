export class ContextMenuItem {
  public text;
  public handler;
  constructor(data: any = {}) {
    data = !!data ? data : {};
    Object.assign(this, data);
  }
}
