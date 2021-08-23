<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Campaign;

class StoryController extends Controller
{
    function getCampaigns(Request $request)
    {
		$me = \Auth::user();
        if(empty($me)) {
            abort(401);
        }
        $campaigns = $me->campaigns()->select('id', 'name', 'tags', 'current_day')->get();
        return response()->json(['campaigns' => $campaigns]);
    }
    //
    function getCampaign(Request $request, Campaign $campaign)
    {
		$me = \Auth::user();
        if(empty($me) || $campaign->user_id == $me->id) {
            abort(401);
        }

        return response()->json(['campaign' => $campaign]);
    }
    //
}
