"""
FastAPI APIRouter for [ST-559] Implement FastAPI Product Catalog and Inventory Engine
Synthesized by Worker 1 (FastAPI Route Specialist)
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field, ConfigDict
from app.services.products_service import ProductService

router = APIRouter(prefix="/api/products", tags=["products"])

class ProductRequest(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    name: str = Field(..., min_length=1, max_length=120, description="Name or title for products")
    description: Optional[str] = Field(None, max_length=500)
    metadata: Optional[Dict[str, Any]] = Field(default_factory=dict)

class ProductResponse(ProductRequest):
    id: str
    status: str = "active"
    created_at: str

@router.post("/", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
async def create_product(payload: ProductRequest, service: ProductService = Depends()):
    """Create a new products record with business validation."""
    try:
        return await service.create(payload.model_dump())
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc))

@router.get("/{item_id}", response_model=ProductResponse)
async def get_product(item_id: str, service: ProductService = Depends()):
    """Fetch products item by its unique ID."""
    item = await service.get_by_id(item_id)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Product '{item_id}' not found")
    return item

@router.get("/", response_model=List[ProductResponse])
async def list_products(limit: int = Query(20, ge=1, le=100), offset: int = Query(0, ge=0), service: ProductService = Depends()):
    """List products with pagination."""
    return await service.list_all(limit=limit, offset=offset)