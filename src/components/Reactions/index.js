import Angry from './Variants/Angry.vue'
import Flat from './Variants/Flat.vue'
import Haha from './Variants/Haha.vue'
import Sad from './Variants/Sad.vue'
import Yay from './Variants/Yay.vue'

export const moodMap = {
  worst: Angry,
  sad: Sad,
  neutral: Flat,
  good: Haha,
  excellent: Yay
}
