function page (path) {
  return () => import(/* webpackChunkName: '' */ `@/views/${path}`).then(m => m.default || m)
}

export default [
  { path: '/', name: 'home', component: page('Home.vue') },
  { path: '/messages', name: 'messages', component: page('Messages.vue') },
  { path: '/about', name: 'about', component: page('About.vue') },
  { path: '*', component: page('errors/404.vue') }
]
