import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Vuetify from 'vuetify';

import mitt from 'mitt';

import store from './store';

//레이아웃
import defalutlayout from './layout/defalutlayout.vue';

//메인
import Main from './view/Main.vue';
import Join from './view/join.vue';
import Login from './view/login.vue';
import Find from './view/find.vue'

import qna from './view/qna.vue'
import qnaWrite from './view/qnaWrite.vue'
import qnaContent from './view/qnaContent'

import Qna from './admin/qna.vue'
import QnaAns from './admin/qnaAns.vue'
import QnaContent from './admin/qnaContent.vue'
import UserInfo  from './admin/userinfo.vue'
import Board  from './admin/board.vue'
import ReportDetails from './admin/reportDetail.vue'; 

import AdminLayout from './layout/adminLayout.vue'

import MyPageLayout from './layout/mypageLayout'
import MyPage from './mypage/mypage.vue'
import myQna from './mypage/myQna.vue'
import Contentpage from './mypage/contentpage.vue'
import MyPageUpdate from './mypage/mypageupdate.vue'
import Pass from './mypage/passwd.vue'

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
            {
            
                path: '/login',
                component: Login,
            }
            ,
            {
                path: '/join',
                component: Join,
            },
            {
                path: '/find',
                component: Find,
            },
            {
                path: '/qna',
                component: qna,
            },
            {
                path: '/qnawrite',
                component: qnaWrite,
            },
            {
                path: '/qna/qnacontent',
                component:qnaContent,
            },
        ]},
        {
            path: '/admin/',
            component: AdminLayout,
            children: [
                {
                    path:'qna',
                    component: Qna,
                },
                {
                    path:'qna/qnacontent/write',
                    component:QnaAns
                },
                {
                    path:'qna/qnacontent',
                    component:QnaContent
                },
                {
                    path:'user',
                    component:UserInfo
                },
                {
                    path:'board',
                    component:Board
                },
                {
                    path:'reportdetail',
                    component:ReportDetails
                },
            ]},
            {
        
                path: '/mypage/',
                name: 'mypagelayout',
                component: MyPageLayout,
                children: [
                    {
                        path: '',
                        component: MyPage,
                    },
                    {
                        path: 'qnapage',
                        component: myQna,
                    },
                    {
                        path: 'contentpage',
                        component: Contentpage,
                    },
                    {
                        path: 'update',
                        component: MyPageUpdate,
                    },
                    {
                        path: 'passwd',
                        component: Pass,
                    }
                ]},
       
       
    ]

window.Kakao.init('79eb0be4a08b223b4a5553fe99835470');

const router = createRouter({
    history: createWebHistory(),
    routes
});

const emitter = mitt();

const app = createApp(App)
app.use(router);
app.use(store);
app.use(VueSweetalert2);
app.use(Vuetify);
// app.use(emitter);
app.config.globalProperties.emitter = emitter
app.mount('#app')
