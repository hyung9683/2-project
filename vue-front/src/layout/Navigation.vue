<template>
         <!-- 현재 위치 navigation -->
         <nav class="navbar navbar-expand-md navbar-light bg-body-tertiary position-relative" style="top: 3rem; height:2rem; " :style="sideDefaul" :class="{'offOn': offOn}">
            <div class="navbar nav d-flex col-lg-6 fs-6" ref="navi">
                    <div class="location-bar d-flex col-md-8">
                        <button type="button" class="btn d-flex" data-bs-toggle="button" style="max-height:1.7rem;">
                            <div @click="Home()">Home</div>
                        </button>
                        <i v-if="this.Menu.category" class="bi bi-caret-right align-middle" style="max-height:100%;"></i>
                          <div>{{this.Menu.category}}</div>
                        <i  v-if="this.Menu.category && this.Menu.level" class="bi bi-caret-right align-middle" style="height:100%;"></i>
                        <button type="button" class="btn d-flex" data-bs-toggle="button" :class="{'btn btn-primary': button_active,'active': isActive_t}" style="height:100%;">
                          <div @click="menuList()">{{ this.Menu.level }}</div>
                        </button>
                    </div>
                    <div class="col-md-4"></div>
            </div>
        </nav>
</template>

<script>
import axios from 'axios';

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
    },

    beforeUnmount() {
        // this.emitter.off('sidebar-toggled', this.toggleDefaul);
        window.removeEventListener('resize', this.updateNaviHeight);
    },
    computed: {
        user() {
            return this.$store.state.user;
        },

        sidebar() {
            return this.$store.state.sidebarWidth;
        },

    },
    methods: {
        async menuName() {
      try {
        const category = await axios.get(`http://localhost:3000/quiz/list`)
        console.log([category.data]);
        console.log(category.data[0].quiz_category);
        
       if(this.menuList()) { 

          if(category.data[0].quiz_category == 1 && category.data[0].quiz_level == 1) {
            console.log(category.data.quiz_category);
            this.Menu.category = '수학'
            this.Menu.level = '초급'
          } else if (category.data[0].quiz_category == 2 && category.data[0].quiz_level == 1) {
            this.Menu.category = '영어'
            this.Menu.level = '초급'
          } else if (category.data[0].quiz_category == 3 && category.data[0].quiz_level == 1) {
            this.Menu.category = '한자'
            this.Menu.level = '초급'
          } else if (category.data[0].quiz_category == 4 && category.data[0].quiz_level == 1) {
            this.Menu.category = '국어'
            this.Menu.level = '초급'
          } else if (category.data[0].quiz_category == 1 && category.data[0].quiz_level == 2) {
            this.Menu.category = '수학'
            this.Menu.level = '중급'
          } else if (category.data[0].quiz_category == 2 && category.data[0].quiz_level == 2) {
            this.Menu.category = '영어'
            this.Menu.level = '중급'
          } else if (category.data[0].quiz_category == 3 && category.data[0].quiz_level == 2) {
            this.Menu.category = '한자'
            this.Menu.level = '중급'
          } else if (category.data[0].quiz_category == 4 && category.data[0].quiz_level == 2) {
            this.Menu.category = '국어'
            this.Menu.level = '중급'
          } else if (category.data[0].quiz_category == 1 && category.data[0].quiz_level == 3) {
            this.Menu.category = '수학'
            this.Menu.level = '고급'
          } else if (category.data[0].quiz_category == 2 && category.data[0].quiz_level == 3) {
            this.Menu.category = '영어'
            this.Menu.level = '고급'
          } else if (category.data[0].quiz_category == 3 && category.data[0].quiz_level == 3) {
            this.Menu.category = '한자'
            this.Menu.level = '고급'
          } else if (category.data[0].quiz_category == 4 && category.data[0].quiz_level == 3) {
            this.Menu.category = '국어'
            this.Menu.level = '고급'
          }
        }
      } catch(error) {
        console.error(error);
      }
    },
   menuList() {
        this.$router.push({path: `quiz/${this.Menu.category}/${this.Menu.level}`});
    },
    Home() {
      window.location.href = `http://localhost:8080`;
    },
    updateNaviHeight() {
      const NaviElement = this.$refs.navi;
      console.log(NaviElement);
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