<?php

namespace App\Http\Controllers;

use App\Classes;
use Illuminate\Http\Request;
use JWTAuth;

class ClassesController extends Controller
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

        $data = $request->all();
        $recent = $data['recent'];
        if ($recent=="true") {
            return Classes::orderBY('id', 'DESC')->paginate(5);

        } else {
            return Classes::orderBY('id', 'DESC')->paginate(6);
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
        $class = new Classes();
        $class->fill($data);
        $class->save();

        return response()->json(["status" => 200, "class" => $class]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Classes::where("id", $id)->first();
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
        $class = Classes::where("id", $id)->first();
        $class->update($data);
        $class->save();
        return response()->json(["status" => 200, "class" => $class]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Classes::where("id", $id)->delete();

    }
}
