import json
from pathlib import Path
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Union

# CORS (Cross-Origin Resource Sharing) middleware to allow frontend requests
from fastapi.middleware.cors import CORSMiddleware

# --- Pydantic Models for the new, more detailed data structure ---
class CharacterData(BaseModel):
    name: str
    full_name: str
    rarity: str
    camp: str
    elementType: str
    weaponType: str
    attack: int
    attackGrowth: int
    hpMax: int
    hpGrowth: int
    defence: int
    defenceGrowth: int
    crit: int
    critDamage: int

# --- FastAPI App Initialization ---
app = FastAPI()

# --- CORS Configuration ---
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- In-Memory Database & Seed Data ---
# Load data from the new JSON file
db_characters: Dict[str, CharacterData] = {}

@app.on_event("startup")
def load_seed_data():
    """Load character data from the JSON file into the in-memory db on startup."""
    # The path is relative to the root of the project where the server is run from
    data_path = Path("../frontend/app/src/data/plugin_data/PartnerId2Data.json")
    if data_path.exists():
        with open(data_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            for char_id, char_data in data.items():
                db_characters[char_id] = CharacterData(**char_data)
    else:
        print(f"Warning: Seed data file not found at {data_path}")


# --- API Endpoints ---
@app.get("/")
def read_root():
    return {"message": "Welcome to the New Eridu Beacon API (v2 - Phoenix)"}

# The response model is now a dictionary mapping ID to character data
@app.get("/api/characters", response_model=Dict[str, CharacterData])
def get_characters():
    """Retrieve all characters from the database."""
    return db_characters

# The POST endpoint needs to be updated or temporarily disabled as the data structure is now more complex
# For this step, we focus on serving the new data structure correctly.
# The 'add character' feature will need a more complex form and will be re-implemented later.
# For now, let's comment it out to avoid errors with the new data model.
#
# @app.post("/api/characters", response_model=Character, status_code=201)
# def create_character(character: Character):
#     """Add a new character to the database."""
#     # This logic needs to be updated for the new Dict-based DB
#     # db_characters[character.id] = character
#     return character
