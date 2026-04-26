<?php
namespace App\Controller\Auth;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/auth/profile', name: 'auth_profile_')]
final class ProfileController extends AbstractController
{

}