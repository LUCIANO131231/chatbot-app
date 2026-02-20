export interface Message {
    id: string
    role: 'user' | 'bot'
    content: string
    timestamp: Date
}

export interface ChatRequest {
    session_id: string | null
    message: string
}

export interface ChatResponse {
    session_id: string
    response: string
} 