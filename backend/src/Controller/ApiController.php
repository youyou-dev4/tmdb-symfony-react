<?php

namespace App\Controller;

use App\Service\TmdbService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Controleur API responsable de fournir les donnees TMDB au frontend
 * Expose des endpoints REST pour recuperer les films et series les mieux notes
 */
class ApiController extends AbstractController
{
    #[Route('/api/movies', methods: ['GET'])]
    public function movies(TmdbService $tmdbService): JsonResponse
    {
        try{
            return $this->json([
                'status' => 'success',
                'data' => $tmdbService->getTopRatedMovies()
            ]);
        } catch (\RuntimeException $e) {
        return $this->json([
            'status' => 'error',
            'message' => $e->getMessage()
        ], 500);
        }
    }

    #[Route('/api/tv', methods: ['GET'])]
    public function tv(TmdbService $tmdbService): JsonResponse
    {
        try{
            return $this->json([
                'status' => 'success',
                'data' => $tmdbService->getTopRatedTv()
            ]);
        }catch (\RuntimeException $e) {
            return $this->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}