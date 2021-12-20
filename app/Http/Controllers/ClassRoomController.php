<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ClassRoom;
use App\Models\MasterClass;
use App\Models\Teacher;
use Validator;

class ClassRoomController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
            $limit = $request->limit ? $request->limit : 10;
            $teacher_id = "";
            $auth = auth()->user();
            
            if ($auth->role_id == 2) {
                $teacher = Teacher::where("user_id", $auth->id)->first();
                if (!$teacher) {
                    return CreateResponseApi(409, "Terjadi kesalahan");
                }
                $teacher_id = $teacher->id;
            }

            $class_room = ClassRoom::m_get_all($limit, $teacher_id);

            if (!$class_room) {
                return CreateResponseApi(400, "error", $class_room);
            }
            
            return CreateResponseApi(200, 'success', $class_room);
        } catch (\Throwable $th) {
            return CreateResponseApi(400, "error", $th);
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
                'name' => 'required',
                'teacher_id' => 'required',
            ]);
        
            if ($validator->fails()) {
                return CreateResponseApi(400, "error", $validator->errors());
            }

            $new_request = $request->input();
            $new_request['school_year'] = date('Y');
            $new_request['class_id'] = "";
            $name =$new_request['name'];

            $master_class = MasterClass::whereRaw('LOWER(`name`) LIKE ?', "%{$name}%")->first();

            if ($master_class) {
                $new_request['class_id'] = $master_class['id'];

                $check_room = ClassRoom::where("school_year", $new_request['school_year'])
                                        ->where("class_id", $master_class['id'])->count();

                if ($check_room > 0) {
                    return CreateResponseApi(409, "Data Kelas Untuk Periode ini sudah ada");
                }
            }

           
            $class_room = ClassRoom::m_create($new_request);

            if (!$class_room) {
                return CreateResponseApi(400, "error", $class_room);
            }
            return CreateResponseApi(200, "success", $class_room);
        } catch (\Throwable $th) {
            return CreateResponseApi(400, "error", $th);
        }
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ClassRoom  $classRoom
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $class_room = ClassRoom::m_get_one($id);
    
            if (!$class_room) {
                return CreateResponseApi(404, "Data tidak ditemukan");
            }
            return CreateResponseApi(200, "success", $class_room);
        } catch (\Throwable $th) {
            return CreateResponseApi(400, $th);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateClassRoomRequest  $request
     * @param  \App\Models\ClassRoom  $classRoom
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            //
            $class_room = ClassRoom::where("id", $id)->first();

            if (!$class_room) {
                return CreateResponseApi(404, "Kelas tidak ditemukan");
            }
            //
            $validator = Validator::make($request->all(), [
                'teacher_id' => 'required',
            ]);
        
            if ($validator->fails()) {
                return CreateResponseApi(400, "error", $validator->errors());
            }
        
            $new_request = array(
                'teacher_id' =>  $request->input('teacher_id')
            );

            $update = ClassRoom::where("id", $id)->update($new_request);

            if (!$update) {
                return CreateResponseApi(400, 'invalid updated data Kelas');
            }

            return CreateResponseApi(200, "success", $update);
        } catch (\Throwable $th) {
            return CreateResponseApi(400, $th);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ClassRoom  $classRoom
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $class_room = ClassRoom::where("id", $id)->first();
    
            if (!$class_room) {
                return CreateResponseApi(404, "Kelas tidak ditemukan");
            }
    
            $delete = ClassRoom::where("id", $id)->delete();

            if (!$delete) {
                return CreateResponseApi(400, "Gagal delete Kelas");
            }
            
            return CreateResponseApi(200, "success");
        } catch (\Throwable $th) {
            return CreateResponseApi(400, $th);
        }
    }
}