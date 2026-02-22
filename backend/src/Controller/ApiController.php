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
        $movies = $tmdbService->getTopRatedMovies();

        return $this->json($movies);
    }

    #[Route('/api/tv', methods: ['GET'])]
    public function tv(TmdbService $tmdbService): JsonResponse
    {
        $tv = $tmdbService->getTopRatedTv();

        return $this->json($tv);
    }
}