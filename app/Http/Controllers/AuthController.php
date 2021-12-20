<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required',
            ]);

            if ($validator->fails()) {
                return CreateResponseApi(400, "error", $validator->errors());
            }
        
            $email = $request->input('email');
            $password = $request->input('password');
        
            $user = User::where("email", $email)->first();

            if (!$user) {
                return CreateResponseApi(401, "Email tidak ditemukan");
            }

            if (!Hash::check($password, $user['password'])) {
                return CreateResponseApi(401, "Password tidak valid");
            }

            if ($user->role_id == 3) {
                return CreateResponseApi(401, "Anda tidak memiliki akses kedalam sistem");
            }

            return CreateResponseApi(200, "success", array(
                'user' => $user,
                'access_token' => Crypt::encryptString($user['id']),
            ));
        } catch (\Throwable $th) {
            return CreateResponseApi(400, $th);
        }
    }
}