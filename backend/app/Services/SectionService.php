<?php


namespace App\Services;

use App\Repositories\SectionRepository;

class SectionService
{
    protected $sectionRepository;

    public function __construct(SectionRepository $sectionRepository)
    {
        $this->sectionRepository = $sectionRepository;
    }

    public function getAllSections()
    {
        return $this->sectionRepository->getAll();
    }

    public function createSection(array $data)
    {
        return $this->sectionRepository->create($data);
    }

    public function updateSection(Section $section, array $data)
    {
        return $this->sectionRepository->update($section, $data);
    }

    public function deleteSection(Section $section)
    {
        $this->sectionRepository->delete($section);
    }
}
