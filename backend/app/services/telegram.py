import httpx
import logging
from app.core.config import settings

logger = logging.getLogger(__name__)


async def send_lead_notification(name: str, phone: str, course_name: str | None) -> bool:
    """
    Send a Telegram notification when a new lead is created.
    Returns True on success, False on failure (non-blocking).
    """
    if not settings.BOT_TOKEN or not settings.CHAT_ID:
        logger.warning("Telegram BOT_TOKEN or CHAT_ID not configured — skipping notification")
        return False

    course_display = course_name or "Not specified"
    message = (
        f"🔥 <b>New Lead</b>\n\n"
        f"👤 Name: {name}\n"
        f"📞 Phone: {phone}\n"
        f"📚 Course: {course_display}"
    )

    url = f"https://api.telegram.org/bot{settings.BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": settings.CHAT_ID,
        "text": message,
        "parse_mode": "HTML",
    }

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(url, json=payload)
            response.raise_for_status()
            logger.info(f"Telegram notification sent for lead: {name}")
            return True
    except httpx.HTTPStatusError as e:
        logger.error(f"Telegram API error {e.response.status_code}: {e.response.text}")
        return False
    except Exception as e:
        logger.error(f"Failed to send Telegram notification: {e}")
        return False
