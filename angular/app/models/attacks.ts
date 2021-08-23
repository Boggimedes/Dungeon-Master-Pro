
export class Multiattack
{
    public name: string;
	public attacks: Attack[];

	constructor(data: any = {})
	{
		data = !!data ? data : {};
		Object.assign(this, data);
	}
}

export class Attack
{
    public name: string;
    public type: string = null;
    public bonus: string = null;
    public damage: string;
    public special: string = null;
    
	constructor(data: any = {})
	{
		data = !!data ? data : {};
		Object.assign(this, data);
	}
}