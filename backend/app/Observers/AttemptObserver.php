<?php

namespace App\Observers;

use App\Models\Attempt;

class AttemptObserver
{
    /**
     * Fired after an Attempt is created.
     */
    public function created(Attempt $attempt): void
    {
        $attempt->assessment()->increment('attempt_count');
    }

    /**
     * Fired after an Attempt is deleted.
     */
    public function deleted(Attempt $attempt): void
    {
        $attempt->assessment()->decrement('attempt_count');
    }
}
