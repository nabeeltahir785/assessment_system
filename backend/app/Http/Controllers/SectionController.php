<?php

namespace App\Http\Controllers;

use App\Models\Section;
use App\Services\ApiResponse;
use App\Services\SectionService;

class SectionController extends Controller
{
    protected $sectionService;

    public function __construct(SectionService $sectionService)
    {
        $this->sectionService = $sectionService;
    }

    public function index()
    {
        return ApiResponse::success($this->sectionService->getAllSections());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSectionRequest $request)
    {
        $section = Section::create($request->validated());
        return ApiResponse::created($section, 'Section created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Section $section)
    {
        return ApiResponse::success($section, 'Section created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreSectionRequest $request, Section $section)
    {
        $section->update($request->validated());
        return ApiResponse::success($section, 'Section updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Section $section)
    {
        $section->delete();
        return ApiResponse::deleted($section, 'Section created successfully.');
    }


}
