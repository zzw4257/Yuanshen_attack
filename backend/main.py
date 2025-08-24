from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Union

# CORS (Cross-Origin Resource Sharing) middleware to allow frontend requests
from fastapi.middleware.cors import CORSMiddleware

# --- Pydantic Models for Data Validation ---
class Multiplier(BaseModel):
    level: int
    value: float
    label: str

class Ability(BaseModel):
    name: str
    multipliers: List[Multiplier]

class Stats(BaseModel):
    base_atk: int
    base_hp: int
    base_def: int
    crit_rate: float
    crit_dmg: float

class Character(BaseModel):
    id: str
    name: str
    rarity: str
    faction: str
    attribute: str
    weapon: str
    bio: str
    icon: str
    stats: Dict[str, Stats]
    abilities: Dict[str, Ability]

# --- FastAPI App Initialization ---
app = FastAPI()

# --- CORS Configuration ---
# Allow requests from the default Vue dev server and other common origins
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
# Re-creating the data from characters.js in Python
db_characters: List[Character] = [
    Character(**{
        "id": "anby-demara", "name": "安比·德玛拉", "rarity": "S", "faction": "狡兔屋", "attribute": "电", "weapon": "刃",
        "bio": "冷静、干练的少女...", "icon": "/path/to/anby_icon.png",
        "stats": {"level_60": {"base_atk": 929, "base_hp": 7673, "base_def": 612, "crit_rate": 0.194, "crit_dmg": 0.50}},
        "abilities": {
            "basic_attack": {"name": "普通攻击", "multipliers": [{"level": 1, "value": 0.40, "label": "第一击"}, {"level": 1, "value": 0.45, "label": "第二击"}, {"level": 1, "value": 0.60, "label": "第三击"}]},
            "special_attack": {"name": "特殊技", "multipliers": [{"level": 8, "value": 3.50, "label": "技能总伤害"}]}
        }
    }),
    Character(**{
        "id": "hoshimi-miyabi", "name": "星见雅", "rarity": "S", "faction": "对空六课", "attribute": "冰", "weapon": "刃",
        "bio": "对空六课的行动组组长...", "icon": "/path/to/miyabi_icon.png",
        "stats": {"level_60": {"base_atk": 880, "base_hp": 7673, "base_def": 606, "crit_rate": 0.05, "crit_dmg": 0.50}},
        "abilities": {
            "basic_attack": {"name": "普通攻击", "multipliers": [{"level": 1, "value": 0.50, "label": "斩击"}]},
            "special_attack": {"name": "特殊技", "multipliers": [{"level": 1, "value": 2.80, "label": "冰封之舞"}]}
        }
    }),
    # Add more characters here if needed
]


# --- API Endpoints ---
@app.get("/")
def read_root():
    return {"message": "Welcome to the New Eridu Beacon API"}

@app.get("/api/characters", response_model=List[Character])
def get_characters():
    """Retrieve all characters from the database."""
    return db_characters

@app.post("/api/characters", response_model=Character, status_code=201)
def create_character(character: Character):
    """Add a new character to the database."""
    # In a real application, we'd check for duplicate IDs
    db_characters.append(character)
    return character
