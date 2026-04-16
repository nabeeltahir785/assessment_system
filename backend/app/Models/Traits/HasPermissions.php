<?php

namespace App\Models\Traits;

use App\Models\Role;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

trait HasPermissions
{
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class);
    }

    /**
     * Check if the user has a specific role by name.
     */
    public function hasRole(string $role): bool
    {
        return $this->roles()->where('name', $role)->exists();
    }

    /**
     * Check if the user has a specific permission through any of their roles.
     *
     * Uses eager-loaded roles to avoid N+1 queries when called in loops.
     */
    public function hasPermission(string $permission): bool
    {
        return $this->roles
            ->flatMap->permissions
            ->contains('name', $permission);
    }

    /**
     * Get all permissions across all roles (flattened, unique).
     */
    public function getAllPermissions()
    {
        return $this->roles->flatMap->permissions->unique('id');
    }
}
