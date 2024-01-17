<?php

namespace App\Http\Controllers;

use App\Models\Order;

use App\Models\OrderProduct;
use Illuminate\Http\Request;
use PhpParser\Node\Stmt\TryCatch;
use Stripe\Customer;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
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


            // Configura la clave secreta de Stripe
            Stripe::setApiKey(env('STRIPE_SECRET'));

            $customer = Customer::create([
                'name' => $request->name, // Nombre del cliente
                // Otros campos según sea necesario
            ]);

            // Obtiene el ID del cliente
            $customerId = $customer->id;

            // Crea un pago con Stripe
            $paymentIntent = PaymentIntent::create([
                'amount' => $request->amount,  // Monto en centavos
                'currency' => 'usd',
                'payment_method' => $request->input('payment_method_id'),
                //'confirmation_method' => 'manual',
                'confirm' => true,
                'automatic_payment_methods' => [
                    'enabled' => true,
                    'allow_redirects' => 'never',
                ],
                'description' => 'Compra de Zapatillas',
                'customer' => $customerId,
            ]);

            if ($paymentIntent->status === 'succeeded') {

                $orden = Order::create($request->all());

                $products = $request->products;
                foreach ($products as $product) {
                    $orderDetail = new OrderProduct();
                    $orderDetail->order_id = $orden->id;
                    $orderDetail->product_id = $product['id']; // Acceder como array asociativo
                    $orderDetail->count = $product['quantity'];
                    $orderDetail->price = $product['price'];
                    $orderDetail->subtotal = $product['subtotal'];
                    $orderDetail->save();
                }


                return response()->json(["message" => "Compra realizada Éxito!"], 200);
            } else {
                // El pago no fue exitoso, manejar según sea necesario
                return response()->json(["error" => "Error en el estado del PaymentIntent"], 500);
            }
        } catch (\Stripe\Exception\ApiErrorException $e) {
            // Manejar errores de la API de Stripe
            return response()->json(["error" => $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(["error" => $e->getMessage()], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try{
            $order = Order::with('ordersDetails.product')->find($id);
            return response()->json(["message" => "success", "order" => $order], 200);
        } catch (\Exception $e) {
            return response()->json(["error" => $e->getMessage()], 500);
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
