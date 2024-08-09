<template>
         <!-- 현재 위치 navigation -->
         <nav class="navbar navbar-expand-md navbar-light fixed-top Navi_head" style="height:1.6rem; align-items: center;" :style="navi" ref="navi">
            <div class="navbar nav d-flex col-lg-12 fs-6" style="width:33rem;">
                      <div class="col-1" style="position:relative;">
                        <button type="button" class="btn d-flex align-items-center justify-content-center" data-bs-toggle="button" style="height:100%; align-items: center; text-align: center;" @click="Home()">
                            Home
                        </button>
                      </div>
                      <div v-if="this.Menu.category && this.Menu.level" class="col-4 d-flex align-items-center" style="text-align: center;">
                          <i class="bi bi-caret-right" style="height:100%;"></i>
                          <button class="btn" style="height:100%;">
                            {{this.Menu.category}}
                          </button>
                          <i class="bi bi-caret-right" style="height:100%;"></i>
                          <button type="button" class="btn" data-bs-toggle="button" style="height:100%;" @click="menuList()">
                            {{ this.Menu.level }}
                          </button>
                          <!-- <i class="bi bi-caret-right" style="height:100%;"></i>
                          <button type="button" class="btn" data-bs-toggle="button" style="height:100%;" @click="menuList()">
                            {{ this.Menu.category }}
                          </button> -->
                        </div>
                    <div class="col-md-6"></div>
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
          if(this.isMounted){
              console.log('가져온 주소',to.path);
          }
              
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
          return this.$store.state.quizGetCategory;
        },

        addLevel() {
          return this.$store.state.quizGetLevel;
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
            const currentCategory = this.addCategory;
            const currentLevel = this.addLevel;
            
            
          if(currentCategory == 1) {

            this.Menu.category = '수학'

            if(currentLevel == 1) {
              this.Menu.level = '초급'

            } else if(currentLevel == 2) {
              this.Menu.level = '중급'

            } else if(currentLevel == 3) {
              this.Menu.level = '고급'

            }

            } else if(currentCategory == 2) {
              this.Menu.category = '영어'

              if(currentLevel == 1) {

                this.Menu.level = '초급'

              } else if(currentLevel == 2) {

                this.Menu.level = '중급'

              } else if(currentLevel == 3) {

                this.Menu.level = '고급'

              }

            } else if(currentCategory == 3) {
              this.Menu.category = '한자'

              if(currentLevel == 1) {

                this.Menu.level = '초급'

              } else if(currentLevel == 2) {

                this.Menu.level ='중급'

              } else if(currentLevel == 3) {
                this.Menu.level = '고급'

              }

            } else if(currentCategory == 4) {
              this.Menu.category = '국어'

              if(currentLevel == 1) {

                this.Menu.level = '초급'

              } else if(currentLevel == 2) {

                this.Menu.level = '중급'

              } else if(currentLevel == 3) {

                this.Menu.level = '고급'

              }
            }
            if(this.isMounted) {
              
              console.log('현재 카테고리:', currentCategory, this.Menu.category);
              console.log('현재 난이도:', currentLevel, this.Menu.level);

            } else {
              
              console.log('created, 카테고리:', currentCategory, this.Menu.category);
              console.log('created, 난이도:', currentLevel, this.Menu.level);

            }

          } catch(error) {
            console.error(error);
          }
      },
      Home() {
        window.location.href = `http://localhost:8080`;
      },
      updateNaviHeight() {
        const NaviElement = this.$refs.navi;
        if(NaviElement) {
          this.$store.commit('setNaviHeight', NaviElement.offsetHeight);

          if(this.isMounted) {

            console.log(NaviElement.offsetHeight);

          } else {
            
            console.log('created:',NaviElement.offsetHeight);
          }
        }
      },
    }
}
</script>
<style scoped>
  .Navi_head {
    box-shadow: 1px 0 0.5px #000000;
    background-color: #a7b9b6;
  }


</style>