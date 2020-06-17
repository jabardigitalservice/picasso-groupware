const page = path => () => import(`@/views/${path}`).then(m => m.default || m)

export default [
  {
    path: '/',
    name: 'home',
    component: page('Home.vue')
  },
  {
    path: '/articles/:id',
    name: 'articles.detail',
    component: page('ArticleDetail.vue')
  },
  {
    path: '/messages',
    name: 'messages',
    component: page('Messages.vue')
  },
  {
    path: '/messages/:id',
    name: 'messages.detail',
    component: page('MessageDetail.vue')
  },
  {
    path: '/events',
    name: 'events',
    component: page('Events.vue')
  },
  {
    path: '/thankyou',
    name: 'thankyou',
    component: page('ThankYou.vue')
  },
  {
    path: '/thankyou/create',
    name: 'thankyou.create',
    component: page('ThankYouCreate.vue')
  },
  {
    path: '/underconstruction',
    name: 'underconstruction',
    component: page('UnderConstruction.vue')
  },
  {
    path: '/checkins',
    name: 'checkins',
    component: page('Checkins.vue')
  },
  {
    path: '/checkins/create',
    name: 'checkins.create',
    component: page('CheckinsCreate.vue')
  },
  {
    path: '/feedback/create',
    name: 'feedback.create',
    component: page('FeedbackCreate.vue')
  },
  {
    path: '/users/:id',
    name: 'users.detail',
    component: page('UsersDetail.vue')
  },
  {
    path: '/profile',
    name: 'profile.detail',
    component: page('ProfileDetail.vue')
  },
  {
    path: '/profile/edit/:id',
    name: 'profile.edit',
    component: page('ProfileEdit.vue')
  },
  {
    path: '/booking',
    name: 'booking',
    component: page('Booking.vue')
  },
  {
    path: '/report',
    name: 'report',
    component: page('LogBookCreate.vue')
  },
  {
    path: '/teams',
    name: 'teams',
    component: page('Team.vue')
  },
  {
    path: '*',
    component: page('errors/404.vue')
  }
]
