<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class School extends Model
{
    use HasFactory;
    protected $guarded = [];


    public function adminstration()
    {
        return $this->belongsTo(Adminstration::class);
    }

    public function Manager()
    {
        return $this->hasOne(SchoolManager::class);
    }

    public function Events()
    {
        return $this->belongsToMany(AdEvent::class);
    }

}
