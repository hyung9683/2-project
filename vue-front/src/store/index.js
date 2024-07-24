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
            }
        }
        
    },
    // 상태를 변경하는 메서드
    mutations: {
        //user()는 state.user를 전달된 data 상태를 가진다. 컴포넌트에서 상태를 변경할때 사용
        user(state, data) {
            state.user = data;
        }
    },
    plugins: [
        // 로컬스토리지에 자동으로 저장시킬 persistedstate 모듈을 plugins에 연결
        persistedstate({
            //어떤 state를 저장할지 정한다
            paths: ['user']
        })
    ]
});

export default store;