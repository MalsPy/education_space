from pydantic import BaseModel
from datetime import datetime


class CourseBase(BaseModel):
    title: str
    description: str
    image_url: str | None = None
    is_active: bool = True


class CourseCreate(CourseBase):
    pass


class CourseUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    image_url: str | None = None
    is_active: bool | None = None


class CourseOut(CourseBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
EOF

cat > /home/claude/education-space/backend/app/schemas/teacher.py << 'EOF'
from pydantic import BaseModel
from datetime import datetime


class TeacherBase(BaseModel):
    name: str
    bio: str
    photo_url: str | None = None


class TeacherCreate(TeacherBase):
    pass


class TeacherUpdate(BaseModel):
    name: str | None = None
    bio: str | None = None
    photo_url: str | None = None


class TeacherOut(TeacherBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
