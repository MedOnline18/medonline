<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserRole extends Model
{
    protected $table = 'user_role';
    protected $fillable = [
        'id', 'role_name'
    ];
}
