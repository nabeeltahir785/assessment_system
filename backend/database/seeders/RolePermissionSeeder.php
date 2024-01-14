<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::where('name', 'admin')->first();
        $studentRole = Role::where('name', 'student')->first();

        $createAssessmentPermission = Permission::where('name', 'create_assessment')->first();
        $attemptAssessmentPermission = Permission::where('name', 'attempt_assessment')->first();

        $adminRole->permissions()->attach([$createAssessmentPermission->id, $attemptAssessmentPermission->id]);
        $studentRole->permissions()->attach($attemptAssessmentPermission->id);
    }
}
