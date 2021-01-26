<?php

namespace App\Http\Controllers;

use App\Students;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use JWTAuth;

class StudentsController extends Controller
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
        $section = $data['section'];
        if ($section === "all") {
            return Students::paginate(10);
        } else {
            return Students::where('sectionID', $section)->paginate(10); 
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
        $validator = Validator::make($request->all(), [

            'firstName' => 'required|max:255',
            'lastName' => 'required|max:255',
            'email' => 'required|email:rfc,dns|max:255',
            'phoneNumber' => 'required',
            'dateOfBirth' => 'required',
            'image' => 'bail|required|mimes:jpeg,png,jpg,gif,svg|max:5000',
            'sectionID' => 'required',

        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        } else {

            $data = $request->all();
            $data["dateOfBirth"] = date("Y-m-d", strtotime($data["dateOfBirth"]));
            $image = $request->file('image');
            $name = time() . '_' . $image->getClientOriginalName();
            $path = $request->file('image')->storeAs('', $name, 'public');
            $email = DB::table('students')->select('email')->where('students.email', $request->email)->get();
            if ($path) {
                $student = new Students();
                $student->firstName = $data['firstName'];
                $student->lastName = $data['lastName'];
                $student->email = $data['email'];
                $student->phoneNumber = $data['phoneNumber'];
                $student->dateOfBirth = $data['dateOfBirth'];
                $student->image = $path;
                $student->sectionID = $data['sectionID'];
                if (json_decode(json_encode($email), true)) {
                    return response()->json(['status' => 400, 'message' => 'Email already in use!']);} else {
                    $student->save();
                    return response()->json(['status' => 200, 'student' => $student]);

                }

            } else {

                return response()->json(['staus' => 500, 'error' => "couldnt upload image"]);

            }
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Students::where("id", $id)->first();
    }

    /**
     *
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

        $validator = Validator::make($request->all(), [

            'firstName' => 'max:255',
            'lastName' => 'max:255',
            'email' => 'email:rfc,dns|max:255',
            // 'phoneNumber' => 'min:8',
            'image' => 'bail|mimes:jpeg,png,jpg,gif,svg|max:5000',

        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        } else {


            $data = $request->all();
            if ($request->dateOfBirth) {
                $data["dateOfBirth"] = date("Y-m-d", strtotime($data["dateOfBirth"]));
            }
            $image = $request->file('image');
            if ($request->image) {
                $name = time() . '_' . $image->getClientOriginalName();
                $path = $request->file('image')->storeAs('', $name, 'public');}
            $email = DB::table('students')->select('email')->where('students.email', $request->email)->get();

            $student = Students::where('id', $id)->first();
            if ($request->firstName) {
                $student->firstName = $data['firstName'];
            }
            if ($request->lastName) {
                $student->lastName = $data['lastName'];
            }
            if ($request->email) {
                $student->email = $data['email'];
            }
            if ($request->phoneNumber) {
                $student->phoneNumber = $data['phoneNumber'];
            }
            if ($request->dateOfBirth) {
                $student->dateOfBirth = $data['dateOfBirth'];
            }
            if ($request->image) {
                if ($path) {
                    $student->image = $path;
                }}
            if ($request->sectionID) {
                $student->sectionID = $data['sectionID'];
            }
            if (json_decode(json_encode($email), true)) {
                return response()->json(['status' => 400, 'message' => 'Email already in use!']);
            } else {
                $student->save();
                return response()->json(['status' => 200, 'student' => $student]);

            }

        }


    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Students::where("id", $id)->delete();

    }
}
