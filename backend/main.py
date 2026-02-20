from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai
import os
import uuid

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configurar cliente Gemini
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# Memoria de sesiones
sessions = {}

SYSTEM_PROMPT = """
Eres un experto absoluto en el universo de Los Simpsons. 
Solo puedes hablar sobre Los Simpsons: la serie animada, películas, cortometrajes, 
personajes, episodios, temporadas, frases icónicas, actores de voz, datos curiosos, 
crossovers, y todo lo relacionado con el universo de Springfield.

Si alguien te pregunta algo que NO está relacionado con Los Simpsons, 
debes responder amablemente que solo puedes hablar de Los Simpsons y redirigir 
la conversación al tema.

Responde siempre en el idioma en que te hablen.
Puedes ser divertido y usar referencias de la serie.
"""

class MessageRequest(BaseModel):
    session_id: str | None = None
    message: str

class MessageResponse(BaseModel):
    session_id: str
    response: str

@app.post("/chat", response_model=MessageResponse)
async def chat(request: MessageRequest):
    session_id = request.session_id or str(uuid.uuid4())

    if session_id not in sessions:
        sessions[session_id] = []

    # Agregar mensaje del usuario al historial
    sessions[session_id].append({
        "role": "user",
        "parts": [{"text": request.message}]
    })

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=sessions[session_id],
        config={
            "system_instruction": SYSTEM_PROMPT
        }
    )

    bot_response = response.text

    # Agregar respuesta al historial
    sessions[session_id].append({
        "role": "model",
        "parts": [{"text": bot_response}]
    })

    return MessageResponse(session_id=session_id, response=bot_response)

@app.get("/health")
def health():
    return {"status": "ok"}