import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Vuetify from 'vuetify';
import store from './store';

import defaultLayout from './layout/defaultLayout.vue';
import MainPage from './view/Main';
import WritePage from './view/Write';
import MyQuizPage from './view/Myquiz';
import QuizPage from './view/Quizdetail';
import StartPage from './view/Quizstart';
import TestPage from './view/Test';

const routes = [
    {
        path: '/',
        component: defaultLayout,
        children: [
            {
                path: '/',
                component: MainPage,
            },
            {
                path: '/write/:quizNo',  // 동적 경로
                name: 'WritePage',
                component: WritePage,
                props: true  // 컴포넌트에 route.params를 props로 전달
            },
            {
                path: '/myquiz',
                component: MyQuizPage,
            },
            {
                path: '/quiz/:quizNo',  // 동적 경로
                name: 'QuizPage',
                component: QuizPage,
                props: true  // 컴포넌트에 route.params를 props로 전달
            },
            {
                path: '/start/:quizNo',  // 동적 경로
                name: 'StartPage',
                component: StartPage,
                props: true  // 컴포넌트에 route.params를 props로 전달
            },
            {
                path: '/test',
                component: TestPage,
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
