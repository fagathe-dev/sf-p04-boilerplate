<?php
namespace App\Service\UserRequest;

enum UserRequestTypeEnum: string
{

    case AUTH_ACCOUNT_VERIFICATION = 'AUTH_ACCOUNT_VERIFICATION';
    case AUTH_PASSWORD_RESET = 'AUTH_PASSWORD_RESET';
    case AUTH_EMAIL_RESET = 'AUTH_EMAIL_RESET';

}