<template>
<<<<<<< HEAD
  <div class="header_wrapper">
    <nav class="navbar_top" aria-label="">
      <div class="navbar_logo title" @click="goToHome()">
        <img src="../assets/logo.png" alt="로고">
      </div>

      <div id="__next">
            <main class="__className_d47c56">
                <header class="PageLayout_root__zyj2K">
                    <div class="PageLayout_headerContainer__SobS7">
                        <a class="PageLayout_iconWrap__WBO1f" href="/">
                            <img class="PageLayout_mainIcon__vBzU6" src="/main.png" alt=""/>
                        </a>
                        <div class="QuizMainHeader_root___aSAQ">
                            <button type="button" class="HeaderButton_normalButton__FXJTv">공지사항</button>
                            <button type="button" class="HeaderButton_normalButton__FXJTv">로그인</button>
                        </div>
                    </div>
                    </header>
                    </main>
                    </div>                              
    </nav>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      adminCk: 0,
      keyword: this.$route.query.keyword,
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  mounted() {
    if (this.user.user_id == '') {
      // 일단은 로그인 여부 체크 
    } else {
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
  methods: {
    goToTrip() {
      window.location.href = `http://localhost:8080/trip/서울특별시/1`;
    },
    goToFes() {
      window.location.href = `http://localhost:8080/festival/서울특별시/1`;
    },
    searchKeyword(keyword) {
      if (this.keyword) {
        window.location.href = 'http://localhost:8080/search?keyword=' + keyword;
      }
    },
    goToQna() {
      window.location.href = `http://localhost:8080/qna?page=1`;
    },
    goToList() {
      this.$router.push({ path: '/all' });
    },
    goToLogin() {
      this.$router.push({ path: '/login' });
    },
    goToJoin() {
      this.$router.push({ path: '/join' });
    },
    goToAdmin() {
      window.location.href = `http://localhost:8080/admin/user`;
    },
    goToMypage() {
      if(this.user.user_no) {
        this.$router.push({ path: '/mypage' });
      } else {
        this.$swal({
          title: '접근 실패.',
          text: '로그인이 필요한 작업입니다.',
          icon: 'error',
          showConfirmButton: '확인',
          timer: 1500
        });
        this.$router.push({ path: '/login' })
      }
    },
    goToBoard() {
      this.$router.push({ path: '/board' });
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
    goToHome() {
      window.location.href = "http://localhost:8080";
    }
  }
}
</script>

<style scoped>
.header_wrapper {
  background-color:skyblue; /* 배경 색상 */
  padding: 10px 20px;
}

.navbar_top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar_logo img {
  height: 50px;
  cursor: pointer;
}

.navbar_search {
  display: flex;
  align-items: center;
}

.navbar_search input {
  width: 250px;
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

.navbar_search button {
  background-color: #007bff;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 5px;
}

.navbar_search button img {
  height: 20px;
}

.navbar_icons {
  list-style: none;
  display: flex;
  align-items: center;
}

.navbar_icons li {
  margin-left: 20px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.navbar_icons li:hover {
  color: #007bff;
}

.join {
  list-style: none;
  display: flex;
  align-items: center;
}

.join li {
  margin-left: 20px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.join li:hover {
  color: #007bff;
}

.mediago-placement_dfcd99 {
  white-space: normal;
  background-color: white;
}

.mediago-placement_dfcd99 a {
  text-decoration: none;
  cursor: pointer;
}

.mediago-placement_dfcd99 ul {
  list-style: none;
}

.mediago-placement_dfcd99 h3 {
  color: #000;
  font-weight: normal;
  font-size: 24px;
  line-height: 1.2;
  max-height: 96px;
  overflow: hidden;
}

.fluid_dfcd99 > .mediago-placement_dfcd99 {
  margin: 0 auto;
}

.mediago-placement_dfcd99.c728x90_i18n_dfcd99 {
  position: relative;
  border: 1px solid #e8e8e8;
  box-sizing: border-box;
  display: flex;
  font-family: 'Segoe UI', Arial, sans-serif;
}

.mediago-placement_dfcd99.c728x90_i18n_dfcd99 a {
  text-decoration: none;
}

.mediago-placement_dfcd99.c728x90_i18n_dfcd99 > .placement-item_dfcd99 {
  display: block;
  flex: 1;
  display: flex;
  height: 100%;
  width: 100%;
}

.mediago-placement_dfcd99.c728x90_i18n_dfcd99 > .placement-item_dfcd99 .mediago-img_dfcd99 {
  flex-shrink: 0;
  display: inline-block;
  width: 160px;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.mediago-placement_dfcd99.c728x90_i18n_dfcd99 > .placement-item_dfcd99 .mediago-right-contain_dfcd99 {
  height: 100%;
  flex: 1;
  display: inline-block;
  justify-content: space-between;
  align-items: center;
  padding: 0px 25px;
  vertical-align: top;
}

.mediago-placement_dfcd99.c728x90_i18n_dfcd99 > .placement-item_dfcd99 .mediago-right-contain_dfcd99 .mediago-text_dfcd99 {
  width: 362px;
  display: inline-block;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.mediago-placement_dfcd99.c728x90_i18n_dfcd99 > .placement-item_dfcd99 .mediago-right-contain_dfcd99 .mediago-brand-name_dfcd99 {
  display: block;
  color: #000;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.1;
  max-height: calc(100% - 22px);
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  padding-top: 2px;
  flex-shrink: 0;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  overflow: hidden;
  -webkit-box-orient: vertical;
}

.mediago-placement_dfcd99.c728x90_i18n_dfcd99 > .placement-item_dfcd99 .mediago-right-contain_dfcd99 .mediago-sname-text_dfcd99 {
  display: flex;
  align-items: center;
  margin-top: 5px;
  font-size: 12px;
  transform: scale(0.91666667);
  transform-origin: 0 0;
  color: #555;
}

.mediago-placement_dfcd99.c728x90_i18n_dfcd99 > .placement-item_dfcd99 .mediago-right-contain_dfcd99 .mediago-read-more_dfcd99 {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  display: inline-block;
  box-sizing: border-box;
  width: 145px;
  height: 45px;
  line-height: 44px;
  text-align: center;
  font-size: 13px;
  font-weight: bold;
  border: #65a3ee solid 2px;
  color: #65a3ee;
}

.mediago-placement_dfcd99.c728x90_i18n_dfcd99 > .placement-item_dfcd99 .mediago-right-contain_dfcd99 .mediago-read-more_dfcd99 .icon_dfcd99 {
  display: inline-block;
  animation: popup_dfcd99 0.5s ease-in-out infinite alternate;
}

@keyframes popup_dfcd99 {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(8px);
  }
}

.mediago-placement_dfcd99.c728x90_i18n_dfcd99 .mediago-ad-icon_dfcd99 {
  position: absolute;
  top: 2px;
  right: 2px;
}

.mediago-placement_dfcd99.c728x90_i18n_dfcd99 .mediago-ad-icon_dfcd99 > a {
  font-size: 12px;
  transform: scale(0.91666667) !important;
  transform-origin: 0 0 !important;
  color: #555;
}

.PageLayout_root__zyj2K {
    height: 56px;
    display: flex;
    align-items: center;
    box-shadow: inset 0 -.125rem #f2f2f2;
    background-color: #fff;
    padding-left: 32px;
    padding-right: 32px
}

@media(max-width: 576px) {
    .PageLayout_root__zyj2K {
        padding-left:12px;
        padding-right: 12px
    }
}

.PageLayout_root__zyj2K .PageLayout_headerContainer__SobS7 {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    max-width: 1200px
}

@media(max-width: 1612px) {
    .PageLayout_root__zyj2K .PageLayout_headerContainer__SobS7 {
        max-width:1050px
    }
}

.PageLayout_root__zyj2K .PageLayout_iconWrap__WBO1f {
    display: flex
}

.PageLayout_root__zyj2K .PageLayout_mainIcon__vBzU6 {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    cursor: pointer
}

.PageLayout_root__zyj2K .PageLayout_menu__LUbKy {
    display: flex;
    align-items: center;
    font-size: 24px;
    color: #434343;
    font-weight: 700;
    cursor: pointer
}

.GeometricElement_root__Y4G98 {
    position: absolute
}

.GeometricBackground_container__JUyI_ {
    background-color: #313492;
    position: relative
}

.GeometricBackground_container__JUyI_ .GeometricBackground_geometricElementContainer__hmPlK {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden
}

.GeometricBackground_container__JUyI_ .GeometricBackground_randomElementContainer__tJO7W>div {
    transition: opacity .2s
}

.GeometricBackground_container__JUyI_ .GeometricBackground_randomElementContainer__tJO7W>.GeometricBackground_show__4o0Aa {
    opacity: 1
}

.GeometricBackground_container__JUyI_ .GeometricBackground_randomElementContainer__tJO7W>.GeometricBackground_hidden__HK6eH {
    opacity: 0
}

.GeometricBackground_container__JUyI_ .GeometricBackground_fixedElementContainer__9KLId>div {
    transition: top .5s,left .5s,right .5s,bottom .5s
}

.GeometricBackground_container__JUyI_ .GeometricBackground_containerChildren__UKjVk {
    position: relative;
    z-index: 10;
    margin: 0 auto
}

.ImageCover_root__S3MEN {
    width: 100%;
    height: 100%;
    display: flex;
    position: relative
}

.ImageCover_root__S3MEN .ImageCover_image__VCV4r {
    width: 100%;
    height: 100%;
    border-radius: 4px 4px 0 0!important
}

.QuizMyCard_root__L_rzf {
    border-radius: 5px;
    position: relative
}

.QuizMyCard_root__L_rzf:hover {
    transform: scale(1.05);
    transition: .2s
}

.QuizMyCard_root__L_rzf [class*=ant-card-body] {
    padding: 8px
}

@media(max-width: 576px) {
    .QuizMyCard_root__L_rzf:hover {
        transform:none
    }
}

.QuizMyCard_thumbnail__4LfO0 {
    width: 100%;
    height: 180px
}

.QuizMyCard_content__Iz9C0 {
    display: flex;
    min-height: 54px;
    justify-content: space-between;
    align-items: flex-start;
    color: #434343
}

.QuizMyCard_content__Iz9C0 .QuizMyCard_title___VgN2 {
    font-size: 15px;
    font-weight: 500;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box
}

@media(max-width: 576px) {
    .QuizMyCard_content__Iz9C0 .QuizMyCard_title___VgN2 {
        font-size:20px
    }
}

.QuizMyCard_content__Iz9C0 .QuizMyCard_hitsWrap__M_ASt {
    display: flex;
    align-items: center;
    position: absolute;
    top: 8px;
    right: 0;
    z-index: 100;
    min-width: 40px;
    padding-right: 6px
}

.QuizMyCard_content__Iz9C0 .QuizMyCard_hitsIcon__4mmjB {
    color: #fff;
    font-size: 18px;
    padding-right: 5px
}

@media(max-width: 576px) {
    .QuizMyCard_content__Iz9C0 .QuizMyCard_hitsIcon__4mmjB {
        font-size:24px
    }
}

.QuizMyCard_content__Iz9C0 .QuizMyCard_hits__x625u {
    color: #fff;
    font-size: 16px
}

@media(max-width: 576px) {
    .QuizMyCard_content__Iz9C0 .QuizMyCard_hits__x625u {
        font-size:20px
    }
}

.Empty_root__k_unz {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 56px)
}

@supports(min-height: calc(100dvh - 56px)) {
    .Empty_root__k_unz {
        min-height:calc(100dvh - 56px)
    }
}

.Empty_container__RvoAE {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center
}

.Empty_nachungi__8LjkJ {
    height: 40vh
}

@media(max-width: 576px) {
    .Empty_nachungi__8LjkJ {
        height:30vh
    }
}

.Empty_message__UcinR {
    color: #fff;
    font-size: 28px;
    text-align: center;
    font-weight: 700;
    margin-top: 32px
}

@media(max-width: 576px) {
    .Empty_message__UcinR {
        font-size:24px;
        margin-top: 24px
    }
}

.Empty_button__aY__v {
    height: 60px;
    width: 180px;
    margin-top: 40px;
    font-size: 20px
}

@media(max-width: 576px) {
    .Empty_button__aY__v {
        width:140px;
        height: 50px;
        font-size: 16px
    }
}

.QuizMyList_root__MYUVr {
    margin: 0 auto;
    padding-bottom: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1200px
}

@media(max-width: 1612px) {
    .QuizMyList_root__MYUVr {
        max-width:1050px
    }
}

@media(max-width: 576px) {
    .QuizMyList_root__MYUVr {
        margin-left:5px;
        margin-right: 5px;
        margin-top: 20px
    }
}

.QuizMyList_list__g8O0P {
    width: 100%;
    margin-left: -30px;
    margin-right: -30px;
    margin-top: 50px
}

@media(max-width: 576px) {
    .QuizMyList_list__g8O0P {
        margin-top:20px;
        margin-left: 0;
        margin-right: 0
    }
}

.QuizMyList_loadingLottie__ny8wO {
    width: 50px;
    height: 50px
}

.QuestionTypeBadge_root__eId2U {
    width: 32px;
    height: 32px;
    border-radius: 16px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    box-shadow: #33333333
}

@media(max-width: 576px) {
    .QuestionTypeBadge_root__eId2U {
        width:24px;
        height: 24px;
        font-size: 12px;
        border-radius: 16px
    }
}

.QuestionTypeBadge_image__VtKIF {
    background-color: #18911c
}

.QuestionTypeBadge_music__HtOM_ {
    background-color: #e12424
}

.QuizMainCard_root__fKvFb {
    border-radius: 4px;
    position: relative
}

.QuizMainCard_root__fKvFb:hover {
    transform: scale(1.05);
    transition: .2s
}

.QuizMainCard_root__fKvFb [class*=ant-card-body] {
    padding: 8px
}

@media(max-width: 576px) {
    .QuizMainCard_root__fKvFb:hover {
        transform:none
    }
}

.QuizMainCard_thumbnail__XuVA8 {
    width: 100%;
    height: 180px
}

@media(max-width: 576px) {
    .QuizMainCard_thumbnail__XuVA8 {
        height:150px
    }
}

.QuizMainCard_content__eAcWt {
    display: flex;
    height: 92px;
    flex-direction: column;
    align-items: flex-start;
    color: #434343;
    overflow: hidden
}

@media(max-width: 576px) {
    .QuizMainCard_content__eAcWt {
        height:60px
    }
}

.QuizMainCard_content__eAcWt .QuizMainCard_textContainer__rRi7o {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px
}

@media(max-width: 576px) {
    .QuizMainCard_content__eAcWt .QuizMainCard_textContainer__rRi7o {
        gap:4px
    }
}

.QuizMainCard_content__eAcWt .QuizMainCard_title__KLmKA {
    font-size: 15px;
    font-weight: 500;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    display: -webkit-box
}

@media(max-width: 576px) {
    .QuizMainCard_content__eAcWt .QuizMainCard_title__KLmKA {
        font-size:12px
    }
}

.QuizMainCard_content__eAcWt .QuizMainCard_description__zuk09 {
    font-size: 11px;
    font-weight: 500;
    color: #8c8c8c;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden
}

@media(max-width: 576px) {
    .QuizMainCard_content__eAcWt .QuizMainCard_description__zuk09 {
        -webkit-line-clamp:2
    }
}

.QuizMainCard_content__eAcWt .QuizMainCard_hitsWrap__YgDB8 {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: absolute;
    top: 8px;
    right: 0;
    z-index: 100;
    min-width: 40px;
    padding-right: 8px
}

@media(max-width: 576px) {
    .QuizMainCard_content__eAcWt .QuizMainCard_hitsWrap__YgDB8 {
        padding-right:4px
    }
}

.QuizMainCard_content__eAcWt .QuizMainCard_hitsIcon__Lj8_A {
    color: #ddd;
    font-size: 18px;
    padding-right: 5px
}

@media(max-width: 576px) {
    .QuizMainCard_content__eAcWt .QuizMainCard_hitsIcon__Lj8_A {
        font-size:16px
    }
}

.QuizMainCard_content__eAcWt .QuizMainCard_hits__I_Wvo {
    color: #ddd;
    font-size: 16px
}

@media(max-width: 576px) {
    .QuizMainCard_content__eAcWt .QuizMainCard_hits__I_Wvo {
        font-size:14px
    }
}

.QuizMainCard_typeBadge__VEMhQ {
    position: absolute;
    bottom: 116px;
    right: 8px;
    z-index: 100
}

@media(max-width: 576px) {
    .QuizMainCard_typeBadge__VEMhQ {
        bottom:85px
    }
}

@media(max-width: 426px) {
    .QuizMainCard_typeBadge__VEMhQ {
        bottom:81px
    }
}

.AdsenseStickyAdsContainer_root__YPRfu {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: stretch
}

.AdsenseStickyAdsContainer_leftSidebar__i7AYp {
    margin-right: 48px;
    padding-top: 64px
}

@media(max-width: 1480px) {
    .AdsenseStickyAdsContainer_leftSidebar__i7AYp {
        display:none
    }
}

.AdsenseStickyAdsContainer_rightSidebar__rKRZu {
    margin-left: 48px;
    padding-top: 64px
}

@media(max-width: 1480px) {
    .AdsenseStickyAdsContainer_rightSidebar__rKRZu {
        display:none
    }
}

.AdsenseStickyAdsContainer_ads__LvNz0 {
    position: -webkit-sticky;
    position: sticky;
    top: 30px
}

.AdsenseStickyAdsContainer_adsIns__Ow6Xb {
    display: inline-block;
    width: 160px;
    height: 600px
}

@media(min-width: 1920px) {
    .AdsenseStickyAdsContainer_adsIns__Ow6Xb {
        width:300px
    }
}

@media(max-width: 1480px) {
    .AdsenseStickyAdsContainer_adsIns__Ow6Xb {
        display:none
    }
}

@media(max-width: 992px) {
    .AdsenseMobileBanner_root__spuaK {
        width:100%
    }
}

.AdsenseMobileBanner_banner__63URj {
    width: 100%;
    display: none
}

@media(max-width: 992px) {
    .AdsenseMobileBanner_banner__63URj {
        display:block
    }
}

@media(max-width: 576px) {
    .AdsenseMobileBanner_banner__63URj {
        display:block
    }
}

.AdsenseMobileBanner_large__ED6l3 {
    height: 200px
}

.AdsenseMobileBanner_medium__ogfgQ {
    height: 100px
}

.AdsenseMobileBanner_small__8MCKX {
    height: 60px
}

.AdsenseMobileBanner_hideOnUnfilled__cvO62[data-ad-status=unfilled] {
    display: none!important
}

.QuizMainList_adsContainer__Cb68f {
    flex: 1 1;
    width: 100%
}

.QuizMainList_root__jhR3j {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1200px
}

@media(max-width: 1612px) {
    .QuizMainList_root__jhR3j {
        max-width:1050px
    }
}

.QuizMainList_scrollContainer__8AnJU {
    padding-top: 16px;
    padding-bottom: 100px;
    margin-top: 32px;
    margin-left: -30px;
    margin-right: -30px
}

@media(max-width: 576px) {
    .QuizMainList_scrollContainer__8AnJU {
        margin-left:0;
        margin-right: 0;
        margin-top: 20px
    }
}

.QuizMainList_list__oGQog {
    margin-left: 0!important;
    margin-right: 0!important;
    margin-bottom: 32px
}

.QuizMainList_banner__3zXg1 {
    margin-bottom: 32px
}

.QuizMainList_empty__f8eL6 {
    padding: 10px;
    color: #fff
}

.QuizMainList_loadingLottie__Odo7b {
    position: absolute;
    width: 100px;
    height: 100px;
    left: calc(50% - 50px);
    bottom: 0
}

.QuizMainList_footer__6yOYq {
    width: 100%;
    height: 72px;
    display: flex;
    justify-content: center
}

.QuizMainList_contact__QlGbf {
    display: flex;
    align-items: center;
    gap: 8px
}

.QuizMainList_contactIcon__eBKXv {
    font-size: 12px;
    color: #fff
}

.QuizMainList_footerText__8hXhB {
    font-size: 12px;
    color: #fff;
    cursor: pointer
}

@media(max-height: 700px) {
    .KakaoAds_sidebar__HusyS {
        display:none
    }
}

.KakaoAds_banner__Hz7LF {
    width: 100vw;
    display: none;
    text-align: center;
    font-size: 0;
    line-height: 0
}

@media(max-width: 992px) {
    .KakaoAds_banner__Hz7LF {
        display:block
    }
}

.FilterIcon_root__ovyB7 {
    border-radius: 100%;
    padding: 4px 12px;
    height: 40px
}

.FilterIcon_root__ovyB7:hover {
    color: #fff!important;
    background-color: #550ec2!important;
    border-color: #550ec2!important
}

.FilterIcon_bold__IQ4TN {
    font-weight: 700
}

.SearchBar_root__sRZPb {
    display: flex;
    position: relative;
    width: 100%;
    height: 40px
}

.SearchBar_input__Oy_5p {
    border-radius: 25px!important;
    padding-left: 16px;
    padding-right: 54px
}

.SearchBar_searchButton__rDUGw {
    position: absolute;
    z-index: 1;
    right: -2px;
    height: 40px;
    background-color: #6f2cdb;
    border-radius: 0 25px 25px 0;
    border: 1px solid #550ec2;
    color: #fff
}

.SearchBar_searchButton__rDUGw:focus,.SearchBar_searchButton__rDUGw:hover {
    background-color: #550ec2!important;
    border-color: #550ec2!important
}

.FilterSearchBar_root__TjEvk {
    width: 100%;
    display: flex;
    position: relative;
    gap: 12px;
    max-width: 1200px
}

@media(max-width: 1612px) {
    .FilterSearchBar_root__TjEvk {
        max-width:1050px
    }
}

@media(max-width: 576px) {
    .FilterSearchBar_root__TjEvk {
        padding:0 10px;
        margin-top: 8px;
        gap: 6px
    }
}

.QuizContainer_root__onrUh {
    padding-top: 48px;
    display: flex;
    flex-direction: column;
    flex: 1 1
}

@media(max-width: 576px) {
    .QuizContainer_root__onrUh {
        padding-top:24px
    }
}

.QuizContainer_adsContainer__IGezM {
    display: flex;
    flex-direction: column;
    flex: 1 1;
    align-items: center
}

@media(max-width: 992px) {
    .QuizContainer_banner__N_gx9 {
        margin:-48px -32px 24px
    }
}

@media(max-width: 576px) {
    .QuizContainer_banner__N_gx9 {
        margin-top:-24px;
        margin-left: -3px;
        margin-right: -3px
    }
}

.HeaderButton_normalButton__FXJTv {
    background-color: #ddd;
    color: #000
}

.HeaderButton_highlightedButton__zIxOr,.HeaderButton_normalButton__FXJTv {
    width: 80px;
    height: 40px;
    font-size: .8em;
    font-weight: 500;
    border: none;
    cursor: pointer;
    border-radius: 4px
}

.HeaderButton_highlightedButton__zIxOr {
    background-color: #6f2cdb;
    color: #fff
}

.NotificationItem_root__Z0V3F {
    width: 100%;
    height: 80px;
    padding: 12px 16px;
    text-overflow: ellipsis;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: stretch;
    align-items: center;
    gap: 8px
}

.NotificationItem_container__V2y_J {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between
}

.NotificationItem_pointer___kkwC {
    cursor: pointer
}

.NotificationItem_content__OMhvF {
    font-size: 12px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box
}

.NotificationItem_date__CO_ee {
    font-size: 8px;
    color: #8c8c8c
}

.NotificationItem_close__qrD0Q {
    font-size: 12px;
    cursor: pointer;
    color: #8c8c8c
}

.NotificationItem_newDot__vYVrV {
    width: 5px;
    height: 5px;
    border-radius: 2.5px;
    background-color: #ff4d4f;
    position: absolute;
    top: 8px;
    right: 8px
}

.NotificationHubButton_notifBadge__mL9oa {
    margin-right: 8px
}

.NotificationHubButton_notifIcon__m6JjA {
    font-size: 24px;
    cursor: pointer
}

.NotificationHubButton_notifContainer__01lPO {
    position: relative
}

.NotificationHubButton_notifContentContainer__XTlh_ {
    width: 300px;
    height: 300px;
    position: absolute;
    z-index: 100;
    top: 40px;
    left: -75px;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 1px 1px 1px rgba(0,0,0,.2);
    overflow: hidden
}

.NotificationHubButton_divider__fK_tq {
    width: 100%;
    height: 1px;
    background-color: #f2f2f2
}

.NotificationHubButton_emptyContainer__PqmfT {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center
}

.NotificationHubButton_emptyText__7gFxM {
    font-size: 14px;
    color: #8c8c8c
}

.QuizMainHeader_root___aSAQ {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 16px
}

</style>
=======
    <div class="container">
        
    </div>
</template>

<script>
export default {
    name: '',
    components: {},
    data() {
    return {
        example: '',
    }
}, 
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {},
    computed: {},
    beforeUpdate() {}, 
    updated() {}, 
    beforeUnmount() {},
    unmounted() {},
    methods: {}
}
</script>
>>>>>>> 64042c2d978b603ea1435560de73ede91789d5cc
