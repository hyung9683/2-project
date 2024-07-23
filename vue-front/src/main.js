import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Vuetify from 'vuetify';
import mitt from 'mitt';

//레이아웃
import defalutlayout from './layout/defalutlayout.vue';

//메인
import Main from './view/Main.vue';

const routes = [
    {
        path:'/',
        name: 'defaultlayout',
        component: defalutlayout,
        children: [
            {
                path: '/',
                component: Main,

            },
        ]
    }
]


window.Kakao.init('79eb0be4a08b223b4a5553fe99835470');

const router = createRouter({
    history: createWebHistory(),
    routes
});

const emitter = mitt();

const app = createApp(App)
app.use(router);
app.use(VueSweetalert2);
app.use(Vuetify);
// app.use(emitter);
app.config.globalProperties.emitter = emitter
app.mount('#app')
