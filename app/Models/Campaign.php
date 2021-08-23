<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\PlotPoint;

class Campaign extends Model
{

    public function user()
	{
		return $this->belongsTo(\App\Models\User::class);
	}

    public function plotPoints()
    {
        return $this->hasMany(PlotPoint::class);
    }

    public function npcs()
    {
        return $this->hasMany(\App\Models\Npc::class,
        'campaign_npcs',
        'npc_id',
        'campaign_id',
        'id');
    }
}
