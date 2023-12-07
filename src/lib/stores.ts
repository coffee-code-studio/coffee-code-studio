import { writable } from 'svelte/store'

export const dataStore = writable({})
export const isMenuOpenStore = writable(false)