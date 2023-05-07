<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function register(string $username, string $email, string $password) : ?User
    {
        $user = User::create([
            'username' => $username,
            'email' => $email,
            'password' => Hash::make($password)
        ]);

        return $user;
    }

    public function login(string $email, string $password) : ?array
    {
        if (Auth::attempt(['email' => $email, 'password' => $password])) {
            $user = Auth::user();
            $token = $user->createToken('authToken', ['*'], now()->addMinutes(60))->plainTextToken;

            return [
                'token' => $token,
                'username' => $user->username,
                'linked_providers' => $this->getLinkedProviders()
            ];
        }

        return null;
    }

    public function logout()
    {
        Auth::user()->tokens()->delete();
    }

    public function getUserData(): ?Array
    {
        $user = Auth::user();

        if ($user) {
            return [
                'username' => $user->username,
                'linked_providers' => $this->getLinkedProviders()
            ];
        }

        return null;
    }

    public function getLinkedProviders(): Array
    {
        $user = Auth::user();
        $linkedServices = [];

        if ($user) {
            $userAuthentications = $user->userAuths()->get();
            
            foreach ($userAuthentications as $userAuth) {
                $linkedServices[] = $userAuth->provider;
            }

            $linkedServices = array_unique($linkedServices);
        }

        return $linkedServices;
    }
}
