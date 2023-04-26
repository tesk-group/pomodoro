<?php

namespace App\Http\Middleware;

use Closure;
use App\Services\TimerService;
use Illuminate\Http\Request;

class FinishTimers
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     *
     * @throws \Symfony\Component\HttpKernel\Exception\HttpException
     */
    public function handle(Request $request, Closure $next)
    {
        if ($request->user()) {
            app(TimerService::class)->finishTimers();
        }

        return $next($request);
    }
}
