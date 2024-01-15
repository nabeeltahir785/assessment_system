<?php


namespace App\Interfaces\SectionRepositoryInterface;

use App\Models\Section;

interface SectionRepositoryInterface
{
    public function create(array $data);
    public function getAll();
    public function update(Section $section,array $data);
    public function delete(Section $section);
}
