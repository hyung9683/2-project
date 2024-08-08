<template>
    <div class="container quizMain" :style="main_quiz" :class="{'offOn': offOn}">
        <div class="col-12 p-2 border-bottom pb-4 mb-4" v-if="this.addCategory && this.addLevel">
            <div class="col-4 fs-5 text-start">
                {{this.category}}/{{ this.level }}
            </div>
            <div class="col-8"></div>
        </div>
        <div class="col-3"></div>
        <div class="col-6">
            <div class="row quiz_MainList">
                <div class="card p-0" v-for="(item, i) in quizList" :key="i">
                    <div v-if="this.addLevel == item.quiz_level && this.addCategory == item.quiz_category" @click="handleCardClick(item.quiz_no)">
                        <img class="card-img-top p-0 m-0" :src="thImage ? require(`../../../node-back/uploads/${item.quiz_thimg}`) : require(`../../goodsempty.jpg`)">
                        <div class="card-body p-0 d-flex">
                            <div class="card-title m-1 p-1 pb-2 pt-2 text-start" style="font-size: 14px;">
                                제목:{{ item.quiz_tit }}({{ item.quiz_view }})
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-3"></div>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    data() {
        return {
            category: '',
            level: '',
            offOn: false,
            quizList: {},
            thImage: {},
            sideMainTop: '0',
        }
    }, 
    created() {
        this.emitter.on('sidebar-toggled', this.toggleMain);
        this.headName();
        this.quizMain();
    },
    mounted() {
        this.emitter.on('sidebar-toggled', this.toggleMain);
        this.$router.afterEach((to) => {
            console.log(to.path);
            this.headName();
            this.quizMain();
            
        });
    },
    beforeUnmount() {
        this.emitter.off('sidebar-toggled', this.toggleMain);
    },
    computed: {
        user() {
            return this.$store.state.user;
        },

        addressUrl() {
          return this.$store.state.currentUrl;
        },

        addCategory() {
          return this.$store.state.quizGetCategory;
        },

        addLevel() {
          return this.$store.state.quizGetLevel;
        },

        headerHeight() {
            return this.$store.state.headerHeight;
        },
        baseTop() {
            return parseInt(this.sideMainTop || '0', 10);

        },
        naviHeight() {
            return this.$store.state.naviHeight;
        },

        computedTop() {
            const height = this.headerHeight;
            const naviHeight = this.naviHeight;
            const baseTop = this.baseTop;

            if(!isNaN(height) && !isNaN(baseTop) && !isNaN(naviHeight)) {

                return baseTop + (height + naviHeight);
            }

            return baseTop;
        },
        main_quiz() {
            return {
                top: `${this.computedTop}px`,
                transition:'transform 0.25s ease-out',
                transform: 'translateX(9rem)',

            }
        }
    },
    methods: {
        toggleMain(state) {
            this.offOn = !this.offOn
            if (state === 'open'&& !this.offOn) {
                this.main_quiz.transform = 'translateX(9rem)';
            } else if(state === 'closed' && this.offOn) {
                this.main_quiz.transform = 'translate(0)';
            }
        },
        headName() {
            try {
                    const currentCategory = this.addCategory;
                    const currentLevel = this.addLevel;
                    // console.log('headName에서 레벨:',currentLevel);
                    
                if(currentCategory && currentLevel) {

                    if(currentCategory == 1) {
                        this.category = '수학'
                    } else if(currentCategory == 2) {
                        this.category = '영어'
                    } else if(currentCategory == 3) {
                        this.category = '한자'
                    } else if(currentCategory == 4) {
                        this.category = '국어'
                    }

                    if(currentLevel == 1) {
                        this.level = '초급'
                    } else if(currentLevel == 2) {
                        this.level = '중급'
                    } else if(currentLevel == 3) {
                        this.level = '고급'
                    }
                    if(this.isMounted) {
                        console.log(this.category, ',' , this.level);
                    } else {
                        console.log('created:',this.category, ',' , this.level);
                    }
                        
                    
                }
            } catch (error) {
                console.error(error);
                
            }
            
        },
       async quizMain() {
                
        
            try {
                const response = await axios.get(`http://localhost:3000/quiz/quizMain/${this.addLevel}/${this.addCategory}`);
                

                if(response.data.message == 'success') {

                    this.quizList = response.data.results
                    for (this.thImage of this.quizList) {

                       if(this.isMounted) {
                        console.log(this.thImage.quiz_thimg);
                       } else {
                        console.log('created:',this.thImage.quiz_thimg);
                       }
                        
                    }

                    if(this.isMounted) {
                        console.log('현재 퀴즈들:', this.quizList);

                    } else {
                        
                        console.log('created:',this.quizList);
                    }
                    
                    
                }
            } catch(error) {
                console.log('에러 발생:', error);
                
            }
        },
        handleCardClick(quizNo)  {
           
                axios.post(`http://localhost:3000/quiz/view/${quizNo}`)
                .then(() => {
                    this.$router.push(`/quiz/${this.addCategory}/${this.addLevel}/${quizNo}`);
                })
                .catch(error => {
                    console.error('조회 수 업데이트 중 오류 발생:', error);
                });


        
        },
    }
}
</script>
<style scoped>
.quizMain {
    position: relative;
    justify-content: center;
    text-align: center;
    align-content: center;
    top: 500px;
}

.quiz_MainList {
    display: grid;
    position: relative;
    grid-template-columns: repeat(6, 220px);
    gap: 20px;
    width: 100%;
    max-height: 100vh;
}
</style>
