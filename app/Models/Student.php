<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class Student extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nis',
        'place_of_birth',
        'date_of_birth',
        'guardian_parent',
        'gender',
        'address',
        'user_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [];

    public static function m_get_all($limit, $search)
    {
        try {
            $student = Student::select(
                'students.id',
                'students.nis',
                'students.place_of_birth',
                'students.date_of_birth',
                'students.gender',
                'students.address',
                'students.guardian_parent',
                'students.user_id',
                'students.created_at',
                'users.name',
                'users.email'
            )
            ->join('users', 'students.user_id', 'users.id')
            ->where(function ($q) use ($search) {
                $q->where('students.nis', 'like', "%${search}%")
                ->orWhere('users.name', 'like', "%${search}%");
            })
            ->orderBy('students.id', "desc")
            ->paginate($limit);
    
            return $student;
        } catch (\Throwable $th) {
            return $th;
        }
    }


    public static function m_get_one($id)
    {
        try {
            $student = Student::select(
                'students.id',
                'students.nis',
                'students.place_of_birth',
                'students.date_of_birth',
                'students.gender',
                'students.address',
                'students.guardian_parent',
                'students.user_id',
                'students.created_at',
                'users.name',
                'users.email'
            )
            ->where("students.id", $id)
            ->join('users', 'students.user_id', 'users.id')
            ->first();

            if (!$student) {
                return null;
            }
    
            return $student;
        } catch (\Throwable $th) {
            return $th;
        }
    }

    public static function m_create($request)
    {
        DB::beginTransaction();
        try {
            $user = User::create($request);

            $request['user_id'] = $user->id;
            
            $student = Student::create($request);

            DB::commit();
            return $student;
        } catch (\Throwable $th) {
            DB::rollBack();
            return $th;
        }
    }


    public static function m_update($id, $request)
    {
        DB::beginTransaction();
        try {
            $user_id = $request['user_id'];

            $user_request = array(
                'name' => $request['name']
            );
            $user = User::where("id", $user_id)->update($user_request);

            unset($request['name']);
            unset($request['email']);

        
            $student = Student::where("id", $id)->update($request);
            DB::commit();
            return $student;
        } catch (\Throwable $th) {
            DB::rollBack();
            return $th;
        }
    }


    public static function m_destroy($id, $request)
    {
        DB::beginTransaction();
        try {
            $user = User::where("id", $request['user_id'])->delete();
            $student = Student::where("id", $id)->delete();
            DB::commit();
            return $student;
        } catch (\Throwable $th) {
            DB::rollBack();
            return $th;
        }
    }
}