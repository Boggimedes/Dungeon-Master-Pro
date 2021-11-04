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

}
