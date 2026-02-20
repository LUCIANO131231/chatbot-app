<template>
    <div :class="isUser ? 'item-end' : 'item-start'" class="flex flex-col gap-1">
        <div class="flex items-end gap-2" :class="isUser ? 'flex-row-reverse' : 'flex-row'">
            <!-- Avatar papeto -->
            <div class="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center text-sm flex-shrink-0"
                        :class="isUser ? 'bg-blue-500' : 'bg-simpsons-yellow'">
                {{ isUser ? '👤' : '🍩' }}
            </div>

            <!-- Burbuja -->
            <div class="max-w-xs lg:max-w-md px-4 py-3 rounded-2xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                        :class="isUser
                            ? 'bg-blue-500 text-white rounded-br-sm'
                            : 'bg-simpsons-yellow text-black rounded-bl-sm'">
                <p class="text-sm leading-relaxed whitespace-pre-wrap">{{ message.content }}</p>
            </div>
        </div>

        <!-- Timestamp -->
        <span class="text-xs text-gray-400 px-10">{{ formattedTime }}</span>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Message } from '../types/chat';

const props = defineProps<{
    message: Message
}>()

const isUser = computed(() => props.message.role === 'user')

const formattedTime = computed(() => {
    return props.message.timestamp.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
    })
})
</script>