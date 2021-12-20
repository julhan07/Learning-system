<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class Teacher extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nuptk',
        'place_of_birth',
        'date_of_birth',
        'position',
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


    public static function m_get_all($limit)
    {
        try {
            $teacher = Teacher::select(
                'teachers.id',
                'teachers.nuptk',
                'teachers.place_of_birth',
                'teachers.date_of_birth',
                'teachers.position',
                'teachers.gender',
                'teachers.address',
                'teachers.user_id',
                'teachers.created_at',
                'users.name',
                'users.email'
            )->orderBy('teachers.id', "desc")
            ->join('users', 'teachers.user_id', 'users.id')
            ->paginate($limit);
    
            return $teacher;
        } catch (\Throwable $th) {
            return $th;
        }
    }


    public static function m_get_one($id)
    {
        try {
            $teacher = Teacher::select(
                'teachers.id',
                'teachers.nuptk',
                'teachers.place_of_birth',
                'teachers.date_of_birth',
                'teachers.position',
                'teachers.gender',
                'teachers.address',
                'teachers.user_id',
                'teachers.created_at',
                'users.name',
                'users.email'
            )
            ->where("teachers.id", $id)
            ->join('users', 'teachers.user_id', 'users.id')
            ->first();

            if (!$teacher) {
                return null;
            }
    
            return $teacher;
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
            
            $teacher = Teacher::create($request);
            DB::commit();

            return $teacher;
        } catch (\Throwable $th) {
            //throw $th;
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
            unset($request['created_at']);
        
            $teacher = Teacher::where("id", $id)->update($request);
            DB::commit();
            return $teacher;
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
            $teacher = Teacher::where("id", $id)->delete();
            DB::commit();
            return $teacher;
        } catch (\Throwable $th) {
            DB::rollBack();
            return $th;
        }
    }
}