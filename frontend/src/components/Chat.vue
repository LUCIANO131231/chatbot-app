<template>
    <div class="min-h-screen relative flex items-center justify-center p-4 transition-colors">
        <!-- Fondo -->
        <div class="fixed inset-0 bg-linear-to-b from-sky-300 to-sky-100 dark:from-gray-800 dark:to-gray-900 -z-10"></div>
        <div class="fixed inset-0 overflow-hidden pointer-events-none -z-10">
            <div v-for="n in 15" :key="n" :class="`cloud cloud-${n}`">☁️</div>
        </div>
        <!-- -->
        <div class="w-full max-w-2xl bg-white/30 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden" style="height: 85vh;">
            <ChatHeader />
            <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 flex flex-col gap-4 relative transition-colors">
                <div v-if="messages.length === 0" class="relative z-10 flex flex-col items-center justify-center h-full text-center gap-3">
                    <p class="text-gray-700 dark:text-gray-300 font-bold text-lg">¡D'oh! Pregúntame algo sobre Los Simpsons</p>
                    <div class="flex flex-wrap gap-2 justify-center mt-2">
                        <button v-for="suggestion in suggestions" :key="suggestion"
                                @click="sendMessage(suggestion)"
                                class="text-xs bg-simpsons-yellow border-2 border-black px-3 py-1 rounded-full font-bold hover:bg-yellow-300 transition-color cursor-pointer">
                            {{ suggestion }}
                        </button>
                    </div>
                </div>

                <!-- Mensajes -->
                <div class="relative z-10 flex flex-col gap-4">
                    <ChatMessage
                        v-for="message in messages"
                        :key="message.id"
                        :message="message"
                    />

                    <!-- Typing indicator -->
                    <div v-if="loading" class="flex items-start gap-2">
                        <div class="w-8 h-8 rounded-full border-2 border-black bg-simpsons-yellow flex items-center justify-center text-sm">🍩</div>
                        <div class="bg-simpsons-yellow border-2 border-black rounded-2xl rounded-bl-sm px-4 py-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                            <div class="flex gap-1 items-center">
                                <span class="w-2 h-2 bg-black rounded-full animate-bounce" style="animation-delay: 0ms"></span>
                                <span class="w-2 h-2 bg-black rounded-full animate-bounce" style="animation-delay: 150ms"></span>
                                <span class="w-2 h-2 bg-black rounded-full animate-bounce" style="animation-delay: 300ms"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ChatInput :loading="loading" :error="error" @send="sendMessage" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { useChat } from '../composables/useChat'
import ChatHeader from './chatHeader.vue'
import ChatMessage from './ChatMessage.vue'
import ChatInput from './ChatInput.vue'

const { messages, loading, error, sendMessage } = useChat()

const messagesContainer = ref<HTMLElement | null>(null)

const suggestions = [
    '¿Quién es Bart Simpson?',
    '¿De qué trata la película?',
    'Frases icónicas de Homero',
    '¿Cuántas temporadas hay?'
]

const scrollToBottom = async () => {
    await nextTick()
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
}

watch(messages, scrollToBottom, { deep: true })
</script>