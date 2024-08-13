<template>
 <!-- top navbar -->
 <div id="top_navbar" class="col-lg-12 ms-auto bg-success-subtle fixed-top py-2 header" ref="header">
    <div class="row align-items-center">
        <div class="col-md-4">
            <div class="nav text-light text-uppercase mb-0"><button class="btn" style="border:none;" @click="sideBarMenu"><i class="bi bi-list px-1 mx-1 me-2"></i></button>
                <a href="#" class="nav-link text-dark logo-container" @click="goToHome"><img class="img-fluid h4-image" src="../assets/logo.png" style="object-fit: contain;" :style="imageSize"></a>
            </div>
        </div>
        <div class="col-md-4"></div>
        <div class="col-md-4" style="padding-left: 15%;">
            <ul class="navbar-nav" v-if="this.user.user_no == ''">
                <li class="nav-item"><a href="#" class="nav-link subBtn" @click="login"><div class="loginBtn">로그인</div></a></li>
                <li class="nav-item"><a href="#" class="nav-link subBtn" @click="join"><div class="joinBtn">회원가입</div></a></li>
            </ul>
            <ul class="navbar-nav" v-else-if="adminCk == 1 && this.user.user_no">
                <li class="nav-item"><a href="#" class="nav-link logBtn" @click="goToAdmin"><i class="bi bi-incognito text-dark bi-lg"></i></a></li>
                <li class="nav-item"><a href="#" class="nav-link logBtn" @click="goToMypage"><i class="bi bi-person-square text-dark bi-lg"></i></a></li>
                <li class="nav-item"><a href="#" class="nav-link" @click="logout"><i class="bi bi-box-arrow-right text-danger bi-lg"></i></a></li>
            </ul>
            <ul class="navbar-nav" v-else>
                <li class="nav-item"><a href="#" class="nav-link" @click="goToMypage"><i class="bi bi-person-square text-dark bi-lg"></i></a></li>
                <li class="nav-item"><a href="#" class="nav-link" @click="logout"><i class="bi bi-box-arrow-right text-danger bi-lg"></i></a></li>
            </ul>
        </div>
    </div>
</div>
    <!-- /top navbar -->
</template>


<script>
import axios from 'axios';

export default {
    components: {},
    data() {
    return {
        imageSize: {
            height: '7rem',
            width: 'auto',

        },
        adminCk: 0,
    }
}, 
    created() {},
    mounted() {
        if (this.user.user_id == '') {
      // 일단은 로그인 여부 체크 
      
    }
    else {
      axios({
        url: "http://localhost:3000/auth/admin_ck",
        method: "POST",
        data: {
          user_no: this.user.user_no,
        },
      })
        .then(res => {
          if (res.data.message == 'admin') {
            this.adminCk = 1;
            this.emitter.emit('adminCk', this.adminCk);
          } else {
            this.adminCk = 0;
            this.emitter.emit('adminCk', this.adminCk);
          }
        })
        .catch(() => {
          this.$swal("접속 오류");
        })
    }

    this.updateHeaderHeight(); // 해당 컴포넌트의 offsetHeight의 초기값
    window.addEventListener('resize', this.updateHeaderHeight);
    },
    beforeUnmount() {

        window.removeEventListener('resize', this.updateHeaderHeight);

    },
    watch: {
    'user.user_id'(newVal) {
      if (newVal) {
        axios({
          url: "http://localhost:3000/auth/admin_ck",
          method: "POST",
          data: {
            user_no: this.user.user_no,
          },
        })
          .then(res => {
            if (res.data.message == 'admin') {
              this.adminCk = 1;
            }
          })
          .catch(() => {
            this.$swal("접속 오류");
          });
      }
    }
  },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    methods: {
        sideBarMenu() {
            this.emitter.emit('SideBarMenu');
        },
        updateHeaderHeight() {
            const headerElement = this.$refs.header;
            if(headerElement) {
                this.$store.commit('setHeaderHeight', headerElement.offsetHeight);
                
                if(this.isMounted) {
                    console.log('header의 offsetHeight:', headerElement.offsetHeight);
                } else {
                    console.log('created:', headerElement.offsetHeight);
                }
                
            } 
        },
        login(){
            this.$router.push({ path: '/login'});
        },
        join() {
            this.$router.push({ path: '/join'});
        },
        goToHome() {
            window.location.href=`http://localhost:8080/`;
        },

       logout() {
        // router.push를 사용할시 store user의 상태를 {} 이게 아닌 user_id:'', user_no: ''를 명시해줘야 위 조건문에서 제대로 확인이 된다.
            this.$store.commit("user", {user_id:'', user_no:''});
            // this.$store.commit("user", {});
            this.$swal({
            position: 'top',
            icon: 'success',
            title: '로그아웃되셨습니다.',
            showConfirmButton: false,
            timer: 1000,
        }).then(() => { 
            //window.location.href를 사용시 router.push랑 다르게 새로고침도 해주기 때문에 확실하게 명시해주지 않아도된다.
                window.location.href = "http://localhost:8080";
                        // this.$router.push({ path:'/'});

            }).catch((err) => {
                
                console.error(err);
            });
        },
        goToMypage() {
        if(this.user.user_no) {

            this.$router.push({ path: '/mypage' });

        } else {
            this.$swal({
            title: '접근 실패.',
            text:'로그인이 필요한 작업입니다.',
            icon: 'error',
            showConfirmButton:'확인',
            timer: 1500
            });
            this.$router.push({ path: '/login'})
            }
        },
        goToAdmin() {
            if (this.adminCk == 1 && this.user.user_no) {

                return this.$router.push({ path: '/admin/user?page=1'});
            }
        }

    }
}
</script>
<style scoped>


.logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3rem;
    overflow: hidden;
    padding: 0;
    
}

.h4-image {
    height: auto;
    max-height: 100%;
    width: 100%;
}

.joinBtn {
    max-width: auto;
}

.loginBtn {
    max-width: auto;
}


</style>
