<?php

namespace App\Http\Controllers;

use App\Services\TimerService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TimerController extends Controller
{
    public function create(Request $request, TimerService $timerService)
    {
        $validator = Validator::make($request->all(), [
            'duration' => 'required|integer',
            'type' => 'required|string|in:break,pomodoro',
            'task_id' => 'required_if:type,pomodoro|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        if ($timer = $timerService->create($request->duration, $request->type, $request->task_id)) {
            return response()->json($timer, 201);
        }

        return response('', 400);
    }

    public function get(TimerService $timerService)
    {
        $timer = $timerService->getLastTimer();

        if (!isset($timer)) {
            return response('', 404);
        }

        return response()->json($timer, 200);
    }

    public function interrupt(Request $request, TimerService $timerService)
    {
        $validator = Validator::make($request->all(), [
            'reason' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        if ($timerService->interrupt($request->reason)) {
            return response()->json($timerService->getLastTimer(), 200);
        }

        return response('', 400);
    }

    public function resume(TimerService $timerService)
    {
        if ($timerService->resume()) {
            return response()->json($timerService->getLastTimer(), 200);
        }

        return response('', 400);
    }
}
