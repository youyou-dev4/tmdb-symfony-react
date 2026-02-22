<?php

namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;


# Service responsable de la communication avec l'API TMDB
 
 

class TmdbService
{
    private HttpClientInterface $client;
    private string $apiKey;

    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;
        $this->apiKey = $_ENV['TMDB_API_KEY'];
    }

    public function getTopRatedMovies(): array
    {
        try {
            $response = $this->client->request(
                'GET',
                'https://api.themoviedb.org/3/movie/top_rated',
                [
                    'query' => [
                        'api_key' => $this->apiKey,
                        'language' => 'fr-FR',
                        'page' => 1
                    ]
                ]
            );

            $data = $response->toArray();

            return $data['results'] ?? [];

        } catch (\Exception $e) {
            return [];
        }
    }
    public function getTopRatedTv(): array
    {
        try {
            $response = $this->client->request(
                'GET',
                'https://api.themoviedb.org/3/tv/top_rated',
                [
                    'query' => [
                        'api_key' => $this->apiKey,
                        'language' => 'fr-FR',
                        'page' => 1
                    ]
                ]
            );

            $data = $response->toArray();

            return $data['results'] ?? [];
        } catch (\Exception $e) {
            return [];
        }
    }
}