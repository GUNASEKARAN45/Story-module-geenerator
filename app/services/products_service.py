"""
Service Layer & Transaction Engine for [ST-559] Implement FastAPI Product Catalog and Inventory Engine
Synthesized by Worker 2 (Service & Data Specialist)
"""
import uuid
from datetime import datetime, timezone
from typing import List, Optional, Dict, Any

class ProductService:
    """Encapsulates business rules and data store operations for products."""

    def __init__(self):
        self._store: Dict[str, Dict[str, Any]] = {}

    async def create(self, data: Dict[str, Any]) -> Dict[str, Any]:
        if not data.get("name"):
            raise ValueError("Name field is required.")
        record_id = f"product_{uuid.uuid4().hex[:8]}"
        now = datetime.now(timezone.utc).isoformat()
        record = {
            "id": record_id,
            **data,
            "status": "active",
            "created_at": now,
        }
        self._store[record_id] = record
        return record

    async def get_by_id(self, item_id: str) -> Optional[Dict[str, Any]]:
        return self._store.get(item_id)

    async def list_all(self, limit: int = 20, offset: int = 0) -> List[Dict[str, Any]]:
        records = list(self._store.values())[offset : offset + limit]
        return records