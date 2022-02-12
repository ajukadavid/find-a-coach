import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches'},
        {path: '/coaches', component: null},
        {path: '/coaches/:id', component:null, children: [
            {path: 'contact', component: null}
        ]},
        {path: '/register'},
        {path: '/requests', component: null},
        {path: '/:notFound(.*)', component: nnone}
    ]
})


export default router