
export class World
{
    public id: number;
    public name: string;

	constructor(data: any = {})
	{
		data = !!data ? data : {};
		Object.assign(this, data);
	}
}