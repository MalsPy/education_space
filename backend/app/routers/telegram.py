from fastapi import APIRouter
from app.services.telegram import test_telegram

router = APIRouter(prefix="/telegram", tags=["telegram"])


@router.get("/test")
async def telegram_test():
    """Diagnose Telegram bot configuration."""
    return await test_telegram()
