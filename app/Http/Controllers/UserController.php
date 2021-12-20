<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;
use Validator;

class UserController extends Controller
{
    //
    /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */
    public function index(Request $request)
    {
        //
        $limit = $request->limit ? $request->limit : 10;
        $auth = auth()->user();
        
        $users = User::m_get_all($limit, [$auth->id]);

        if (!$users) {
            return CreateResponseApi(400, "gagal get all users");
        }
        
        return CreateResponseApi(200, "success", $users);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'name' => 'required',
            'password' => 'required',
            'role_id' => 'required'
        ]);

        if ($validator->fails()) {
            return CreateResponseApi(400, "fail", $validator->errors());
        }

        $new_request = $request->input();
        $new_request['password'] = Hash::make($request->input('password'));
        $new_request['email_verified_at'] = date('Y-m-d H:i:s');

        $user = User::create($new_request);

        if (!$user) {
            return CreateResponseApi(400, "invalid create user");
        }

        return CreateResponseApi(200, $user);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $user = User::m_get_one($id);

        if (!$user) {
            return CreateResponseApi(404, "user not found");
        }

        
        return CreateResponseApi(200, "success", $user);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function showRole()
    {
        //
        $role = Role::whereNotIn('name', ['Guru','Siswa'])->get();

        if (!$role) {
            return CreateResponseApi(404, "roles not found");
        }
        
        return CreateResponseApi(200, "success", $role);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function showMe()
    {
        //
        $auth = auth()->user();

        return CreateResponseApi(200, "success", $auth);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateUserRequest  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::where("id", $id)->first();

        if (!$user) {
            return CreateResponseApi(404, "User tidak ditemukan");
        }
        //
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'name' => 'required'
        ]);

        if ($validator->fails()) {
            return CreateResponseApi(400, "error", $validator->errors());
        }


        $email= $request->input("email");
        $name= $request->input('name');

        $update = User::where("id", $id)->update(["name" => $name, "email" => $email]);

        if (!$update) {
            return CreateResponseApi(400, 'invalid updated user');
        }

        return CreateResponseApi(200, "success", $update);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user, $id)
    {
        //
        $user = User::where("id", $id)->first();

        if (!$user) {
            return CreateResponseApi(404, "User tidak ditemukan");
        }

        $delete = User::where("id", $id)->delete();

        if (!$delete) {
            return CreateResponseApi(400, "Gagal updated user");
        }

        return CreateResponseApi(200, "success");
    }
}