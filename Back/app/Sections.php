<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sections extends Model
{
    protected $table = "sections";
    protected $fillable = ["sectionName", "classID"];
    // protected $fillable = ["classID"];
    public $timestamps = false;
}



