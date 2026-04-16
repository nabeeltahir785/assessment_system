<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSectionRequest;
use App\Models\Section;
use App\Services\SectionService;
use Illuminate\Http\JsonResponse;
use ApiResponse;

class SectionController extends Controller
{
    public function __construct(
        private readonly SectionService $sectionService
    ) {}

    /**
     * List all sections.
     */
    public function index(): JsonResponse
    {
        return ApiResponse::success($this->sectionService->getAllSections());
    }

    /**
     * Store a newly created section.
     */
    public function store(StoreSectionRequest $request): JsonResponse
    {
        $section = $this->sectionService->createSection($request->validated());

        return ApiResponse::created($section, 'Section created successfully.');
    }

    /**
     * Display the specified section.
     */
    public function show(Section $section): JsonResponse
    {
        return ApiResponse::success($section, 'Section retrieved successfully.');
    }

    /**
     * Update the specified section.
     */
    public function update(StoreSectionRequest $request, Section $section): JsonResponse
    {
        $updated = $this->sectionService->updateSection($section, $request->validated());

        return ApiResponse::success($updated, 'Section updated successfully.');
    }

    /**
     * Remove the specified section.
     */
    public function destroy(Section $section): JsonResponse
    {
        $this->sectionService->deleteSection($section);

        return ApiResponse::deleted('Section deleted successfully.');
    }
}
