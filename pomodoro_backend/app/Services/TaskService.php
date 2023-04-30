<?php

namespace App\Services;

use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TaskService
{
    public function getById(int $id) : ?Task
    {
        return Task::where('id', $id)->first();
    }

    public function getTasks()
    {
        $user = Auth::user();

        return $user->tasks()->get();
    }
}
