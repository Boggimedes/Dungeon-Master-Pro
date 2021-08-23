<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Campaign;

class PlotPoint extends Model
{
    public function campaign()
	{
		return $this->belongsTo(Campaign::class);
	}


}
