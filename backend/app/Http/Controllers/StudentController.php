<?php

namespace App\Http\Controllers;

use App\Models\Assessment;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    //

    public function getAllAssessments(){
        return response()->json(['assessments' => Assessment::all()]);
    }

    public function findAssessment($id){
        $assessment = Assessment::with('sections.questions')->find($id);

        if (!$assessment) {
            return response()->json(['message' => 'Assessment not found'], 404);
        }

        return response()->json(['assessment' => $assessment]);
    }
}
