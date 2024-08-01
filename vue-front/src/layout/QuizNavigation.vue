<template>
         <!-- 현재 위치 navigation -->
         <nav class="navbar navbar-expand-md navbar-light bg-body-tertiary position-relative Navi_head" style="top: 3rem; height:2rem; " :style="sideDefaul" :class="{'offOn': offOn}">
            <div class="navbar nav d-flex col-lg-6 fs-6" ref="navi">
                    <div class="location-bar d-flex col-md-8">
                        <button type="button" class="btn d-flex" data-bs-toggle="button" style="max-height:1.7rem;">
                            <div @click="Home()">Home</div>
                        </button>
                        <i v-if="this.Menu.category" class="bi bi-caret-right align-middle" style="max-height:100%;"></i>
                          <div>{{this.Menu.category}}</div>
                        <i v-if="this.Menu.category && this.Menu.level" class="bi bi-caret-right align-middle" style="height:100%;"></i>
                        <button type="button" class="btn d-flex" data-bs-toggle="button" :class="{'btn btn-primary': button_active,'active': isActive_t}" style="height:100%;">
                          <div @click="menuList()">{{ this.Menu.level }}</div>
                        </button>
                    </div>
                    <div class="col-md-4"></div>
            </div>
        </nav>
</template>

<script>
// import axios from 'axios';

export default {
    components: {},
    data() {
    return {
        
            Menu:{
                category: '',
                level: '',
            },
            offOn: false,
            // sideDefaul: {
            //     position: 'relative',
            //     transition: 'transform 0.25s ease-out',
            //     transform: '',
            // },
        }
    }, 
    created() {
        // this.emitter.on('sidebar-toggled', this.toggleDefaul);
    },
    mounted() {
        // this.emitter.on('sidebar-toggled', this.toggleDefaul);
        this.updateNaviHeight();
        window.addEventListener('resize', this.updateNaviHeight);
        this.menuName();
    },

    beforeUnmount() {
        // this.emitter.off('sidebar-toggled', this.toggleDefaul);
        window.removeEventListener('resize', this.updateNaviHeight);
    },
    computed: {
        user() {
            return this.$store.state.user;
        },

        addressUrl() {
          return this.$store.state.currentUrl;
        },

        addCategory() {
          return this.$store.state.quizCategory;
        },

        addLevel() {
          return this.$store.state.quizLevel;
        }

    },
    methods: {
    menuName() {
          try {
            // store에 저장된 $router주소
            // const currentAddress = this.currentUrl;
            const currentCategory = this.quizCategory;
            const currentLevel = this.quizLevel;
            // const category = await axios.get(`http://localhost:3000/quiz/list`)
            // console.log([category.data]);
            this.$router.afterEach((to) => {
              console.log('가져온 주소',to.path);
            })
            
          if(currentCategory == 1) {
            this.Menu.category = '수학'
            console.log('현재 카테고리:', currentCategory);
            if(currentLevel == 1) {
              console.log('현재 난이도:', currentLevel);
              this.Menu.level = '초급'
              console.log(this.Menu.level);

            } else if(currentLevel == 2) {
              console.log('현재 난이도:', currentLevel);
              this.Menu.level = '중급'
              console.log(this.Menu.level);

            } else if(currentLevel == 3) {
              console.log('현재 난이도:', currentLevel);
              this.Menu.level = '고급'
              console.log(this.Menu.level);

            }

            } else if(currentCategory == 2) {
              this.Menu.category = '영어'
              console.log('현재 카테고리:', currentCategory);

              if(currentLevel == 1) {
                console.log('현재 난이도:', currentLevel);
                this.Menu.level = '초급'
                console.log(this.Menu.level);

              } else if(currentLevel == 2) {
                console.log('현재 난이도:', currentLevel);
                this.Menu.level = '중급'
                console.log(this.Menu.level);

              } else if(currentLevel == 3) {
                console.log('현재 난이도:', currentLevel);
                this.Menu.level = '고급'
                console.log(this.Menu.level);

              }

            } else if(currentCategory == 3) {
              this.Menu.category = '한자'
              console.log('현재 카테고리:', currentCategory);

              if(currentLevel == 1) {
                console.log('현재 난이도:', currentLevel);
                this.Menu.level = '초급'
                console.log(this.Menu.level);

              } else if(currentLevel == 2) {
                console.log('현재 난이도:', currentLevel);
                this.Menu.level ='중급'
                console.log(this.Menu.level);

              } else if(currentLevel == 3) {
                console.log('현재 난이도:', currentLevel);
                this.Menu.level = '고급'
                console.log(this.Menu.level);

              }

            } else if(currentCategory == 4) {
              this.Menu.category = '국어'
              console.log('현재 카테고리:', currentCategory);

              if(currentLevel == 1) {
                console.log('현재 난이도:', currentLevel);
                this.Menu.level = '초급'
                console.log(this.Menu.level);

              } else if(currentLevel == 2) {
                console.log('현재 난이도:', currentLevel);
                this.Menu.level = '중급'
                console.log(this.Menu.level);

              } else if(currentLevel == 3) {
                console.log('현재 난이도:', currentLevel);
                this.Menu.level = '고급'
                console.log(this.Menu.level);

              }
            }
          } catch(error) {
            console.error(error);
          }
    },
   menuList() {
      const saveAddress = this.$store.state.currentUrl;
      this.$router.push({path: saveAddress});
    },
    Home() {
      window.location.href = `http://localhost:8080`;
    },
    updateNaviHeight() {
      const NaviElement = this.$refs.navi;
      if(NaviElement) {
        this.$store.commit('setNaviHeight', NaviElement.offsetHeight);
        console.log(NaviElement.offsetHeight);
      }
    },
    // toggleDefaul(state) {
    //     this.offOn = !this.offOn
    //     if(state === 'open' && !this.offOn) {
    //         this.sideDefaul.transform = `translateX(${this.sidebarWidth}px)`;
    //     } else if (state === 'closed' && this.offOn) {
    //         this.sideDefaul.transform = 'translate(0)';
    //     }
    // },
    }
}
</script>
<style scoped>
  .Navi_head {
    box-shadow: 1px 0 0.5px #000000;
  }
</style>