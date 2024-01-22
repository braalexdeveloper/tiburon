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

        $userFound=User::where('email',request()->email)->first();

        if($userFound){
         // Generar un token JWT para el nuevo usuario
        $token = JWTAuth::fromUser($userFound);

        return response()->json(["message" => "Usuario Google Logueado", "user" => $userFound,"token" => $token], 201);
        }
        if ($validator->fails()) {
            return response()->json(["error" => $validator->errors()->toJson()], 400);
        }

        $user = new User();
        $user->name = request()->name;
        $user->lastName = request()->lastName;
        $user->email = request()->email;
        //$user->direccion = request()->direccion;
        $user->password = bcrypt(request()->password);

        $user->save();

        // Generar un token JWT para el nuevo usuario
        $token = JWTAuth::fromUser($user);

        return response()->json(["message" => "Usuario Creado Correctamente", "user" => $user,"token" => $token], 201);
    }

    public function login(Request $request)
    {
        try {
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
            ], 200);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    } catch (\Exception $e) {
        return response()->json(["error" => $e->getMessage()], 500);
    }
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
