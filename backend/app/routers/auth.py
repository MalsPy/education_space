from fastapi import APIRouter
from app.schemas.user import LoginRequest, UserOut, UserCreate
from app.schemas.token import Token
from app.services.auth import login_user, create_user
from app.core.deps import DBSession, CurrentAdmin

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=Token)
async def login(data: LoginRequest, db: DBSession):
    return await login_user(data, db)


@router.post("/users", response_model=UserOut, status_code=201)
async def create_admin_user(data: UserCreate, db: DBSession, _: CurrentAdmin):
    """Create a new admin/manager user. Requires admin role."""
    return await create_user(data, db)
