<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Crypt;

class ApiAuthentication
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $token = $request->bearerToken();
        
        if ($token == "") {
            return response([
                'status' => 'authentication',
                'message' => 'token not found',
            ]);
        }

        $idStr = Crypt::decryptString($token);
  
        $user = User::where("id", $idStr)->first();

        if (!$user) {
            return response([
                'status' => 'authentication',
                'message' => 'invalid token',
            ]);
        }

        auth()->login($user);
        return $next($request);
    }
}