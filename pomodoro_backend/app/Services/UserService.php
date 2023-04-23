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

    public function login(string $email, string $password) : ?string
    {
        if (Auth::attempt(['email' => $email, 'password' => $password])) {
            $user = Auth::user();
            $token = $user->createToken('authToken', ['*'], now()->addMinutes(60))->plainTextToken;

            return $token;
        }

        return null;
    }

    public function logout()
    {
        Auth::user()->tokens()->delete();
    }
}
