import Angry from './Variants/Angry.vue'
import Flat from './Variants/Flat.vue'
import Haha from './Variants/Haha.vue'
import Sad from './Variants/Sad.vue'
import Yay from './Variants/Yay.vue'

export const moods = [
  {
    value: 'worst',
    label: 'Marah',
    component: Angry
  },
  {
    value: 'sad',
    label: 'Sedih',
    component: Sad
  },
  {
    value: 'neutral',
    label: 'Biasa Aja',
    component: Flat
  },
  {
    value: 'good',
    label: 'Senang',
    component: Haha
  },
  {
    value: 'excellent',
    label: 'Bersemangat',
    component: Yay
  }
]
