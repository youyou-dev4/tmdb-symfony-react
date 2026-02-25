<?php

namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;


# Service responsable de la communication avec l'API TMDB
 
 

class TmdbService
{
    private HttpClientInterface $client;
    private string $apiKey;

    public function __construct( HttpClientInterface $client, string $tmdbApiKey)
    {
        $this->client = $client;
        $this->apiKey = $tmdbApiKey;
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
            throw new \RuntimeException('TMDB API error');
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
            throw new \RuntimeException('TMDB API error');
        }
    }

    public function search(string $query): array
    {
        try {
            $response = $this->client->request(
                'GET',
                'https://api.themoviedb.org/3/search/multi',
                [
                    'query' => [
                        'api_key' => $this->apiKey,
                        'language' => 'fr-FR',
                        'query' => $query,
                        'page' => 1
                    ]
                ]
            );

            $data = $response->toArray();

            return $data['results'] ?? [];
        } catch (\Exception $e) {
            throw new \RuntimeException('TMDB search error');
        }
    }
}


    