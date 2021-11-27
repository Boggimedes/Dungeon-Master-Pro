<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Campaign;
use App\Models\Map;
use App\Models\User;

class POI extends Model
{
	protected $table = "poi";
    protected $fillable = [
        'id',
        'type',
        'region_id',
        'hooks',
        'notes'
	];
    public function campaign()
	{
		return $this->belongsTo(Campaign::class);
	}

    public function map()
	{
		return $this->belongsTo(Map::class);
	}

    public function npcs()
    {
        $npcs = \DB::table('npc_poi')->where([['poi_id','=',$this->id],['type','=',$this->type],['npc_poi.region_id','=',$this->region_id]])->join('npcs','npcs.id','npc_poi.npc_id')->select("npcs.*");
        \Log::info($npcs->toSql());
            return NPC::hydrate($npcs->get()->toArray())->load('spouse', 'birthParent', 'parent', 'race', 'profession')->append('children');
    }

    public function appendNpcs()
    {
        $this->npcs = $this->npcs();
        \Log::info($this->npcs());
        return $this;
    }

    public function attachNPCs($npcs) {

        foreach($npcs as $npc) {
            \DB::table('npc_poi')->insert(['poi_id' => $this->id, 'type' => $this->type, 'region_id' => $this->region_id, 'npc_id' => $npc]);
        }
    }

    public function detachNPCs($npcs) {

        foreach($npcs as $npc) {
            \DB::table('npc_poi')->where(['poi_id' => $this->id, 'type' => $this->type, 'region_id' => $this->region_id, 'npc_id' => $npc])->delete();
        }
    }
}
