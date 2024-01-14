<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Passport\Passport;
use Illuminate\Support\Facades\Gate;
class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();
        Passport::tokensExpireIn(now()->addDays(config('auth.passport.token_expiry_days')));
        Passport::refreshTokensExpireIn(now()->addDays(config('auth.passport.refresh_token_expiry_days')));
        Passport::personalAccessTokensExpireIn(now()->addMonths(config('auth.passport.personal_access_token_expiry_months')));

        Gate::define('create_assessment', function ($user) {
            return $user->hasPermission('create_assessment');
        });
    }
}
