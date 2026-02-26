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

        return $this->json([
            'status' => 'success',
            'data' => $tmdbService->getTopRatedMovies($page)
        ]);
    }

    #[Route('/api/tv', methods: ['GET'])]
    public function tv(TmdbService $tmdbService, Request $request): JsonResponse
    {
        $page = $request->query->getInt('page', 1);

        return $this->json([
            'status' => 'success',
            'data' => $tmdbService->getTopRatedTv($page)
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

        return $this->json([
            'status' => 'success',
            'data' => $tmdbService->search($query, $page)
        ]);
    }
}