<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Timer extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'task_id',
        'status',
        'type',
        'end_time',
        'interrupted_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'end_time' => 'datetime',
        'interrupted_at' => 'datetime',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function distractions()
    {
        return $this->hasMany(Distraction::class);
    }

    public function getStatusAttribute($value)
    {
        if ($value === 'active' && now()->isAfter($this->end_time)) {
            $this->update([
                'status' => 'finished',
            ]);

            return 'finished';
        }

        return $value;
    }
}
