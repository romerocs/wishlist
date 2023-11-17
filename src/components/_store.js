// store.js
import { reactive } from 'vue'

export const store = reactive({
  added_item: undefined,
  deleted_item: undefined,
  logged_in: false,
  priority_change_index: undefined,
  priority_change_value: undefined,
  priority_change: {
    'index' : undefined,
    'value' : undefined,
    'type'  : undefined
  }
})