<?php

namespace App\Http\Controllers;

use App\Sections;
use Illuminate\Http\Request;
use JWTAuth;

class SectionsController extends Controller
{

    protected $user;

    public function __construct()
    {
        $this->user = JWTAuth::parseToken()->authenticate();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // return Sections :: all();

        $data = $request->all();
        $class = $data['class'];
        if ($class!=="all"){

        return Sections::where('classID', $class)->paginate(10);
    }
        else{
            return Sections::all();
        }

}


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $section = new Sections();
        $section->fill($data);
        $section->save();
        return response()->json(["status" => 200, "section" => $section]);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Sections::where("id", $id)->first();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = $request->all();
        $section = Sections::where("id", $id)->first();
        $section->update($data);
        $section->save();
        return response()->json(["status" => 200, "section" => $section]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Sections::where("id", $id)->delete();
    }
}
