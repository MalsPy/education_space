from fastapi import APIRouter
from sqlalchemy import select, func
from app.models.course import Course
from app.models.teacher import Teacher
from app.models.lead import Lead
from app.core.deps import DBSession, CurrentAdmin

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/stats")
async def dashboard_stats(db: DBSession, _: CurrentAdmin):
    """Aggregate stats for the admin dashboard."""
    courses_count = (await db.execute(select(func.count(Course.id)))).scalar_one()
    teachers_count = (await db.execute(select(func.count(Teacher.id)))).scalar_one()
    leads_total = (await db.execute(select(func.count(Lead.id)))).scalar_one()

    from app.services.leads import get_leads_stats
    leads_breakdown = await get_leads_stats(db)

    return {
        "courses": courses_count,
        "teachers": teachers_count,
        "leads": {
            "total": leads_total,
            **leads_breakdown,
        },
    }
