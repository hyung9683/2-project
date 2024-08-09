import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Vuetify from 'vuetify';
import store from './store';


import defaultLayout from './layout/defaultLayout.vue';
import MainPage from './view/main';
import MyQuizPage from './view/Myquiz';
import QuizPage from './view/Quizdetail';
import StartPage from './view/Quizstart';
import TestPage from './view/Test';
import board from './view/board.vue';
import writeboard from './view/writeboard.vue';
import boardDetail from './view/boardDetail.vue';

import usernotice from './view/notice.vue';
import usernoticeDetail from './view/noticeDetail.vue';

import QuizMain from './view/QuizMain';

import mitt from 'mitt';

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
import Quizzes from './admin/quizzes.vue';
import notice from './admin/notice.vue';
import noticeDetail from './admin/noticeDetail.vue';
import writenotice from './admin/writenotice.vue';

import AdminLayout from './layout/adminLayout.vue'

import MyPageLayout from './layout/mypageLayout'
import MyPage from './mypage/mypage.vue'
import myQna from './mypage/myQna.vue'
import Contentpage from './mypage/contentpage.vue'
import MyPageUpdate from './mypage/mypageupdate.vue'
import Pass from './mypage/passwd.vue'
import MyQuiz from './mypage/quizpage.vue';
import Write from './mypage/write.vue';

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
                path: '/myquiz',
                component: MyQuizPage,
            },
            {
                path: '/quiz/:quizCategory/:quizLevel/:quizNo',  // 동적 경로
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
            {
                path: '/quiz/:quizCategory/:quizLevel',
                component:QuizMain,
            },
            {
                path:'board',
                component:board
            },
            {
                path:'board/boardwrite',
                component:writeboard
            },
            {
                path:'board/boardDetail',
                component:boardDetail
            },
            {
                path: 'notice',
                component: usernotice
            },
            {
                path:'notice/noticeDetail',
                component: usernoticeDetail
            }
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
                {
                    path:'quizzes',
                    component:Quizzes
                },
                {
                    path:'notice',
                    component:notice
                },
                {
                    path:'notice/noticewrite',
                    component:writenotice
                },
                {
                    path:'notice/noticeDetail',
                    component:noticeDetail
                }
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
                    },
                    {
                        path: 'quizpage',
                        component: MyQuiz,
                    },
                    {
                        path: '/write/:quizNo',  // 동적 경로
                        name: 'WritePage',
                        component: Write,
                        props: true  // 컴포넌트에 route.params를 props로 전달
                    },
                ]},
       
       
    ]

window.Kakao.init('79eb0be4a08b223b4a5553fe99835470');

const router = createRouter({
    history: createWebHistory(),
    routes
});

// 홈으로 이동시 메뉴 접음
router.beforeEach((to, from, next) => {
    if (to.path == '/') {
        store.commit('setSidebarMarginLeft', '-30rem');
        store.commit(store.state.quizGetCategory = '');
        store.commit(store.state.quizGetLevel = '');
    }
    next();
})

const emitter = mitt();

const app = createApp(App)
const pinia = createPinia();
app.use(router);
app.use(pinia);
app.use(store);
app.use(VueSweetalert2);
app.use(Vuetify);
// app.use(emitter);
app.config.globalProperties.emitter = emitter
app.mount('#app')
