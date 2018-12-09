<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use Auth;
use Validator;
use App\User;


class UserController extends Controller
{

    public function userLogin(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }

        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){
            $user = Auth::user();
            $success['token'] =  $user->createToken('MyApp')->accessToken;
            return response()->json(['success' => $success], 200);
        }
        else{
            return response()->json(['error'=>'Unauthorised'], 401);
        }
    }

    public function userRegister(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'user_role' => 'required',
            'telephone' => 'required',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);

        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['token'] =  $user->createToken('MyApp')->accessToken;
        $success['name'] =  $user->name;
        return response()->json(['success'=>$success], 200);
    }


    public function usersDetails()
    {
        $users = User::get();
        return response()->json(['success' => $users], 200);
    }

    public function userDetails($id)
    {
        $user = User::where('id', $id)->get();
        return response()->json(['success' => $user], 200);
    }

    public function userDelete(Request $request)
    {
        User::where('id', $request->user_id)->delete();
        return response()->json(['success' => "Delete user $request->user_id"], 200);
    }

    public function userUpdate(Request $request)
    {
        User::where('id', $request->id)
            ->update(['name' => $request->name,'email' => $request->email,'user_role' => $request->user_role,'telephone' => $request->telephone]);
        return response()->json(['success' => "Update user $request->id"], 200);
    }



}