<?php

namespace App\Http\Controllers;

use App\Services\OAuthService;

class OAuthController extends Controller
{
    const SUPPORTED_SERVICES = [
        'trello'
    ];

    public function endpoint(string $service, OAuthService $oauthService)
    {
        if (!in_array($service, static::SUPPORTED_SERVICES)) {
            return response('', 404);
        }

        return response()->json([
            'endpoint' => $oauthService->generateEndpoint($service)
        ],  200);
    }

    public function redirect(string $service, OAuthService $oauthService)
    {
        if (!in_array($service, static::SUPPORTED_SERVICES)) {
            return response('', 404);
        }

        return $oauthService->getRedirect($service);
    }

    public function callback(string $service, OAuthService $oauthService)
    {
        if (!in_array($service, static::SUPPORTED_SERVICES)) {
            return response('', 404);
        }

        $oauthService->handleCallback($service);

        return redirect(config('app.frontend_url'));
    }
}
