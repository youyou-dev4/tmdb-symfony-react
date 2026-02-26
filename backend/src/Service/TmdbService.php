<?php

namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;

class TmdbService
{
    private HttpClientInterface $client;
    private string $apiKey;

    public function __construct(HttpClientInterface $client, string $tmdbApiKey)
    {
        $this->client = $client;
        $this->apiKey = $tmdbApiKey;
    }

    public function getTopRatedMovies(int $page = 1): array
    {
        $response = $this->client->request(
            'GET',
            'https://api.themoviedb.org/3/movie/top_rated',
            [
                'query' => [
                    'api_key' => $this->apiKey,
                    'language' => 'fr-FR',
                    'page' => $page
                ]
            ]
        );

        $data = $response->toArray();
        return [
            'results' => $data['results'] ?? [],
            'page' => $data['page'] ?? 1,
            'total_pages' => $data['total_pages'] ?? 1,
            'total_results' => $data['total_results'] ?? 0,
        ];
    }

    public function getTopRatedTv(int $page = 1): array
    {
        $response = $this->client->request(
            'GET',
            'https://api.themoviedb.org/3/tv/top_rated',
            [
                'query' => [
                    'api_key' => $this->apiKey,
                    'language' => 'fr-FR',
                    'page' => $page
                ]
            ]
        );

        $data = $response->toArray();
        return [
            'results' => $data['results'] ?? [],
            'page' => $data['page'] ?? 1,
            'total_pages' => $data['total_pages'] ?? 1,
            'total_results' => $data['total_results'] ?? 0,
        ];
    }

    public function search(string $query, int $page = 1): array
    {
        $response = $this->client->request(
            'GET',
            'https://api.themoviedb.org/3/search/multi',
            [
                'query' => [
                    'api_key' => $this->apiKey,
                    'language' => 'fr-FR',
                    'query' => $query,
                    'page' => $page
                ]
            ]
        );

        $data = $response->toArray();
        return [
            'results' => $data['results'] ?? [],
            'page' => $data['page'] ?? 1,
            'total_pages' => $data['total_pages'] ?? 1,
            'total_results' => $data['total_results'] ?? 0,
        ];
    }
}