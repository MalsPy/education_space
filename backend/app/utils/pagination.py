from pydantic import BaseModel
from typing import TypeVar, Generic, List, Sequence

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

    model_config = {"arbitrary_types_allowed": True}

    @classmethod
    def create(
        cls,
        items: Sequence,
        total: int,
        params: PaginationParams,
        item_schema=None,
    ) -> "PagedResponse[T]":
        pages = (total + params.size - 1) // params.size if params.size > 0 else 0
        # Convert ORM objects to schema if a schema class is provided
        if item_schema is not None:
            converted = [item_schema.model_validate(i) for i in items]
        else:
            converted = list(items)
        return cls(
            items=converted,
            total=total,
            page=params.page,
            size=params.size,
            pages=pages,
        )
