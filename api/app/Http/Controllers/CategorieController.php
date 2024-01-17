<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories=Categorie::all();
        return response()->json(["categories"=>$categories],200);
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
        $reglasValidations=[
          'name'=>'required|string|max:20'
        ];

        $validation=Validator::make($request->all(),$reglasValidations);
        if($validation->fails()){
          return response()->json(["error"=>$validation->errors()],400);
        }

        $categorie=Categorie::create($request->all());
        return response()->json(["message"=>"Categoria creada correctamente","categorie"=>$categorie],400);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
        $reglasValidations=[
            'name'=>'required|string|max:20'
          ];
  
          $validation=Validator::make($request->all(),$reglasValidations);
          if($validation->fails()){
            return response()->json(["error"=>$validation->errors()],400);
          }
  
          $categorie=Categorie::find($id);
          $categorie->update($request->all());
          return response()->json(["message"=>"Categoria actualizada correctamente","categorie"=>$categorie],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Categorie::find($id)->delete();
        return response()->json(["message"=>"Categoria eliminada correctamente"],200);
    }
}
