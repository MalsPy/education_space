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
EOF

cat > /home/claude/education-space/backend/app/schemas/__init__.py << 'EOF'
from app.schemas.token import Token, TokenPayload
from app.schemas.user import UserOut, UserCreate, UserUpdate, LoginRequest
from app.schemas.course import CourseOut, CourseCreate, CourseUpdate
from app.schemas.teacher import TeacherOut, TeacherCreate, TeacherUpdate
from app.schemas.lead import LeadOut, LeadCreate, LeadUpdate, LeadStatusUpdate

__all__ = [
    "Token", "TokenPayload",
    "UserOut", "UserCreate", "UserUpdate", "LoginRequest",
    "CourseOut", "CourseCreate", "CourseUpdate",
    "TeacherOut", "TeacherCreate", "TeacherUpdate",
    "LeadOut", "LeadCreate", "LeadUpdate", "LeadStatusUpdate",
]
