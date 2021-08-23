<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WorldController extends Controller
{
    function getNpcDetails(Npc $npc)
    {
        $me = \Auth::user();
        if(empty($me) || $npc->user_id !== $me->id) abort(401);
        return response()->json(['npc' => $npc]);
        }

    function getNpcs(Request $request, Region $region)
    {
        $me = \Auth::user();
        if(empty($me)) abort(401);
        return response()->json(['npcs' => $region->npcs->select(['name','id'])]);
    }

    function getRegion(Request $request, Region $region)
    {
        $me = \Auth::user();
        if(empty($me) || $region->world->user_id !== $me->id) abort(401);
        return response()->json(['region' => $region]);
    }
    function clearRegion(Request $request, Region $region)
    {
        $me = \Auth::user();
        if(empty($me) || $region->world->user_id !== $me->id) abort(401);
        $region->clear();
        return response()->json(['region' => $region]);
    }
    function newNpc(Request $request, Region $region)
    {
        $me = \Auth::user();
        if(empty($me)) abort(401);
        $npcData = $request->get('npc-data');
        $npc = $region->generateNpc($npcData);
        return response()->json(['monster' => $monster]);
    }
    function updateNpc(Request $request, Npc $npc)
    {
        $me = \Auth::user();
        if(empty($me)) abort(401);
        $npcData = $request->get('npc_data');
        $npcData['user_id'] = $me->id;
        $npc->update($npcData);

        return response()->json(['message' => 'NPC Updated', 'npc' => $npc]);
    }
    function createNpc(Request $request)
    {
		$me = \Auth::user();
        $npcData = $request->get('npc_data');
        $npcData['user_id'] = $me->id;
        $npc = Npc::create($npcData);
        return response()->json(['message' => 'Created NPC', 'npc' => $npc]);
        }
    function deleteNpc(Request $request, Npc $npc) 
    {
        $me = \Auth::user();
        if(empty($me) || $npc->user_id !== $me->id) abort(401);
        $npc->delete();
        return response()->json(['message' => 'Deleted NPC']);
    }
    public function getWorldData(Request $request, World $world) 
    {
		$me = \Auth::user();
        if(empty($me) || $world->user_id !== $me->id) abort(401);
		return response()->json([
            'descriptives' => $world->descriptives,
            'professions' => $world->professions,
            'races' => $world->races,
            'regions' => $world->regions,
        ]);
    }
}
