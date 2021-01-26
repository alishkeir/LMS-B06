<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentAttendanceTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('student_attendance', function (Blueprint $table) { 
            $table->unsignedBigInteger('studentID');
            $table->foreign('studentID')->references('id')->on('students');
            $table->unsignedBigInteger('attendanceID');
            $table->foreign('attendanceID')->references('id')->on('attendance');
            $table->string("attendanceEntry");
            $table->date("date");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('student_attendance');
    }
}
