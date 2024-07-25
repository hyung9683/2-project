
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
    
    mutations: {
        user(state, data){
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