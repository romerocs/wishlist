// store.js
import { reactive } from 'vue'

export const store = reactive({
  added_item: undefined,
  deleted_item: undefined,
  logged_in: false
})