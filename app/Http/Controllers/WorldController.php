<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\World;
use App\Models\Region;
use App\Models\Npc;
use App\Models\POI;
use Illuminate\Support\Facades\Storage;

class WorldController extends Controller
{
    function getNpc(Npc $npc)
    {
        $me = \Auth::user();
        if(empty($me) || $npc->user_id !== $me->id) abort(401);
        return response()->json(['npc' => $npc->load('race', 
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
                ->append('children')]);
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

    function getNpcList(Request $request, Region $region)
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
                    'profession')]); //->select(['name','id'])
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
        $npcData = $request->all();
        \Log::info($npcData['notes']);
        \Log::info($npcData['id']);
        \Log::info($npcData['name']);
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
    public function read(Request $request, World $world) 
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
            'name' => $world->name,
            'body_types' => $bodyTypes->pluck('type'),
            'lineage_types' => $lineageTypes->pluck('text'),
            'descriptive_types' => collect($descriptiveTypes)->sort()->values(),
            'descriptives' => $world->descriptives,
            'professions' => $world->professions,
            'races' => $world->races,
            'campaigns' => $me->campaigns,
            'regions' => $world->regions->append('stats'),
            'stats' => $world->stats()
        ]);
    }
    public function update(Request $request, World $world) 
    {
		$me = \Auth::user();
        if(empty($me) || $world->user_id !== $me->id) abort(401);
        $world->name = $request->has('name') ? $request->get('name') : $world->name;
        $world-save();
        return response()->json(['message' => 'updated ' . $world->name]);
    }
    public function getWorldFromRegion(Request $request, Region $region)
    {
        return $this->read($request, $region->world);
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


\Log::info($region);
        return view('map-generator',['region' => $region]);

    }

    public function uploadMap(Request $request, Region $region) {
		// $me = \Auth::user();
        // if(empty($me) || $region->world->user_id !== $me->id) abort(401);
        $data = $request->all();
        $data['states'] = json_decode($data['states']);
        $data['religions'] = json_decode($data['religions']);
        $validatedData = \Validator::make(
            $data,
            [
            'map'  => 'string',
            'url'  => 'string',
            'states'  => 'array',
            'religions'  => 'array',
        ]
        )->validated();
        $image = $validatedData['url'];
        $image = str_replace('data:image/png;base64,', '', $image);
        $image = str_replace(' ', '+', $image);
        Storage::disk('s3')->put('map/rt' . $region->id . '.png', base64_decode($image), 'public');
        $pattern = "/ns\d+:/";
        $region->map = preg_replace($pattern, "", $validatedData['map']);
        $region->states = $validatedData['states'];
        $region->religions = $validatedData['religions'];
        $region->save();

        // $this->createPOI('burgs', $validatedData['burgs'], $region);
        // $this->createPOI('markers', $validatedData['markers'], $region);
        return response()->json(['message' => "Map Uploaded Successfully"]);
        
    }
    public function createPOI(Request $request, Region $region) {
        $data = $request->all();
        $region->newMarker($data);
        return response()->json(['message' => ucfirst($data['poi']['type']) . " Created"]);
    }
    public function getMap(Region $region) {
		// $me = \Auth::user();
        // if(empty($me) || $region->world->user_id !== $me->id) abort(401);
        $map = $region->map;
        // return response()->json($region->map);
        // header("Content-type: image/svg+xml");
        return response()->make($map, '200', array('Content-Type' => 'image/svg+xml'));
    }

    public function getPOI(Region $region, $type, $i) {
        $poi = POI::where('type', $type)->where('region_id', $region->id)->where('id', $i)->first();
        if (empty($poi)) {
            $poi = POI::create(['type' => $type, 'region_id' => $region->id, 'id' => $i]);
        }
        $mapData = $region->getMapItem($type, $i);
        $poi = $poi->appendNpcs();
        $poi = collect($poi)->merge($mapData)->toArray();

        if (empty($poi['notes']) && !empty($poi['legend'])) $poi['notes'] = $poi['legend'];
        return response()->json($poi);
   }

    public function updatePOI(Request $request, Region $region) {
        $data = $request->all();
        $poiData = $data['poi'];
        if ($request->has('poi.capital')) $poiData['type'] = 'burgs';
        $poi = POI::firstOrCreate(['type' => $poiData['type'], 'region_id' => $region->id, 'id' => $poiData['i']]);
        $poi->notes = !empty($poiData['notes']) ? $poiData['notes'] : "";
        $poi->hooks = !empty($poiData['hooks']) ? $poiData['hooks'] : "";
        $poi->save();
        $region->updateMapData($poiData['type'], $poiData);
        return response()->json(['poi' => array_merge($poi->toArray(), $poiData)]);
    }

    public function updateSVG(Request $request, Region $region) {
        $data = $request->all();
        $svg = $data['svg'];
        $region->updateSVG($svg);
        return response()->json(['message' => "SVG Updated"]);
    }

    public function attachNPC(Region $region, $type, $i, Npc $npc) {
        $poi = POI::where('type', $type)->where('region_id', $region->id)->where('id', $i)->first();
        if (empty($poi)) {
            $poi = POI::create(['type' => $type, 'region_id' => $region->id, 'id' => $i]);
        }
        $poi->attachNpcs([$npc->id]);
        return response()->json($npc);
    }

    public function detachNPC(Region $region, $type, $i, Npc $npc) {
        $poi = POI::where('type', $type)->where('region_id', $region->id)->where('id', $i)->first();
        if (empty($poi)) {
            $poi = POI::create(['type' => $type, 'region_id' => $region->id, 'id' => $i]);
        }
        $poi->detachNpcs([$npc->id]);
        return response()->json($npc);
    }

    public function create() {
		$me = \Auth::user();
        if(empty($me)) abort(401);
        $count = World::where([['user_id','=',$me->id],['name','like','New World%']])->count();
        $countString = $count ? ('New World ' . ($count+1)) : 'New World';
        $newWorld = World::create(['user_id' => $me->id, 'name' => $countString]);
        \Log::info($newWorld);
        return response()->json($newWorld);
    }

    public function delete(World $world) {
		$me = \Auth::user();
        if(empty($me) || $world->user_id !== $me->id) abort(401);
        $world->delete();
        return response()->json(["message" => $world->name . " Deleted", "user" => $me->refresh()->withSearchList()]);
    }
}

