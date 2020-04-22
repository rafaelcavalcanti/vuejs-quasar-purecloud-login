const routes = [
  {
    path: '/',
    component: () => import('layouts/DefaultLayout'),
    children: [
      {
        path: '',
        name: 'welcome',
        component: () => import('pages/Welcome'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/routing',
    component: () => import('layouts/DefaultLayout'),
    children: [
      {
        path: 'queues',
        name: 'routing.queues',
        component: () => import('pages/Routing/Queues'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/oauth',
    component: () => import('layouts/OAuthLayout'),
    children: [
      {
        path: 'login',
        name: 'oauth.login',
        component: () => import('pages/OAuth/Login'),
        meta: { requiresAuth: false }
      },
      {
        path: 'logout',
        name: 'oauth.logout',
        component: () => import('pages/OAuth/Logout'),
        meta: { requiresAuth: true }
      },
      {
        path: 'callback',
        name: 'oauth.callback',
        component: () => import('pages/OAuth/Callback'),
        meta: { requiresAuth: false }
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
