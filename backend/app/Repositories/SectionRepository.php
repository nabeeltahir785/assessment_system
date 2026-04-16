<?php

namespace App\Repositories;

use App\Contracts\Repositories\SectionRepositoryInterface;
use App\Models\Section;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class SectionRepository implements SectionRepositoryInterface
{
    public function getAll(): Collection
    {
        return Section::all();
    }

    public function findOrFail(int $id): Model
    {
        return Section::findOrFail($id);
    }

    public function create(array $data): Model
    {
        return Section::create($data);
    }

    public function update(Model $model, array $data): Model
    {
        $model->update($data);

        return $model;
    }

    public function delete(Model $model): bool
    {
        return $model->delete();
    }
}
