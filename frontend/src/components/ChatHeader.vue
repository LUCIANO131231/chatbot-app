<template>
    <header class="bg-simpsons-yellow dark:bg-gray-900 border-b-4 border-black px-6 py-4 flex items-center gap-4">
        <img src="/logo.png" alt="Logo" class="w-12 h-12 object-contain" />
        <div>
            <h1 class="text-2xl font-black text-black dark:text-white tracking-tight">Springfield Bot</h1>
            <p class="text-sm font-medium text-yellow-800 dark:text-gray-400">Solo sé de Los Simpsons</p>
        </div>
        <div class="ml-auto flex items-center gap-4">
            <!-- Toggle dark/light -->
            <button @click="toggleTheme" class="border-2 border-black dark:border-gray-600 rounded-xl px-3 py-1 text-sm font-bold bg-white dark:bg-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                <Moon v-if="!isDark" class="w-5 h-5" />
                <Sun v-else class="w-5 h-5" />
            </button>
            <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span class="text-xs font-bold text-black dark:text-white">En línea</span>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useTheme } from '../composables/useTheme';
import { Moon, Sun } from 'lucide-vue-next';

const { isDark, toggleTheme } = useTheme()
</script>