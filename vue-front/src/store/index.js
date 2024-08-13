
import {createStore} from 'vuex'

//vuex 상태를 로컬 스토리지에 자동으로 저장해준다
import persistedstate from 'vuex-persistedstate';

const store = createStore({
    //store의 상태 정의

    state() {
        return {
            user: {
                user_id: '',
                user_no: '',
            },
            headerHeight: 0, // headerHeight를 저장할 state 추가
            naviHeight: 0,
            currentUrl: '',
            quizGetCategory: '',
            quizGetLevel: '',
            // Menulayout.vue marginLeft 값
            sidebarMarginLeft: '-30rem',
            boardNumber:'',
            noticeNumber: '',
            qnaNumber: '',
            adminCk: 0,
        }
        
    },
    // 상태를 변경하는 메서드
    mutations: {
        //user()는 state.user를 전달된 data 상태를 가진다. 컴포넌트에서 상태를 변경할때 사용
        user(state, data) {
            
            state.user = data;
                
            },

            // headerHeight 상태를 변경하는 메서드 추가
        setHeaderHeight(state, height) {
                state.headerHeight = height;
            },

        setNaviHeight(state, height) {
            state.naviHeight = height;
            },

        setCurrentUrl(state, url) {
            state.currentUrl = url;
            const urlParts = url.split('/');
            console.log(urlParts);
            if(urlParts.length) {
                state.quizGetCategory = urlParts[2];
                state.quizGetLevel = urlParts[3];
            }
        },
        setSidebarMarginLeft(state, marginLeft) {

            state.sidebarMarginLeft = marginLeft;
        },

        setBoardNumber(state, number) {
            state.boardNumber = number;
        },

        setNoticeNumber(state, number) {
            
            state.noticeNumber = number;
        },

        setQnaNumber(state, number) {

            state.qnaNumber = number;
        },
        setAdminCheck(state, admin) {
            state.adminCk = admin;
        },
        
        
    },
    plugins: [
        // 로컬스토리지에 자동으로 저장시킬 persistedstate 모듈을 plugins에 연결
        persistedstate({
            //어떤 state를 저장할지 정한다
            paths: ['user', 'sidebarMarginLeft', 'currentUrl','quizGetCategory', 'quizGetLevel', 'adminCk']
        })
    ]
});

export default store;