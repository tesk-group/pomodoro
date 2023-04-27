<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;

class StatisticsService
{
    public function getGlobalStatistics() : array
    {
        $statistics = [
            'total' => 0,
            'finished' => 0,
            'interrupted' => 0,
            'abandoned' => 0,
        ];

        $timeStart = now()->subDays(14)->startOfDay();
        $statistics['total'] = Auth::user()->timers()->where('type', 'pomodoro')
            ->where('created_at', '>=', $timeStart)->count();
        $statistics['finished'] = Auth::user()->timers()->where('type', 'pomodoro')
            ->where('status', 'finished')
            ->where('created_at', '>=', $timeStart)->count();
        $statistics['interrupted'] = Auth::user()->timers()->where('type', 'pomodoro')
            ->where('status', '!=', 'abandoned')
            ->where('created_at', '>=', $timeStart)
            ->withCount('distractions')
            ->get()
            ->sum('distractions_count');
        $statistics['abandoned'] = Auth::user()->timers()->where('type', 'pomodoro')
            ->where('status', 'abandoned')
            ->where('created_at', '>=', $timeStart)->count();
        
        return $statistics;
    }

    public function getTaskStatistics(int $taskId) : array
    {
        if ($taskId) {
            $task = app(TaskService::class)->getById($taskId);

            if (!isset($task) || $task->user_id !== Auth::id()) {
                return null;
            }

            $statistics = [
                'total' => 0,
                'finished' => 0,
                'interrupted' => 0,
                'abandoned' => 0,
            ];

            $timeStart = now()->subDays(14)->startOfDay();
            $statistics['total'] = Auth::user()->timers()->where('type', 'pomodoro')
                ->where('task_id', $taskId)
                ->where('created_at', '>=', $timeStart)->count();
            $statistics['finished'] = Auth::user()->timers()->where('type', 'pomodoro')
                ->where('task_id', $taskId)
                ->where('status', 'finished')
                ->where('created_at', '>=', $timeStart)->count();
            $statistics['interrupted'] = Auth::user()->timers()->where('type', 'pomodoro')
                ->where('task_id', $taskId)
                ->where('status', '!=', 'abandoned')
                ->where('created_at', '>=', $timeStart)
                ->withCount('distractions')
                ->get()
                ->sum('distractions_count');
            $statistics['abandoned'] = Auth::user()->timers()->where('type', 'pomodoro')
                ->where('task_id', $taskId)
                ->where('status', 'abandoned')
                ->where('created_at', '>=', $timeStart)->count();

            return $statistics;
        }
        return null;
    }
}
