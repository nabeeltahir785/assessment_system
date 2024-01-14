<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::where('name', 'admin')->first();

        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@metaschool.so',
            'password' => bcrypt('admin'),
        ]);
        $admin->roles()->attach($adminRole);


        $studentRole = Role::where('name', 'student')->first();
        $student1 = User::create([
            'name' => 'Student User 1',
            'email' => 'student_user_1@metaschool.so',
            'password' => bcrypt('student'),
        ]);
        $student1->roles()->attach($studentRole);

        $student2 = User::create([
            'name' => 'Student User 2',
            'email' => 'student_user_2@metaschool',
            'password' => bcrypt('student'),
        ]);
        $student2->roles()->attach($studentRole);
    }
}
