<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class OAuthService
{
    public function generateEndpoint(string $service) : string
    {
        $user = Auth::user();
        $token = $user->createToken('oauth', ['*'], now()->addMinutes(1))->plainTextToken;

        return route('oauth.redirect', [
            'service' => $service,
            'token' => $token,
        ]);
    }

    public function getRedirect(string $service)
    {
        $redirect = Socialite::driver($service)->with(['expiration' => 'never'])->redirect();

        $query = parse_url($redirect->getTargetUrl(), PHP_URL_QUERY);
        parse_str($query, $query);

        $user = Auth::user();
        $user->oauth_state = ($query['state'] ?? $query['oauth_token']) ?? '';
        $user->save();

        return $redirect;
    }

    public function handleCallback(?string $service = null) : ?array
    {
        $query = parse_url(request()->fullUrl(), PHP_URL_QUERY);
        parse_str($query, $query);

        $user = User::where('oauth_state', ($query['state'] ?? $query['oauth_token']) ?? '')->first();

        if (!$user || strlen(trim($user->oauth_state)) === 0) {
            return null;
        }

        $user->oauth_state = '';
        $user->save();

        $socialiteUser = Socialite::driver($service)->user();
        
        // @todo: Handle OAuth2 in the future. Trello only uses OAuth1 so not bothering with this now.
        $user->userAuths()->updateOrCreate([
            'provider' => $service,
            'provider_id' => $socialiteUser->id,
        ], [
            'user_id' => $user->id,
            'oauth_token' => $socialiteUser->token,
            'oauth_token_secret' => $socialiteUser->tokenSecret,
        ]);

        return [
            'user' => $user,
            'socialiteUser' => $socialiteUser
        ];
    }
}
