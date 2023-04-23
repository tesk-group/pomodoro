<?php

namespace App\Services;

use App\Models\Distraction;
use App\Models\Timer;

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
}
