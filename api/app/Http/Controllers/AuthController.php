<?php

namespace App\Http\Controllers;

use App\Models\User;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{

    public function register()
    {
        $validator = Validator::make(request()->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
           
        ]);

        if ($validator->fails()) {
            return response()->json(["error"=>$validator->errors()->toJson()], 400);
        }

        $user = new User();
        $user->name = request()->name;
        $user->email = request()->email;
        $user->password = bcrypt(request()->password);
        
        $user->save();

        return response()->json(["message" => "Usuario Creado Correctamente", "user" => $user], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if ($token = JWTAuth::attempt($credentials)) {
            $user = Auth::user();
            // Obtener la duración de vida del token en minutos
            $ttl = JWTAuth::factory()->getTTL();

            // Calcular la fecha de expiración sumando el TTL al tiempo actual
            $expiration = now()->addMinutes($ttl);

            return response()->json([
                'token' => $token,
                'token_type' => 'bearer',
                'expires_at' => $expiration,
                'user' => $user
            ],200);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function me()
{
    try {
        $user = JWTAuth::parseToken()->authenticate();
        return response()->json(["user" => $user], 200);
    } catch (\Exception $e) {
        return response()->json(["error" => $e->getMessage()], 401);
    }
}

    public function logout(Request $request)
{
    // Obtener el token del encabezado Authorization
    $token = $request->bearerToken();

    // Invalidar el token y forzar el logout
    JWTAuth::setToken($token)->invalidate();

    // Hacer logout del usuario actual
    Auth::logout();

    return response()->json(['message' => 'Successfully logged out']);
}
}
