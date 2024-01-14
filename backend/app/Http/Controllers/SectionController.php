<?php

namespace App\Http\Controllers;

use App\Models\Section;
class SectionController extends Controller
{
    public function index()
    {
        return $this->sendResponse(Section::all(), 'Sections retrieved successfully.');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSectionRequest $request)
    {
        $section = Section::create($request->validated());
        return $this->sendResponse($section, 'Section created successfully.', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Section $section)
    {
        return $this->sendResponse($section, 'Section retrieved successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreSectionRequest $request, Section $section)
    {
        $section->update($request->validated());
        return $this->sendResponse($section, 'Section updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Section $section)
    {
        $section->delete();
        return $this->sendResponse([], 'Section deleted successfully.');
    }

    /**
     * Send a JSON response.
     */
    protected function sendResponse($data, $message, $code = 200)
    {
        return response()->json([
            'message' => $message,
            'data' => $data
        ], $code);
    }
}
