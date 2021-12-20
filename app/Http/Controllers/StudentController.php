<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Validator;

class StudentController extends Controller
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
        
            $student = Student::m_get_all($limit);

            return CreateResponseApi(200, 'success', $student);
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
            $validator = Validator::make($request->all(), [
                'nis' => 'required|unique:students,nis',
                'name' => 'required',
                'email' => 'required|unique:users|email',
                'place_of_birth' => 'required',
                'date_of_birth' => 'required|date',
                'guardian_parent' => 'required',
                'gender' => 'required',
                'address' => 'required',
            ]);
    
            if ($validator->fails()) {
                return CreateResponseApi(400, "fail", $validator->errors());
            }
    
            $new_request = $request->input();
            $new_request['email_verified_at'] = date('Y-m-d H:i:s');
            $new_request['role_id'] = 3;
            $new_request['password'] = Hash::make("password");
            
            $student = Student::m_create($new_request);

            if (!$student) {
                return CreateResponseApi(400, $student);
            }
    
            return CreateResponseApi(200, $student);
        } catch (\Throwable $th) {
            return CreateResponseApi(400, "error", $th);
        }
    }
    

    public function show($id)
    {
        try {
            $student = Student::m_get_one($id);
    
            if (!$student) {
                return CreateResponseApi(404, "Data tidak ditemukan");
            }
            return CreateResponseApi(200, "success", $student);
        } catch (\Throwable $th) {
            return CreateResponseApi(400, $th);
        }
    }
  
    
    public function update(Request $request, $id)
    {
        try {
            //
            $student = Student::where("id", $id)->first();

            if (!$student) {
                return CreateResponseApi(404, "Siswa tidak ditemukan");
            }
            //
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'place_of_birth' => 'required',
                'date_of_birth' => 'required|date',
                'guardian_parent' => 'required',
                'gender' => 'required',
                'address' => 'required'
            ]);
        
            if ($validator->fails()) {
                return CreateResponseApi(400, "error", $validator->errors());
            }


            $new_request = $request->input();
            $new_request['nis'] = $student->nis;
            $new_request['user_id'] = $student->user_id;
            
            $update = Student::m_update($id, $new_request);

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
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $student = Student::where("id", $id)->first();
    
            if (!$student) {
                return CreateResponseApi(404, "Siswa tidak ditemukan");
            }
    
            $delete = Student::m_destroy($id, $student);
            if (!$delete) {
                return CreateResponseApi(400, "Gagal delete Students");
            }
            
            return CreateResponseApi(200, "success");
        } catch (\Throwable $th) {
            return CreateResponseApi(400, $th);
        }
    }
}