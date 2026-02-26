<?php

namespace App\Controller;

use App\Service\TmdbService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class ApiController extends AbstractController
{
    #[Route('/api/movies', methods: ['GET'])]
    public function movies(TmdbService $tmdbService, Request $request): JsonResponse
    {
        $page = $request->query->getInt('page', 1);

        $data = $tmdbService->getTopRatedMovies($page);

        return $this->json([
            'status' => 'success',
            'results' => $data['results'],
            'page' => $data['page'],
            'total_pages' => $data['total_pages'],
            'total_results' => $data['total_results'],
        ]);
    }

    #[Route('/api/tv', methods: ['GET'])]
    public function tv(TmdbService $tmdbService, Request $request): JsonResponse
    {
        $page = $request->query->getInt('page', 1);

        $data = $tmdbService->getTopRatedTv($page);

        return $this->json([
            'status' => 'success',
            'results' => $data['results'],
            'page' => $data['page'],
            'total_pages' => $data['total_pages'],
            'total_results' => $data['total_results'],
        ]);
    }

    #[Route('/api/search', methods: ['GET'])]
    public function search(TmdbService $tmdbService, Request $request): JsonResponse
    {
        $query = $request->query->get('query');
        $page = $request->query->getInt('page', 1);

        if (!$query) {
            return $this->json([
                'status' => 'error',
                'message' => 'Missing search query'
            ], 400);
        }

        $data = $tmdbService->search($query, $page);

        return $this->json([
            'status' => 'success',
            'results' => $data['results'],
            'page' => $data['page'],
            'total_pages' => $data['total_pages'],
            'total_results' => $data['total_results'],
        ]);
    }
}