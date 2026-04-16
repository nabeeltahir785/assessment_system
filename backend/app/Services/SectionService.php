<?php

namespace App\Services;

use App\Contracts\Repositories\SectionRepositoryInterface;
use App\Models\Section;
use Illuminate\Database\Eloquent\Collection;

class SectionService
{
    public function __construct(
        private readonly SectionRepositoryInterface $sectionRepository
    ) {}

    public function getAllSections(): Collection
    {
        return $this->sectionRepository->getAll();
    }

    public function createSection(array $data): Section
    {
        return $this->sectionRepository->create($data);
    }

    public function updateSection(Section $section, array $data): Section
    {
        return $this->sectionRepository->update($section, $data);
    }

    public function deleteSection(Section $section): bool
    {
        return $this->sectionRepository->delete($section);
    }
}
