
export class Campaign
{
    public name: string;
    public id: number;
    public tags: string[];
    public current_day: number;
    public plot_points: PlotPoint[];
    public npcs: [];


	constructor(data: any = {})
	{
		data = !!data ? data : {};
		Object.assign(this, data);
	}
}


export class PlotPoint
{
    public name: string;
    public id: number;
    public tags: string[];
    public type: string;
    public day: number;
    public duration: number;
    public icon: string;
    public notes: string;


	constructor(data: any = {})
	{
		data = !!data ? data : {};
		Object.assign(this, data);
	}
}

