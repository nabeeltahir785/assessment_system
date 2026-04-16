<?php

namespace App\Providers;

use App\Contracts\Repositories\AssessmentRepositoryInterface;
use App\Contracts\Repositories\SectionRepositoryInterface;
use App\Repositories\AssessmentRepository;
use App\Repositories\SectionRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Repository bindings — DIP
        $this->app->bind(SectionRepositoryInterface::class, SectionRepository::class);
        $this->app->bind(AssessmentRepositoryInterface::class, AssessmentRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
