<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use Validator;
use App\UserRole;

class RoleController extends Controller
{
    public function roleDetails()
    {
        $role = UserRole::get();
        return response()->json(['success' => $role], 200);
    }
}
