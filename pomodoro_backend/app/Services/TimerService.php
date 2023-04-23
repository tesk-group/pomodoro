<?php

namespace App\Services;

use App\Models\Timer;
use Illuminate\Support\Facades\Auth;

class TimerService
{
    public function create(int $duration, ?string $type = null, ?int $taskId = null) : ?Timer
    {
        $this->abandonTimers($type);

        if ($taskId) {
            $task = app(TaskService::class)->getById($taskId);

            if (!isset($task) || $task->user_id !== Auth::id()) {
                return null;
            }
        }

        $timer = Auth::user()->timers()->create([
            'duration' => $duration,
            'end_time' => now()->addSeconds($duration),
            'status' => 'active',
            'type' => $type,
            'task_id' => $taskId,
        ]);

        return $timer;
    }

    public function interrupt(string $reason) : bool
    {
        $timer = Auth::user()->timers()->where([
            'status' => 'active',
        ])->first();

        if (!isset($timer)) {
            return false;
        }

        if ($timer->update([
            'status' => 'interrupted',
            'interrupted_at' => now(),
        ])) {
            app(DistractionService::class)->record($timer, $reason);

            return true;
        }

        return false;
    }

    public function resume() : bool
    {
        $timer = Auth::user()->timers()->where([
            'status' => 'interrupted'
        ])->first();

        if (!isset($timer)) {
            return false;
        }

        return $timer->update([
            'status' => 'active',
            'interrupted_at' => null,
            'end_time' => now()->addSeconds($timer->end_time->diffInSeconds($timer->interrupted_at)),
        ]);
    }

    public function abandonTimers()
    {
        Auth::user()->timers()->where(function($query) {
            $query->where('status', 'active')
                ->orWhere('status', 'interrupted');
        })->where(function($query) {
            $query->where('status', '!=', 'active')
                ->orWhere('end_time', '>', now());
        })->update([
            'status' => 'abandoned',
        ]);
    }

    public function finishTimers()
    {
        Auth::user()->timers()->where([
            'status' => 'active',
        ])->where('end_time', '<', now())->update([
            'status' => 'finished',
        ]);
    }

    public function getLastTimer() : ?Timer
    {
        $timer = Auth::user()->timers()->orderBy('id', 'desc')->first();

        if (!isset($timer)) {
            return null;
        }

        return $timer;
    }
}
