<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Categorie;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        Categorie::create([
            'name' => 'Urbanas',
            'description' => 'Son para la calle',
        ]);

        Categorie::create([
            'name' => 'Deportivas',
            'description' => 'Son para hacer deporte',
        ]);

        Categorie::create([
            'name' => 'Vestir',
            'description' => 'Son para ocasiones elegantes',
        ]);

        User::create([
            'name' => 'brayan',
            'lastName'=>'quispe rivas',
            'email' => 'brayan@gmail.com',
            'password' => bcrypt('brayan123'),
            'rol'=>'admin'
        ]);

        User::create([
            'name' => 'tati',
            'lastName'=>'quispe rivas',
            'email' => 'tati@gmail.com',
            'password' => bcrypt('tati123'),
            'rol'=>'cliente'
        ]);

        $this->call(ProductSeeder::class);
    }
}
