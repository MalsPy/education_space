import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.responses import JSONResponse

from app.core.config import settings
from app.core.database import engine, AsyncSessionLocal, Base
from app.core.security import hash_password
from app.middleware.cors import setup_cors
from app.models import User, UserRole
from app.routers import (
    auth_router,
    courses_router,
    teachers_router,
    leads_router,
    dashboard_router,
    telegram_router,
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


async def seed_admin():
    async with AsyncSessionLocal() as session:
        from sqlalchemy import select, func
        count = (await session.execute(select(func.count(User.id)))).scalar_one()
        if count == 0:
            admin = User(
                email=settings.FIRST_ADMIN_EMAIL,
                full_name="Super Admin",
                hashed_password=hash_password(settings.FIRST_ADMIN_PASSWORD),
                role=UserRole.admin,
            )
            session.add(admin)
            await session.commit()
            logger.info(f"✓ Admin user seeded: {settings.FIRST_ADMIN_EMAIL}")


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting Education Space API...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        logger.info("✓ Database tables created")
    await seed_admin()
    logger.info("✓ Application ready")
    yield
    await engine.dispose()
    logger.info("Application shut down")


app = FastAPI(
    title="Education Space API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

setup_cors(app)

app.include_router(auth_router, prefix="/api")
app.include_router(courses_router, prefix="/api")
app.include_router(teachers_router, prefix="/api")
app.include_router(leads_router, prefix="/api")
app.include_router(dashboard_router, prefix="/api")
app.include_router(telegram_router, prefix="/api")


@app.get("/api/health")
async def health_check():
    return JSONResponse({"status": "ok", "service": "education-space-api"})
