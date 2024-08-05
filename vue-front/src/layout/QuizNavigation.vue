<template>
         <!-- 현재 위치 navigation -->
         <nav class="navbar navbar-expand-md navbar-light bg-primary fixed-top Navi_head" style="height:2.5rem;" :style="navi" ref="navi">
            <div class="navbar nav d-flex col-lg-12 fs-6">
                      <div>
                        <button type="button" class="btn col-2 align-items-middle" data-bs-toggle="button" style="max-height:1.7rem; text-align: center;" @click="Home()">
                            Home
                        </button>
                      </div>
                        <div v-if="this.Menu.category" class="col-2" style="text-align: center;">
                          <button class="btn">
                            <i class="bi bi-caret-right" style="height:100%;"></i>
                            {{this.Menu.category}}
                          </button>
                        </div>
                        <div v-if="this.Menu.category && this.Menu.level" class="col-2" style="text-align: center;">
                          <i class="bi bi-caret-right" style="height:100%;"></i>
                          <button type="button" class="btn" data-bs-toggle="button" style="height:100%;" @click="menuList()">
                            {{ this.Menu.level }}
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
            naviTop: '0',
        }
    }, 
    created() {
        // this.emitter.on('sidebar-toggled', this.toggleDefaul);
    },
    mounted() {
        // this.emitter.on('sidebar-toggled', this.toggleDefaul);
        this.updateNaviHeight();
        window.addEventListener('resize', this.updateNaviHeight);
        
        this.$router.afterEach((to) => {
              console.log('가져온 주소',to.path);
              this.menuName();
            })
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
        },
        headerHeight() {
          return this.$store.state.headerHeight;
        },
        baseTop() {
          return parseInt(this.naviTop || '0', 10);
        },

        computedTop() {
          const height = this.headerHeight;
          const baseTop = this.baseTop;

          if(!isNaN(height) && !isNaN(baseTop)) {

            return baseTop + height;
          }

          return baseTop;
        },
        navi() {
          return {
            top:`${this.computedTop}px`
          }
        },

    },
    methods: {

    menuName() {
          try {
            // store에 저장된 $router주소
            // const currentAddress = this.currentUrl;
            const currentCategory = this.addCategory;
            const currentLevel = this.addLevel;
            console.log(currentCategory, ',' , currentLevel);
            // const category = await axios.get(`http://localhost:3000/quiz/list`)
            // console.log([category.data]);
            
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