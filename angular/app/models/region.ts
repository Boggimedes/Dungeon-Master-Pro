export class Region {
  public id: number;
  public name: string;
  public feature_types: any[] = [];
  public epoch: number;
  public prof_balance: any = [];
  public racial_balance: any = [];
  public stats: any;
  public linked: boolean = false;
  public world;

  constructor(data: any = {}) {
    data = !!data ? data : {};
    if (data.feature_types == null) data.feature_types = [];
    Object.assign(this, data);
  }
}
