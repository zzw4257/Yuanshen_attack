import json
from pathlib import Path
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Any

# CORS middleware
from fastapi.middleware.cors import CORSMiddleware

# --- "Gold Standard" Pydantic Models ---
class StatValue(BaseModel):
    level: int
    hp: int | None = None
    atk: int | None = None
    def_field: int | None = None # Using alias because 'def' is a keyword
    hp_pre: int | None = None
    atk_pre: int | None = None
    def_pre: int | None = None
    hp_post: int | None = None
    atk_post: int | None = None
    def_post: int | None = None

    class Config:
        fields = {
            'def_field': 'def'
        }

class BaseSubStats(BaseModel):
    crit_rate: str
    crit_dmg: str
    impact: int
    anomaly_mastery: int

class StatInfo(BaseModel):
    headers: List[str]
    ascension_0: List[StatValue]
    ascension_1: List[StatValue]
    ascension_2: List[StatValue]
    ascension_3: List[StatValue]
    ascension_4: List[StatValue]
    ascension_5: List[StatValue]
    ascension_6: List[StatValue]
    base: BaseSubStats

class SkillMultiplierInfo(BaseModel):
    headers: List[str]
    damage: List[Dict[str, Any]]

class Skill(BaseModel):
    name: str
    multipliers: SkillMultiplierInfo

class CharacterGoldStandard(BaseModel):
    id: str
    name: str
    full_name: str
    rarity: str
    attribute: str
    specialty: str
    weapon: str
    faction: str
    stats: StatInfo
    skills: Dict[str, Skill]

# --- FastAPI App Initialization ---
app = FastAPI()

# --- CORS Configuration ---
origins = ["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- In-Memory Database (for the single character) ---
db_characters: Dict[str, CharacterGoldStandard] = {}

@app.on_event("startup")
def load_seed_data():
    """Load the new gold standard character data."""
    # For now, we only have Alice's data. We will load it directly.
    # In the future, this could loop through all files in the bwiki_data directory.
    data_path = Path("../frontend/app/src/data/bwiki_data/alice/data.json")
    if data_path.exists():
        with open(data_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            db_characters[data["id"]] = CharacterGoldStandard(**data)
    else:
        print(f"Warning: Gold standard data file not found at {data_path}")

# --- API Endpoints ---
@app.get("/")
def read_root():
    return {"message": "Welcome to the New Eridu Beacon API (v3 - Gold Standard)"}

# The response model now returns a dictionary of characters with the new model
@app.get("/api/characters", response_model=Dict[str, CharacterGoldStandard])
def get_characters():
    """Retrieve all characters from the database."""
    return db_characters
