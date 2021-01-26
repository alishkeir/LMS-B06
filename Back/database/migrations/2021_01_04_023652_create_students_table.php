<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id("id");
            $table->string('firstName');
            $table->string('lastName');
            $table->string('email');
            $table->string('phoneNumber');
            $table->date('dateOfBirth');
            $table->string('image');
            $table->unsignedBigInteger('sectionID');
            $table->foreign('sectionID')->references('id')->on('sections');
            // $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('students');
    }
}
