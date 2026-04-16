<?php

namespace App\Contracts\Repositories;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;

interface BaseRepositoryInterface
{
    /**
     * Retrieve all records.
     */
    public function getAll(): Collection;

    /**
     * Find a record by ID or throw ModelNotFoundException.
     */
    public function findOrFail(int $id): Model;

    /**
     * Create a new record.
     */
    public function create(array $data): Model;

    /**
     * Update an existing record.
     */
    public function update(Model $model, array $data): Model;

    /**
     * Delete a record.
     */
    public function delete(Model $model): bool;
}
