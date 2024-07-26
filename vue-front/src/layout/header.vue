<template>
<<<<<<< HEAD
    <div class="header">
      <h1>Header Title</h1>
      <nav>Navigation</nav>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Header'
  }
  </script>
  
  <style scoped>
  .header {
    background-color: #f5f5f5;
    padding: 20px;
    text-align: center;
  }
  </style>
=======
 <!-- top navbar -->
 <div id="top_navbar" class="col-lg-12 ms-auto bg-success-subtle fixed-top py-2 header-container" ref="header">
    <div class="row align-items-center">
        <div class="col-md-4">
            <div class="nav navbar-toggle flex-colum text-light text-uppercase mb-0"><button class="btn" style="border:none;" @click="sideBarMenu"><i class="bi bi-list mx-1 me-2"></i></button><a href="#" class="nav-link text-dark logo-container" @click="goToHome"><img class="img-fluid h4-image" src="../assets/logo.png" style="object-fit: contain;" :style="imageSize"></a></div>
        </div>
        <div class="col-md-4"></div>
        <div class="col-md-4" style="padding-left: 15%;">
            <ul class="navbar-nav" v-if="this.user.user_no == ''">
                <li class="nav-item"><a href="#" class="nav-link subBtn" @click="login"><div class="loginBtn">로그인</div></a></li>
                <li class="nav-item"><a href="#" class="nav-link subBtn" @click="join"><div class="joinBtn">회원가입</div></a></li>
            </ul>
            <ul class="navbar-nav" v-else-if="adminCk=1">
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
    name: '',
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
          }
        })
        .catch(() => {
          this.$swal("접속 오류");
        })
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
        headerHeight() {
            const headerHeight = `${this.$refs.header.offsetHeight}`;
            this.emitter.emit('headerHeight', headerHeight);
        },
        login(){
            this.$router.push({ path: '/login'});
        },
        join() {
            this.$router.push({ path: '/join'});
        },
        goToHome() {
            this.$router.push({ path: '/' });
        },

        logout() {
            this.$store.commit("user", {});
            this.$swal({
            position: 'top',
            icon: 'success',
            title: '로그아웃되셨습니다.',
            showConfirmButton: false,
            timer: 1000
        })
            .then(() => {
            window.location.href = "http://localhost:8080";
            })
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

                return this.$router.push({ path: '/admin'});
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
>>>>>>> origin/feature/Ann
