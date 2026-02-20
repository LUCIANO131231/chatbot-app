<template>
    <div class="border-t-4 border-black dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-4 transition-colors">
        <div class="flex gap-3 items-center">
            <input 
                type="text"
                v-model="inputText"
                @keydown.enter="handleSend"
                :disabled="loading"
                placeholder="Pregunta algo sobre Los Simpsons"
                class="flex-1 border-2 border-black dark:border-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 disabled:opacity-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-white dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            />
            <button
                @click="handleSend"
                :disabled="loading || !inputText.trim()"
                class="bg-simpsons-yellow border-2 border-black text-black font-black px-5 py-3 rounded-xl hover:bg-yellow-300 disabled:opacity-50 transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]">
                {{ loading ? '...' : 'Enviar' }}
            </button>
        </div>
        <p v-if="error" class="text-red-500 text-xs mt-2 font-medium">{{ error }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
    loading: boolean
    error: string | null
}>()

const emit = defineEmits<{
    send: [message: string]
}>()

const inputText = ref('')

const handleSend = () => {
    if (!inputText.value.trim() || props.loading) return
    emit('send', inputText.value)
    inputText.value = ''
}
</script>