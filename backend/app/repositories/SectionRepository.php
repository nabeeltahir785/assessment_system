<?php

namespace App\Repositories;


use App\Interfaces\SectionRepositoryInterface;
use App\Models\Section;

class SectionRepository implements SectionRepositoryInterface
{
    public function getAll()
    {
        return Section::all();
    }

    public function create(array $data)
    {
        return Section::create($data);
    }

    public function update(Section $section, array $data)
    {
        $section->update($data);
        return $section;
    }

    public function delete(Section $section)
    {
        $section->delete();
    }
}
