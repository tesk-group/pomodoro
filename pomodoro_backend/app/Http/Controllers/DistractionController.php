<?php

namespace App\Http\Controllers;

use App\Services\DistractionService;

class DistractionController extends Controller
{
    public function index(DistractionService $distractionService)
    {
        return response()->json($distractionService->all(), 200);
    }

    public function getForTask(DistractionService $distractionService, int $taskId)
    {
        if ($distractions = $distractionService->getForTask($taskId)) {
            return response()->json($distractions, 200);
        }
        
        return response('', 404);
    }
}
