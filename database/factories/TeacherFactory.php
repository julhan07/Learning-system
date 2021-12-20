<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class TeacherFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nuptk' => $this->faker->randomDigitNot(10),
            'place_of_birth' => $this->faker->state(),
            'date_of_birth' => $this->faker->dateTime(),
            'position' => 'Guru',
            'gender' => "L",
            'address' => $this->faker->address(),
            'user_id' => 1,
        ];
    }
}