<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserAuth extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'provider',
        'provider_id',
        'oauth_token',
        'oauth_token_secret',
        'oauth_refresh_token',
        'oauth_expires_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
