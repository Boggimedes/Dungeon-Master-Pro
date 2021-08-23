<?php

namespace App\Http\Controllers;
use App\Models\Monster;
use Illuminate\Http\Request;

class MonsterController extends Controller
{

    function getMonsters(Request $request, $term = null)
    {
		$me = \Auth::user();
        if(empty($me)) {
            abort(401);
        }
        $whereStr = null;
        $where = null;

        $monsters=[];
        if ($request->has('where')){
            $whereStr=[];
            foreach($request->get('where') as $key => $value){
                $whereStr[]="`$key` = '$value'";
            }
            $whereStr = implode(" and ",$whereStr);
            $whereStr='WHERE '.$whereStr;
        }
        if ($term) $whereStr = " WHERE `name` LIKE '%$term%'";

        $monsters = $me->monsters()->where('name', 'LIKE', "%$term%");

        if(empty($me->settings->default_monsters) || $me->settings->default_monsters) {

            $monsters = \DB::table('monsters')
                ->where('user_id', 1)
                ->union($monsters)
                ->where('name', 'LIKE', "%$term%");
        }
        
        $monsters = $monsters->groupBy('name')->paginate(9)->toArray();
        $monsters['data'] = Monster::hydrate($monsters['data']);
        //     $monsterQuery = "(SELECT * FROM (SELECT * FROM monsters WHERE user_id = '$me->id'
        //         UNION ALL SELECT * FROM monsters WHERE user_id = 1) AS monster GROUP BY `name` ORDER BY `name` DESC) as m ";
        //  else $monsterQuery = "(SELECT * FROM monster WHERE user_id = '$me->id') as m ";
        // $query = "SELECT * FROM $monsterQuery $whereStr";
        // \Log::info($query);
        // $monsters = \DB::select($monsterQuery);
        // SELECT * FROM (SELECT * FROM (SELECT * FROM monsters WHERE user_id = 1 UNION ALL SELECT * FROM monsters WHERE user_id = 1) AS monster GROUP BY `name` ORDER BY `name` DESC) AS monsters  WHERE name LIKE "%skeleton%"
        // SELECT * FROM (SELECT * FROM (SELECT * FROM monsters WHERE user_id = 1 UNION ALL SELECT * FROM monsters WHERE user_id = 1) AS monster GROUP BY `name` ORDER BY `name` DESC) AS monsters  WHERE `name` LIKE '%skeleton%'
        return response()->json($monsters);
    }
    function addMonster(Request $request) 
    {
        $me = \Auth::user();
        if(empty($me)) {
            abort(401);
        }
        $monsterData = $request->get('monster');
        $monsterData['user_id'] = $me->id;
        $monster = Monster::create($monsterData);
        return response()->json(['monster' => $monster]);
        }
    
    function updateMonster(Request $request, Monster $monster)
    {
        $me = \Auth::user();
        if(empty($me) || $monster->user_id !== $me->id) {
            abort(401);
        }
        if($monster['user_id'] == 1 && $me->id != 1) unset($monster['id']);
        $monsterData = $request->get('monster');
        $monster = Monster::updateOrCreate($monsterData);
        if($request->has('file')){
            $name = "/". $monster->id .".jpg";
            if($me->id == 1) {
                $directory = "/mImages";
            } else $directory = "/mImages/".$me->id;
            $monster->img = $directory . $name;
            $file =$request->get("file");
        }

        if(isset($file)){
            if (!file_exists($directory)) mkdir($directory, 0755, true);
            $file->moveTo($directory."/$name");
        } 
        
        return response()->json(['monster' => $monster]);
        }
    
    
    function deleteMonster(Monster $monster){
        $me = \Auth::user();
        if(empty($me) || $monster->user_id !== $me->id) {
            abort(401);
        }
        $monster->delete();
        
        return response()->json(['message' => "Deleted record ".$monster->id]);
        }
    
    }
