from pydantic import BaseModel
from typing import TypeVar, Generic, List

T = TypeVar("T")


class PaginationParams(BaseModel):
    page: int = 1
    size: int = 20

    @property
    def offset(self) -> int:
        return (self.page - 1) * self.size

    @property
    def limit(self) -> int:
        return self.size


class PagedResponse(BaseModel, Generic[T]):
    items: List[T]
    total: int
    page: int
    size: int
    pages: int

    @classmethod
    def create(cls, items: List[T], total: int, params: PaginationParams) -> "PagedResponse[T]":
        pages = (total + params.size - 1) // params.size if params.size > 0 else 0
        return cls(items=items, total=total, page=params.page, size=params.size, pages=pages)
