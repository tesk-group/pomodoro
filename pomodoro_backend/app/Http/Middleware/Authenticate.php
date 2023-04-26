<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Authenticate extends Middleware
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return Response|RedirectResponse
     */
    public function handle($request, Closure $next, ...$guards)
    {
        if (isset($request->token)) {
            $request->headers->set('Authorization', sprintf('%s %s', 'Bearer', $request->token));
        }

        $next = parent::handle($request, $next, ...$guards);

        if (Auth::guard('sanctum')->check()) {
            if ($request->user()->currentAccessToken()->name === 'oauth') {
                $request->user()->currentAccessToken()->delete();
            } else {
                $request->user()->currentAccessToken()->expires_at = now()->addMinutes(60);
                $request->user()->currentAccessToken()->save();
            }
        }

        return $next;
    }

    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        return null;
    }
}
