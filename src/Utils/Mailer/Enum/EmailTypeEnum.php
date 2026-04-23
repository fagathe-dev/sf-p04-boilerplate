<?php

namespace App\Utils\Mailer\Enum;

enum EmailTypeEnum: string
{
    case AUTH_CONFIRMATION = 'auth.confirmation';
    case AUTH_RESET_PASSWORD = 'auth.reset-password';
    case ADMIN_ACCOUNT_CREATED = 'admin.account-created';

    public static function all(): array
    {
        return [
            self::AUTH_CONFIRMATION,
            self::AUTH_RESET_PASSWORD,
            self::ADMIN_ACCOUNT_CREATED,
        ];
    }
}