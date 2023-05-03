<?php

namespace App\Services;

use App\Models\Distraction;
use App\Models\Timer;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

class DistractionService
{
    public function record(Timer $timer, string $reason)
    {
        Distraction::create([
            'user_id' => $timer->user_id,
            'timer_id' => $timer->id,
            'reason' => $reason,
        ]);
    }

    public function all() : Collection
    {
        $timeStart = now()->subDays(14)->startOfDay();
        return Auth::user()->distractions()
            ->where('created_at', '>=', $timeStart)->get();
    }

    public function getForTask(int $taskId) : ?Collection
    {
        $task = app(TaskService::class)->getById($taskId);

        if (!isset($task) || $task->user_id !== Auth::id()) {
            return null;
        }

        $timeStart = now()->subDays(14)->startOfDay();
        return Auth::user()->distractions()
            ->where('created_at', '>=', $timeStart)
            ->whereHas('timer', function ($query) use ($taskId) {
                $query->where('task_id', $taskId);
            })->get();
    }
}
