<?php

namespace Database\Factories;

use App\Models\Assessment;
use Illuminate\Database\Eloquent\Factories\Factory;

class SectionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            // The junction table attachment makes factory-created assessments separate, 
            // but we can default create one if needed, though typically sections are attached via pivot.
        ];
    }
}
