<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Distraction extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'timer_id',
        'reason',
    ];

    public function timer()
    {
        return $this->belongsTo(Timer::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
