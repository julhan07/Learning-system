<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Models\MasterClass;

class ClassRoom extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'class_id',
        'teacher_id',
        'school_year',
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


    public static function m_get_all($limit, $teacher_id)
    {
        try {
            $query = ClassRoom::select(
                'class_rooms.id',
                'class_rooms.class_id',
                'class_rooms.teacher_id',
                'class_rooms.school_year',
                'master_classes.name',
                'teachers.nuptk',
                'users.name as teacher_name',
                'users.email as teacher_email',
                'class_rooms.created_at',
            )->orderBy('class_rooms.id', "asc")
            ->join('master_classes', 'class_rooms.class_id', 'master_classes.id')
            ->join('teachers', 'class_rooms.teacher_id', 'teachers.id')
            ->join('users', 'teachers.user_id', 'users.id');

            if ($teacher_id) {
                $query = $query->where('class_rooms.teacher_id', $teacher_id);
            }
           
            $query = $query->paginate($limit);

            if (!$query) {
                return null;
            }
    
            return $query;
        } catch (\Throwable $th) {
            return $th;
        }
    }


    public static function m_get_one($id)
    {
        try {
            $class_room = ClassRoom::select(
                'class_rooms.id',
                'class_rooms.class_id',
                'class_rooms.teacher_id',
                'class_rooms.school_year',
                'master_classes.name',
                'teachers.nuptk',
                'users.name as teacher_name',
                'users.email as teacher_email',
                'class_rooms.created_at',
            )
            ->where("class_rooms.id", $id)
            ->join('master_classes', 'class_rooms.class_id', 'master_classes.id')
            ->join('teachers', 'class_rooms.teacher_id', 'teachers.id')
            ->join('users', 'teachers.user_id', 'users.id')
            ->first();

            if (!$class_room) {
                return null;
            }
    
            return $class_room;
        } catch (\Throwable $th) {
            return $th;
        }
    }

    public static function m_create($request)
    {
        DB::beginTransaction();
        try {
            $class_id = $request['class_id'];

            if ($class_id == "") {
                $master_class = MasterClass::create($request);

                if (!$master_class) {
                    return null;
                }
                
                $class_id =  $master_class->id;
            }

            $request['class_id'] = $class_id;
  
            $class_room = ClassRoom::create($request);
    
            if (!$class_room) {
                return null;
            }

            DB::commit();
            return $class_room;
        } catch (\Throwable $th) {
            return $th;
        }
    }
}