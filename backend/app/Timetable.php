<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Timetable extends Model
{
    protected $table = 'timetable';
    protected $fillable = [
        'doctor_id', 'user_id', 'date'
    ];
}
