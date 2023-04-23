<?php

namespace App\Http\Controllers;

use App\Services\StatisticsService;

class StatisticsController extends Controller
{
    public function get(StatisticsService $statisticsService)
    {
        $statistics = $statisticsService->getGlobalStatistics();
        return response()->json($statistics, 200);
    }

    public function getForTask(StatisticsService $statisticsService, int $taskId)
    {
        if ($statistics = $statisticsService->getTaskStatistics($taskId)) {
            return response()->json($statistics, 200);
        }
        
        return response('', 404);
    }
}
