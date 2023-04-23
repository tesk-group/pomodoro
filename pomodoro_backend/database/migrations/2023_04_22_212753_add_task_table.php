<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('provider')->default('');
            $table->string('task_id');
            $table->unsignedBigInteger('user_id');
            $table->string('name');
            $table->string('url')->nullable();
            $table->boolean('is_done')->default(false);
            $table->timestamps();

            $table->unique(['provider', 'task_id', 'user_id']);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
