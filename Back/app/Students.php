<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Students extends Model
{
    protected $table = "students";

    protected $fillable = ["firstName", "lastName", "email", "phoneNumber", "dateOfBirth", "image", "sectionID"];
//     protected $filters=["sectionID"];

    public $timestamps = false;
}
