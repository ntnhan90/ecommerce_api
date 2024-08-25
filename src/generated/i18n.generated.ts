import { Path } from "nestjs-i18n";
export type I18nTranslations = {
    "common": {
        "validation": {
            "error": string;
        };
        "error": {
            "internal_server_error": string;
            "entity_not_found": string;
        };
    };
    "user": {
        "unique": {
            "username": string;
            "email": string;
        };
        "validation": {
            "is_empty": string;
        };
        "error": {
            "username_or_email_exists": string;
            "not_found": string;
            "invalid_password": string;
            "invalid_token": string;
        };
    };
};
/* prettier-ignore */
export type I18nPath = Path<I18nTranslations>;