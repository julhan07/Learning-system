<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTeacherRequest;
use App\Http\Requests\UpdateTeacherRequest;
use Illuminate\Http\Request;
use App\Models\Teacher;
use Illuminate\Support\Facades\Hash;

use Validator;

class TeacherController extends Controller
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
        
            $teacher = Teacher::m_get_all($limit);

            return CreateResponseApi(200, 'success', $teacher);
        } catch (\Throwable $th) {
            return CreateResponseApi(400, "error", $th);
            //throw $th;
        }
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        try {
            //code...
            $validator = Validator::make($request->all(), [
                'nuptk' => 'required|unique:teachers,nuptk',
                'name' => 'required',
                'email' => 'required|unique:users|email',
                'place_of_birth' => 'required',
                'date_of_birth' => 'required|date',
                'position' => 'required',
                'gender' => 'required',
                'address' => 'required',
            ]);
    
            if ($validator->fails()) {
                return CreateResponseApi(400, "fail", $validator->errors());
            }
    
            $new_request = $request->input();
            $new_request['email_verified_at'] = date('Y-m-d H:i:s');
            $new_request['role_id'] = 2;
            $new_request['password'] = Hash::make("password");
            
            $teacher = Teacher::m_create($new_request);

    
            if (!$teacher) {
                return CreateResponseApi(400, $teacher);
            }
    
            return CreateResponseApi(200, $teacher);
        } catch (\Throwable $th) {
            return CreateResponseApi(400, "error", $th);
            //throw $th;
        }

        //
    }
    
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Teacher  $teacher
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $teacher = Teacher::m_get_one($id);

        if (!$teacher) {
            return CreateResponseApi(404, "Data tidak ditemukan");
        }
                
        return CreateResponseApi(200, "success", $teacher);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateTeacherRequest  $request
     * @param  \App\Models\Teacher  $teacher
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            //
            $teacher = Teacher::where("id", $id)->first();

            if (!$teacher) {
                return CreateResponseApi(404, "Guru tidak ditemukan");
            }
            //
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'place_of_birth' => 'required',
                'date_of_birth' => 'required|date',
                'position' => 'required',
                'gender' => 'required',
                'address' => 'required'
            ]);
        
            if ($validator->fails()) {
                return CreateResponseApi(400, "error", $validator->errors());
            }


            $new_request = $request->input();
            $new_request['nuptk'] = $teacher->nuptk;
            $new_request['user_id'] = $teacher->user_id;

            $update = Teacher::m_update($id, $new_request);

            if (!$update) {
                return CreateResponseApi(400, 'invalid updated data guru');
            }

            return CreateResponseApi(200, "success", $update);
        } catch (\Throwable $th) {
            return CreateResponseApi(400, $th);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Teacher  $teacher
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $teacher = Teacher::where("id", $id)->first();
    
            if (!$teacher) {
                return CreateResponseApi(404, "Teacher tidak ditemukan");
            }
    
            $delete = Teacher::m_destroy($id, $teacher);
            if (!$delete) {
                return CreateResponseApi(400, "Gagal delete teachers");
            }
            
            return CreateResponseApi(200, "success");
        } catch (\Throwable $th) {
            return CreateResponseApi(400, $th);
        }
    }
}