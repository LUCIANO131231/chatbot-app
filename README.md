# 🍩 Chatbot AI

Chatbot temático con FastAPI + Gemini AI y VueJS.

## 🛠️ Stack

- **Backend:** Python, FastAPI, Gemini AI
- **Frontend:** VueJS, Tailwind

## Instalación

**Backend**
```bash
cd backend
pip install virtualenv
virtualenv env
env\Scripts\activate  # Windows
source env/bin/activate  # Mac/Linux
pip install -r requirements.txt
uvicorn main:app --reload
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

Crea `backend/.env` basándote en `backend/.env.example`