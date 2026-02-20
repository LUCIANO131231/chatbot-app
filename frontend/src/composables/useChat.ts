import { ref } from "vue"
import type { ChatRequest, ChatResponse, Message } from "../types/chat"

export function useChat() {
    const messages = ref<Message[]>([])
    const loading = ref(false)
    const sessionId = ref<string | null>(null)
    const error = ref<string | null>(null)

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

    const sendMessage = async (text: string) => {
        if (!text.trim() || loading.value) return

        const userMessage: Message = {
            id: crypto.randomUUID(),
            role: 'user',
            content: text.trim(),
            timestamp: new Date()
        }

        messages.value.push(userMessage)
        loading.value = true
        error.value = null

        try {
            const body: ChatRequest = {
                session_id: sessionId.value,
                message: text.trim()
            }

            const res = await fetch(`${API_URL}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })

            if (!res.ok) throw new Error('Error en el servidor')
            
            const data: ChatResponse = await res.json()
            sessionId.value = data.session_id

            const botMessage: Message = {
                id: crypto.randomUUID(),
                role: 'bot',
                content: data.response,
                timestamp: new Date()
            }

            messages.value.push(botMessage)

        } catch (e) {
            error.value = '¡D\'oh! Algo salió mal. Intenta de nuevo.'
        } finally {
            loading.value = false
        }
    }

    return {
        messages,
        loading,
        error,
        sendMessage
    }
}