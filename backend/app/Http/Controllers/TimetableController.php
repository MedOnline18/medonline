<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use Auth;
use Validator;
use App\Timetable;


class TimetableController extends Controller
{

    public function timetableDetails()
    {
        $timetable = Timetable::get();
        return response()->json(['success' => $timetable], 200);
    }

    public function addTimetable(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'doctor_id' => 'required',
            'user_id' => 'required',
            'date' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }

        $input = $request->all();
        $timetable = Timetable::create($input);
        return response()->json(['success'=>$timetable], 200);
    }

    public function timetableDetail($id)
    {
        $timetable = Timetable::where('doctor_id', $id)->get();
        return response()->json(['success' => $timetable], 200);
    }

    public function timetableDelete(Request $request)
    {
        Timetable::where('id', $request->timetable_id)->delete();
        return response()->json(['success' => "Delete timetable $request->timetable_id"], 200);
    }

    public function timetableUpdate(Request $request)
    {
        Timetable::where('id', $request->id)
            ->update(['doctor_id' => $request->doctor_id,'user_id' => $request->user_id,'date' => $request->date]);
        return response()->json(['success' => "Update timetable $request->id"], 200);
    }

    public function checkTimetable($doctor_id, $date)
    {
        $chackTimetable = Timetable::where('doctor_id', $doctor_id)->where('date', $date)->get();
        if(count($chackTimetable) > 0){
            $msg = "ZAJĘTE";
            $status = 1;
        }
        else{
            $msg = "WOLNE";
            $status = 0;
        }
        return response()->json(['success' => ['msg' => $msg, 'status' => $status]], 200);
    }


}