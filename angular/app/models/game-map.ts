
export class GameMap
{
    public id: number;
    public name: string;
    public tags: string[];
    public map_items: MapItem[];

	constructor(data: any = {})
	{
		data = !!data ? data : {};
		Object.assign(this, data);
	}
}


export class MapItem
{
    public id: number;
    public name: string;
    public type: string;
    public visible_day: number;
    public visible_zoom: number;
    public tags: string[];
    public top: number;
    public left: number;
    public icon: string;
    public notes: string;



	constructor(data: any = {})
	{
		data = !!data ? data : {};
		Object.assign(this, data);
	}
}
