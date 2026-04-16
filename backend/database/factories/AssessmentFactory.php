<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class AssessmentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(4),
            'description' => $this->faker->paragraph(),
            'attempt_count' => 0,
        ];
    }
}
