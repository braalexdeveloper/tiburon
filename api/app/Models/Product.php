<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $guarded=[
        'id',
        'created_at',
        'updated_at'
    ];

    protected $appends=['categorie_name'];

    public function categorie(){
        return $this->belongsTo(Categorie::class);
    }

    // Atributo virtual para obtener el nombre de la categoría
    public function getCategorieNameAttribute()
    {
        return $this->categorie->name ?? null;
    }
}
