<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StudentsAttendance extends Model
{
    protected $table = "student_attendance";

    protected $fillable = ["studentID", "attendanceID", "attendanceEntry", "date"];

    public $timestamps = false;
}
