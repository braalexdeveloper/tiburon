<?php

namespace App\Http\Controllers;


use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        try {
            $query=Product::query();

            if($request->has('marca')){
                if($request->input('marca')!=""){
                    $marca = $request->input('marca');
                    $query->where('marca',$marca);
                }
                
            }

            $products = $query->paginate(9);

            return response()->json(["products" => $products], 200);
        } catch (\Exception $e) {
            return response()->json(["error" => "Error al listar Productos: " . $e->getMessage()], 500);
        }
    }

    public function productosAleatorios(){
        try{
        $products = Product::inRandomOrder() // Ordena los productos de forma aleatoria
                        ->limit(8) // Obtiene 8 registros aleatorios
                        ->get(); // Ejecuta la consulta y obtiene los productos
    
        return response()->json(["products" => $products], 200);
    } catch (\Exception $e) {
        return response()->json(["error" => "Error al listar Productos: " . $e->getMessage()], 500);
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

            $reglas = [
                'name' => 'required|string',
                'description' => 'required|string',
                'price' => 'required|numeric',
                'stock' => 'required|numeric',
                'marca' => 'required|string',

                'tallas' => 'required|string',
                'categorie_id' => 'required',
            ];

            $validate = Validator::make($request->all(), $reglas);
            if ($validate->fails()) {
                return response()->json(["error" => $validate->errors()], 400);
            }

            if ($request->hasFile("img")) {
                $imagen = $request->file('img');
                $filename = time() . '_' . $imagen->getClientOriginalName();
                $imagen->storeAs('public/products', $filename);
                $request['image'] = asset('storage/products/' . $filename);
            }

            $product = Product::create($request->all());
            return response()->json(["message" => "Producto creado con éxito", "product" => $product], 200);
        } catch (\Exception $e) {
            return response()->json(["error" => "Error al crear Producto: " . $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {

            $product = Product::with('categorie')->find($id);
            $product->makeHidden('categorie', 'categorie_id');
            return response()->json(["product" => $product], 200);
        } catch (\Exception $e) {
            return response()->json(["error" => "Error al mostrar Producto: " . $e->getMessage()], 500);
        }
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

            $reglas = [
                'name' => 'required|string',
                'description' => 'required|string',
                'price' => 'required|numeric',
                'stock' => 'required|numeric',
                'marca' => 'required|string',
                'tallas' => 'required|string',
                
            ];

            $validate = Validator::make($request->all(), $reglas);
            if ($validate->fails()) {
                return response()->json(["error" => $validate->errors()], 400);
            }

            $product = Product::find($id);
            $product->makeHidden('categorie');

            if (!$product) {
                return response()->json(['error' => 'El producto no se encuentra'], 404);
            }
            if ($request->hasFile("img")) {

                if ($product->image && Storage::exists('public/products/' . basename($product->image))) {
                    Storage::delete('public/products/' . basename($product->image));
                }
                $imagen = $request->file('img');
                $filename = time() . '_' . $imagen->getClientOriginalName();
                $imagen->storeAs('public/products', $filename);
                $request['image'] = asset('storage/products/' . $filename);
            }


            $product->update($request->only([
                'name', 'description', 'price', 'stock', 'marca', 'tallas', 'image','categorie_id'
            ]));

            return response()->json(["message" => "Producto creado con éxito", "product" => $product], 200);
        } catch (\Exception $e) {
            return response()->json(["error" => "Error al crear Producto: " . $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            Product::find($id)->delete();
            return response()->json(["message" => "Producto eliminado"], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error interno del servidor :' . $e->getMessage()], 500);
        }
    }
}
