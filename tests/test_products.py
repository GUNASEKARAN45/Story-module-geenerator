"""
Automated Pytest Suite for [ST-559] Implement FastAPI Product Catalog and Inventory Engine
Synthesized by Worker 3 (QA & Pytest Specialist)
"""
import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient
from app.routers.products import router as products_router

app = FastAPI()
app.include_router(products_router)
client = TestClient(app)

def test_create_product_success():
    payload = {"name": "Test Product", "description": "Automated validation for [ST-559] Implement FastAPI Product Catalog and Inventory Engine"}
    response = client.post("/api/products/", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Test Product"
    assert "id" in data
    assert data["status"] == "active"

def test_create_product_validation_error():
    response = client.post("/api/products/", json={})
    assert response.status_code == 422

def test_get_product_not_found():
    response = client.get("/api/products/missing_id")
    assert response.status_code == 404