<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('attempts', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('assessment_id')->constrained()->onDelete('cascade');

            // Prevent duplicate attempts by the same user on the same assessment
            $table->unique(['user_id', 'assessment_id']);
        });
    }

    public function down(): void
    {
        Schema::table('attempts', function (Blueprint $table) {
            $table->dropUnique(['user_id', 'assessment_id']);
            $table->dropForeign(['assessment_id']);
            $table->dropForeign(['user_id']);
            $table->dropColumn(['user_id', 'assessment_id']);
        });
    }
};
