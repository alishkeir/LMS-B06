<?php

namespace App\Http\Controllers;

use App\Http\Resources\Teacher as TeacherResource;
use App\Teacher;
use Illuminate\Http\Request;
use JWTAuth;

class TeacherController extends Controller
{

    protected $user;


    public function __construct()
    {
        $this->user = JWTAuth::parseToken()->authenticate();
    }


    public function index(Request $request)
    {

        if (request()->input('name')) {
            return TeacherResource::collection(Teacher::orderBy('username')->paginate(5));
        }
        return  TeacherResource::collection(Teacher::paginate(5));
    }

    public function store(Request $request)
    {
        $request->validate([
            "username" => 'required',
            "email" => 'required',
            "password" => 'required',
        ]);
        $validator = \Validator::make($request->all(), [
            'username' => 'required|unique:teachers',
            'email' => 'required|unique:teachers'
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()]);
        }

        $teacher = new Teacher([
            "username" => $request->username,
            "email" => $request->email,
            "password" => bcrypt($request->password),
        ]);
        $teacher->save();
        return response()->json(["data" => "teacher created"]);
    }



    public function edit(Request $request, $id)
    {
        return new TeacherResource(Teacher::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            "username" => "required",
            "email" => "required",
            "password" => "required",
        ]);


        $teacher = Teacher::findOrFail($id);

        $teacher->username = $request->username;
        $teacher->email = $request->email;
        $teacher->password = bcrypt($request->password);
        $teacher->save();
        return response()->json(["data" => "teacher edited"]);
    }

    public function destroy(Request $request, $id)
    {
        $teacher = Teacher::findOrFail($id);
        $teacher->destroy($id);

        return response()->json(['data' => "deleted"]);
    }
}
