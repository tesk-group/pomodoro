<?php

namespace App\Console\Commands;

use App\Models\Timer;
use Illuminate\Console\Command;

class UpdateTimers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-timers';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Updates all running timers adjusting the status of those that are finished';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Timer::where([
            'status' => 'active',
        ])->where('end_time', '<', now())->update([
            'status' => 'finished',
        ]);
    }
}
