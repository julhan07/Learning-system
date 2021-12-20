<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ClassRoomStudent;
use Validator;

class ClassRoomStudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $id)
    {
        try {
            $limit = $request->limit ? $request->limit : 25;

    
            $resutls = ClassRoomStudent::m_get_all($limit, $id);
            
            if (!$resutls) {
                return CreateResponseApi(400, "fail", $resutls);
            }
    
            return CreateResponseApi(200, "success", $resutls);
        } catch (\Throwable $th) {
            return CreateResponseApi(400, "fail", $th);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'student_id' => 'required|exists:students,id',
                'class_room_id' => 'required|exists:class_rooms,id',
            ]);
    
            if ($validator->fails()) {
                return CreateResponseApi(400, "fail", $validator->errors());
            }

            $new_request = $request->input();

            $count = ClassRoomStudent::where("student_id", $new_request['student_id'])
                            ->where("class_room_id", $new_request['class_room_id'])
                            ->count();

            if ($count > 0) {
                return CreateResponseApi(409, "Siswa Sudah terdaftar dikelas ini");
            }
    
            $class_room_student = ClassRoomStudent::create($new_request);

            if (!$class_room_student) {
                return CreateResponseApi(400, $class_room_student);
            }
    
            return CreateResponseApi(200, $class_room_student);
        } catch (\Throwable $th) {
            return CreateResponseApi(400, "error", $th);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreClassRoomStudentRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreClassRoomStudentRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ClassRoomStudent  $classRoomStudent
     * @return \Illuminate\Http\Response
     */
    public function show(ClassRoomStudent $classRoomStudent)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ClassRoomStudent  $classRoomStudent
     * @return \Illuminate\Http\Response
     */
    public function edit(ClassRoomStudent $classRoomStudent)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateClassRoomStudentRequest  $request
     * @param  \App\Models\ClassRoomStudent  $classRoomStudent
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateClassRoomStudentRequest $request, ClassRoomStudent $classRoomStudent)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ClassRoomStudent  $classRoomStudent
     * @return \Illuminate\Http\Response
     */
    public function destroy(ClassRoomStudent $classRoomStudent)
    {
        //
    }
}