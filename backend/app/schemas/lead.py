from pydantic import BaseModel
from datetime import datetime
from app.models.lead import LeadStatus
from app.schemas.course import CourseOut


class LeadBase(BaseModel):
    name: str
    phone: str
    course_id: int | None = None


class LeadCreate(LeadBase):
    pass


class LeadUpdate(BaseModel):
    name: str | None = None
    phone: str | None = None
    course_id: int | None = None
    status: LeadStatus | None = None
    notes: str | None = None


class LeadOut(LeadBase):
    id: int
    status: LeadStatus
    notes: str | None
    created_at: datetime
    updated_at: datetime
    course_rel: CourseOut | None = None

    model_config = {"from_attributes": True}


class LeadStatusUpdate(BaseModel):
    status: LeadStatus
    notes: str | None = None
