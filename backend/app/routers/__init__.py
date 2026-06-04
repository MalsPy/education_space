from app.routers.auth import router as auth_router
from app.routers.courses import router as courses_router
from app.routers.teachers import router as teachers_router
from app.routers.leads import router as leads_router
from app.routers.dashboard import router as dashboard_router

__all__ = [
    "auth_router",
    "courses_router",
    "teachers_router",
    "leads_router",
    "dashboard_router",
]
