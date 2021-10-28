<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\World;
use App\Models\Region;
use App\Models\Npc;
use Illuminate\Support\Facades\Storage;

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
        return response()->json([
            'region' => $region,
            'npcs' => $region
                ->npcs()
                ->where('alive', '>', 0)
                ->get()
                ->load('race', 
                    'profession',
                    'spouse', 
                    'spouse.race', 
                    'spouse.profession',
                    'birthParent', 
                    'birthParent.race', 
                    'birthParent.profession',
                    'parent', 
                    'parent.race', 
                    'parent.profession')
                ->append('children')]); //->select(['name','id'])
    }

    function deleteRegion(Region $region)
    {
        $me = \Auth::user();
        if(empty($me) || $region->world->user_id !== $me->id) abort(401);
        $region->delete();
        return response()->json(['message' => 'Region Deleted']);
    }

    function getRegion(Request $request, Region $region)
    {
        $me = \Auth::user();
        if(empty($me) || $region->world->user_id !== $me->id) abort(401);
        return response()->json(['region' => $region]);
    }
    function clearRegion(Region $region)
    {
        $me = \Auth::user();
        if(empty($me) || $region->world->user_id !== $me->id) abort(401);
        $region->clear();
        $region->append('stats');
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
    public function getWorld(Request $request, World $world) 
    {
		$me = \Auth::user();
        if(empty($me) || $world->user_id !== $me->id) abort(401);
        $bodyTypes = $world->descriptives()->where('type','LIKE', 'body%')->select('type')->groupBy('type')->get();
        $lineageTypes = $world->descriptives()->where('type', 'LIKE', 'lineage%')->select('text')->groupBy('text')->get();
        $descriptiveTypes = $world
            ->descriptives()
            ->where('type','NOT LIKE', 'body%')
            ->where('type','NOT LIKE', '%extra')
            ->select('type')
            ->groupBy('type')
            ->get()
            ->pluck('type')
            ->toArray();
        $descriptiveTypes[] = "body";
        $descriptiveTypes[] = "body extra";

        return response()->json([
            'id' => $world->id,
            'body_types' => $bodyTypes->pluck('type'),
            'lineage_types' => $lineageTypes->pluck('text'),
            'descriptive_types' => collect($descriptiveTypes)->sort()->values(),
            'descriptives' => $world->descriptives,
            'professions' => $world->professions,
            'races' => $world->races,
            'regions' => $world->regions->append('stats'),
            'stats' => $world->stats()
        ]);
    }
    public function getWorldFromRegion(Request $request, Region $region)
    {
        return $this->getWorld($request, $region->world);
    }
    public function seedRegion(Region $region) {
		$me = \Auth::user();
        if(empty($me) || $region->world->user_id !== $me->id) abort(401);
        $region->seed();
        $region->append('stats');
        return response()->json(['message' => 'Region Seeded', 'region' => $region]);
    }
    public function ageRegion(Region $region, $years) {
		$me = \Auth::user();
        if(empty($me) || $region->world->user_id !== $me->id) abort(401);
        $region->age($years);
        $region->append('stats');
        return response()->json(['message' => 'Region Seeded', 'region' => $region]);
    }

    public function addRegion(Request $request, World $world) {
		$me = \Auth::user();
        if(empty($me)) abort(401);
        $region = [];
        if ($request->has('region')) {
            $region = $request->get('region');
        }
        $region['world_id'] = $world->id;

        $region = Region::create($region);
        $region = Region::find($region->id);
        $region->append('stats');
        return response()->json(['message' => 'Region Created', 'region' => $region]);
    }
    public function saveRegion(Request $request, Region $region) {
		$me = \Auth::user();
        if(empty($me)) abort(401);
        $validatedData = $request->validate([
            'name'  => 'nullable|string',
            'feature_types'  => 'nullable|array',
            'epoch' => 'nullable|numeric',
            'prof_balance'  => 'nullable|array',
            'racial_balance'    => 'nullable|array',
        ]);

        $validatedData['world_id'] = $region->world->id;

        $region->update($validatedData);
        $region->append('stats');
        return response()->json(['message' => 'Region Saved', 'region' => $region]);
    }

    public function generateFeatures(Request $request, Npc $npc){
		$me = \Auth::user();
        if(empty($me) || $npc->region->world->user_id !== $me->id) abort(401);
        $validatedData = $request->validate([
            'locked_features'  => 'nullable|array',
        ]);
        $features = $npc->region->generateFeatures($npc->gender, $npc->race);
        $npc->features = collect($npc->features)->keyBy('name')->merge(collect($features)->keyBy('name')->except($validatedData['locked_features']))->values()->filter(function ($value) {return !empty($value);});
        $npc->save();
        return response()->json(['npc' => $npc->refresh()]);
    }

    public function mapGenerator(Request $request, Region $region) {
		// $me = \Auth::user();
        // if(empty($me) || $region->world->user_id !== $me->id) abort(401);



        return view('map-generator',['region' => $region]);

    }

    public function uploadMap(Request $request, Region $region) {
		// $me = \Auth::user();
        // if(empty($me) || $region->world->user_id !== $me->id) abort(401);
        $validatedData = $request->validate([
            'svgString'  => 'string',
            'cultures'  => 'string',
            'states'  => 'string',
            'religions'  => 'string',
            'provinces'  => 'string',
            'burgs'  => 'string',
            'markers'  => 'string',
            'map'  => 'string',
            'url'  => 'string',
            'canvas'  => 'string',
        ]);
        $image = $validatedData['url'];
        $image = str_replace('data:image/png;base64,', '', $image);
        $image = str_replace(' ', '+', $image);
        Storage::disk('s3')->put('map/r' . $region->id . '.svg', $validatedData['svgString'], 'public');
        Storage::disk('s3')->put('map/rt' . $region->id . '.png', base64_decode($image), 'public');
        $region->cultures = json_decode($validatedData['cultures']);
        $region->states = json_decode($validatedData['states']);
        $region->map = $validatedData['map'];
        $region->religions = json_decode($validatedData['religions']);
        $region->save();

        // $this->createPOI('burgs', $validatedData['burgs'], $region);
        // $this->createPOI('markers', $validatedData['markers'], $region);
        return response()->json(['message' => "Map Uploaded Successfully"]);
        
    }
    private function createPOI($type, $data, Region $region) {

    }
    public function getMap(Region $region) {
		// $me = \Auth::user();
        // if(empty($me) || $region->world->user_id !== $me->id) abort(401);
        $map = $region->map;
        // return response()->json($region->map);
        // header("Content-type: image/svg+xml");
        return response()->make($map, '200', array('Content-Type' => 'image/svg+xml'));
    }
}

