import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Vuetify from 'vuetify';
import store from './store'

import defaultLayout from './layout/defaultLayout.vue'
import MainPage from './view/main'

const routes = [
    {
        path: '/',
        component: defaultLayout,
        children: [
            {
                path: '/',
                component: MainPage,
            },
        ]
    }
]

window.Kakao.init('79eb0be4a08b223b4a5553fe99835470');

const router = createRouter({
    history: createWebHistory(),
    routes
});

const app = createApp(App)
app.use(router);
app.use(store);
app.use(VueSweetalert2);
app.use(Vuetify);
app.mount('#app')
