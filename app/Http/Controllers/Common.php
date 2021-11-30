<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class Common extends Controller
{

    public function interested(Request $request){
        \Log::info($request->get('email'));
        if ($request->has('email') && $request->get('email')) {
            User::firstOrCreate(['email' => $request->get('email')]);
        }
        return view('welcome')->with('interested', "true");
    }

}
