<?php

namespace App\Services;

use App\Models\UserAuth;
use App\Services\Interfaces\TaskSyncInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class TrelloService implements TaskSyncInterface
{
    public function sync()
    {
        $user = Auth::user();
        $userAuth = $user->userAuths()->where('provider', 'trello')->first();

        if (!isset($userAuth)) {
            return false;
        }
        
        $headers = $this->generateHeaders($userAuth);

        $response = Http::get($this->getBaseUrl().'/members/me/cards', [
            'key' => config('services.trello.client_id'),
            'token' => $userAuth->oauth_token,
        ], $headers);

        if ($response->failed()) {
            return false;
        }

        $cards = $response->json();
        
        if (isset($cards)) {
            foreach ($cards as $card) {
                $isTaskDone = false;

                foreach ($cards['labels'] ?? [] as $label) {
                    if (strtolower(trim($label['name'] ?? '')) == 'done') {
                        $isTaskDone = true;
                        break;
                    }
                }

                $user->tasks()->updateOrCreate([
                    'provider' => 'trello',
                    'task_id' => $card['id'],
                ], [
                    'user_id' => $user->id,
                    'name' => $card['name'],
                    'url' => $card['url'] ?? '',
                    'is_done' => $isTaskDone,
                ]);
            }

            return true;
        }

        return false;
    }

    protected function generateHeaders(UserAuth $userAuth) : array
    {
        return [
            'Authorization' => 'OAuth oauth_consumer_key="' . config('services.trello.client_id') . '", oauth_token="' . $userAuth->oauth_token . '"',
        ];
    }

    protected function getBaseUrl() : string
    {
        return 'https://api.trello.com/1';
    }
}
