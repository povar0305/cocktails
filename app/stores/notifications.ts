import { defineStore } from 'pinia'
import type { Message } from "~/types/Message";

export const useNotificationStore = defineStore('notifications', {
  state: () => ({
    messages: [] as Array<Message>
  }),
  actions: {
    addMessage(message: Message) {
      const id = Date.now() + Math.random()
      this.messages.push({ ...message, id })
    },
    markAsShown(id: number) {
      const message:Message|undefined = this.messages.find(m => m.id === id)

      if (message) {
        message.shown = true
      }
    }
  }
})
