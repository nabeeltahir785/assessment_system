<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->call([
            RolesTableSeeder::class,
            PermissionsTableSeeder::class,
            RolePermissionSeeder::class,
            UsersTableSeeder::class,
            AssessmentsSeeder::class,
        ]);
    }
}
