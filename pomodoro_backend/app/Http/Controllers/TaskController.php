<?php

namespace App\Http\Controllers;

use App\Services\TaskService;
use App\Services\TrelloService;

class TaskController extends Controller
{
    const SUPPORTED_SERVICES = [
        'trello' => TrelloService::class
    ];

    public function index(TaskService $taskService)
    {
        return response()->json($taskService->getTasks(), 200);
    }

    public function sync(string $service, TaskService $taskService)
    {
        if (!isset(static::SUPPORTED_SERVICES[$service])) {
            return response('', 404);
        }

        if (app(static::SUPPORTED_SERVICES[$service])->sync()) {
            return response()->json($taskService->getTasks(), 200);
        }

        return response('', 400);
    }
}
