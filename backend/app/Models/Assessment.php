<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Assessment extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'attempt_count',
    ];

    protected $casts = [
        'attempt_count' => 'integer',
    ];

    public function sections(): BelongsToMany
    {
        return $this->belongsToMany(Section::class, 'assessment_section');
    }

    public function attempts(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Attempt::class);
    }
}
