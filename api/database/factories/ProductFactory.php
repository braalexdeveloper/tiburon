<?php

namespace Database\Factories;

use App\Models\Categorie;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition()
    {
        return [
            'name' => $this->faker->word,
            'description' => $this->faker->sentence,
            'price' => $this->faker->randomFloat(2, 10, 1000),
            'stock' => $this->faker->numberBetween(0, 100),
            'marca' => $this->faker->word,
            'categorie_id' => Categorie::inRandomOrder()->first()->id,
            'image' => $this->faker->imageUrl(),
            'tallas' => $this->faker->randomElement(['S', 'M', 'L', 'XL']),
        ];
    }
}

