from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # Database
    DATABASE_URL: str = "postgresql+psycopg://postgres:postgres@postgres:5432/education_space"

    # Security
    SECRET_KEY: str = "dev-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # Admin seed
    FIRST_ADMIN_EMAIL: str = "admin@educationspace.com"
    FIRST_ADMIN_PASSWORD: str = "admin123"

    # Telegram
    BOT_TOKEN: str = ""
    CHAT_ID: str = ""

    # App
    APP_ENV: str = "development"
    CORS_ORIGINS: List[str] = [
        "http://localhost",
        "http://localhost:3000",
        "http://localhost:5173",
    ]

    @property
    def is_production(self) -> bool:
        return self.APP_ENV == "production"


settings = Settings()
