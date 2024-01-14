<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use HasFactory;
    protected $fillable = ['title','description'];

    public function assessments()
    {
        return $this->belongsToMany(Assessment::class, 'assessment_section');
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }
}
