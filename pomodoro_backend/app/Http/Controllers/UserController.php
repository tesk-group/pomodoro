<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function register(Request $request, UserService $userService)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|unique:users',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        if ($user = $userService->register($request->username, $request->email, $request->password)) {
            return response()->json($user, 201);
        }

        return response('', 500);
    }

    public function login(Request $request, UserService $userService)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        if ($signInData = $userService->login($request->email, $request->password)) {
            return response()->json($signInData, 200);
        }

        return response()->json([
            'errors' => 'The provided credentials are incorrect.'
        ], 400);
    }

    public function logout(UserService $userService)
    {
        $userService->logout();

        return response('', 200);
    }

    public function getUserData(UserService $userService)
    {
        if ($userData = $userService->getUserData()) {
            return response()->json($userData);
        }

        return response('', 400);
    }
}
