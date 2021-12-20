<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ClassRoomStudent extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'student_id',
        'class_room_id',
    ];


    public static function m_get_all($limit, $class_room_id)
    {
        try {
            $result = ClassRoomStudent::select(
                'class_room_students.id',
                'users.name as student_name',
                'students.nis',
                'users.email as student_email'
            )->orderBy('users.name', "asc")
            ->where("class_room_students.class_room_id", $class_room_id)
            ->join('class_rooms', 'class_room_students.class_room_id', 'class_rooms.id')
            ->join('students', 'class_room_students.student_id', 'students.id')
            ->join('users', 'students.user_id', 'users.id')
            ->paginate($limit);
    

            if (!$result) {
                return null;
            }
        
            return $result;
        } catch (\Throwable $th) {
            return $th;
        }
    }
}