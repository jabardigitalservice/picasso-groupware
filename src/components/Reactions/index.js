import Miserable from './Variants/Miserable.vue'
import Flat from './Variants/Flat.vue'
import Haha from './Variants/Haha.vue'
import Sad from './Variants/Sad.vue'
import Yay from './Variants/Yay.vue'

export const moods = [
  {
    value: 'worst',
    label: 'Terpuruk',
    component: Miserable
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
