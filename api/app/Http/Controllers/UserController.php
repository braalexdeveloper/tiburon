<?php

namespace App\Http\Controllers;


use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $users = User::where('rol', 'cliente')->get();

            return response()->json(["users" => $users], 200);
        } catch (\Exception $e) {
            // En caso de que ocurra un error, puedes manejarlo retornando un mensaje de error o un código de estado HTTP 500 (error interno del servidor).
            return response()->json(["error" => "Error al obtener usuarios: " . $e->getMessage()], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Definir reglas de validación
            $reglas = [
                'name' => 'required|string',
                'email' => 'required|email|unique:users,email',
                'password' => 'required',
                // Puedes añadir más reglas según sea necesario
            ];

            // Mensajes personalizados para errores de validación en español
            $mensajes = [
                'name.required' => 'El campo nombre es requerido.',
                'name.string' => 'El campo nombre debe ser una cadena de caracteres.',

                'email.required' => 'El campo email es requerido.',
                'email.email' => 'El campo email debe ser una dirección de correo electrónico válida.',
                'email.unique' => 'El correo electrónico ingresado ya está registrado.',

                'password.required' => 'El campo contraseña es requerido.',
                // Puedes personalizar otros mensajes aquí
            ];
            // Validar la solicitud
            $validator = Validator::make($request->all(), $reglas, $mensajes);
            // Comprobar si hay errores de validación
            if ($validator->fails()) {
                return response()->json(['errores' => $validator->errors()], 400);
            }

            $data = $request->all();
            $data['password'] = Hash::make($data['password']);
            $user = User::create($data);

            return response()->json(["message" => "success", "user" => $user], 200);
        } catch (\Exception $e) {
            return response()->json(["error" => "Error al obtener usuarios: " . $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user=User::with('orders')->find($id);
        return response()->json(["message"=>"success","user"=>$user],200);
    }
    

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            // Definir reglas de validación
            $reglas = [
                'name' => 'required|string',
                'email' => 'required|email|unique:users,email,' . $id,

            ];


            // Validar la solicitud
            $validator = Validator::make($request->all(), $reglas);
            // Comprobar si hay errores de validación
            if ($validator->fails()) {
                return response()->json(['errores' => $validator->errors()], 400);
            }
            $user = User::find($id);

            if (!$user) {
                return response()->json(['error' => 'El usuario no se encuentra'], 404);
            }

            $data = $request->all();


            if (empty($data['password'])) {
                $data = Arr::except($data, array('password'));
            }
            $user->update($data);

            return response()->json(["message" => "Usuario  Actualizado", "user" => $user], 200);
        } catch (\Exception $e) {
            return response()->json(["error" => "Error al Actualizar Usuario: " . $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            User::find($id)->delete();
            return response()->json(["message" => "Usuario  Eliminado"], 200);
        } catch (\Exception $e) {
            return response()->json(["error" => "Error al Eliminar Usuario: " . $e->getMessage()], 500);
        }
    }
}
