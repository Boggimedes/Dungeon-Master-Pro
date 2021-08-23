<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Campaign;
use App\Models\Map;
use App\Models\User;

class MapItem extends Model
{
    public function campaign()
	{
		return $this->belongsTo(Campaign::class);
	}

    public function map()
	{
		return $this->belongsTo(Map::class);
	}

}
