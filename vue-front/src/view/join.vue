<template>
    <div class="join_box"><br><br>
        <div class="background" @submit.prevent="onSubmitForm">
            <form id="sendForm">
                <input type="text" v-model="user_id" placeholder="아이디">
                <input type="text" v-model="user_nick" placeholder="닉네임">
                <input type="email" v-model="user_email" placeholder="이메일">
                <input type="password" v-model="user_passwd" placeholder="비밀번호(8~12자 내외, 특수문자 포함하여 입력하세요)">
                <input type="password" v-model="user_passwd_ck" placeholder="비밀번호 확인">
                <input type="tel" @input="validatePhoneNumber" v-model="user_num" placeholder="전화번호">
<br>
                <!-- 약관 동의 영역 추가 -->
                <div class="terms-container">
                    <input type="checkbox" v-model="termsAccepted" id="terms" class="terms-checkbox">
                    <label for="terms">약관에 동의합니다</label>
                </div>

                <!-- 약관 전문 표시 영역 -->
                <div class="terms-section"><br>
                    <button type="button" class="terms" @click="toggleTerms">{{ showTerms ? '약관 접기' : '약관 보기' }}</button>
                    <div class="terms-content" v-if="showTerms">
                        <h3>이용약관</h3>
                        <p>
                            본 약관은 [QuizBee]가 제공하는 서비스에 관한 이용 조건 및 절차를 규정합니다. 서비스는 본 약관에 동의하는 이용자에게 제공됩니다. 
                            이용자는 본 약관을 숙지하고 동의한 후 서비스를 이용하여야 합니다.
                        </p>
                        <p>
                            <strong>1. 서비스 이용</strong><br>
                            서비스는 사용자에게 다양한 기능과 정보를 제공하며, 사용자는 이를 자유롭게 이용할 수 있습니다. 
                            단, 불법적이거나 부적절한 용도로 사용해서는 안 됩니다.
                        </p>
                        <p>
                            <strong>2. 개인정보 보호</strong><br>
                            [QuizBee]는 이용자의 개인정보를 보호하기 위해 최선의 노력을 다합니다. 
                            개인정보는 서비스 제공을 위해 필요한 범위 내에서만 사용됩니다.
                        </p>
                        <p>
                            <strong>3. 책임의 한계</strong><br>
                            [QuizBee] 서비스 이용 중 발생할 수 있는 모든 문제에 대해 책임지지 않습니다. 
                            이용자는 자신의 책임 하에 서비스를 이용하여야 합니다.
                        </p>
                        <p>
                            <strong>4. 약관의 변경</strong><br>
                            [QuizBee]는 본 약관을 사전 통지 없이 변경할 수 있으며, 변경된 약관은 서비스에 게시된 날부터 효력을 발생합니다.
                        </p>
                    </div>
                </div>

                <br />
                <button width="100px" class="btn" type="submit">회원가입</button>
            </form>
            <img src="../assets/kakaoLogin.png" class="btn_kakao" style=" width:445px; height:57px; margin-top:-40px; margin-left:-8px" @click="kakaoLogin">
        </div>
    </div>
</template>

<style scoped>
@font-face {
    font-family: 'GmarketSansMedium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}


.input-error {
    line-height: 16px;
    font-size: 11px;
    color: red;
}

.title-danger {
    color: red;
}

.input-danger {
    border-bottom: 1px solid red !important;
}


.background {
    background: linear-gradient(180deg, rgb(253, 238, 204), rgb(253, 245, 221));
    height: auto;
    width: 90%;
    max-width: 450px;
    padding: 10px;
    margin: 0 auto;
    border-radius: 30px;
    box-shadow: 0px 1px 30px 2px rgb(238, 238, 238);
    text-align: center;
    position: relative;
    top: 50px;

}

div.join_box{
    position: padding;
    height: 750px;
    
}
form {
    align-items: center;
    display: flex;
    padding: 30px;
    flex-direction: column;
   
}

input,
.addinput {
    border: none;
    border-bottom: 2px solid #d49f00;
    background: none;
    padding: 10px;
    font-weight: 700;
    transition: .2s;
    width: 110%;
    font-family: 'GmarketSansMedium';
}

input:active,
input:focus,
input:hover {
    outline: none;
    border-bottom-color: #473500;
    
}

.btn {
    border: none;
    width: 120%;
    border: solid 2px rgb(255, 204, 122);
    border-radius: 8px;
    background-color: rgb(255, 210, 107);
    color: rgb(0, 0, 0);
    padding: 15px 0;
    font-weight: 600;

    cursor: pointer;
    transition: .2s;
    font-family: 'GmarketSansMedium';
}

.btn:hover {
    background-color:  rgb(255, 184, 19);
}
.terms{
     border: solid 2px rgb(255, 204, 122);
    border-radius: 4px;
    background-color: rgb(255, 210, 107);
    color: rgb(0, 0, 0);
}
.terms-checkbox {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    accent-color: rgb(255, 210, 107);
}

</style>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            user_id: '',
            user_nick: '',
            user_email: '',
            user_passwd: '',
            user_num: '',
            user_passwd_ck: '',
            termsAccepted: false, // 약관동의 상태 추가
            showTerms: false, // 약관 표시 여부 추가
        }
    },
    computed: {
        user() {
            return this.$store.state.user; // 로그인 확인
        }
    },

    methods: {
        toggleTerms() {
            this.showTerms = !this.showTerms;
        },



         kakaoLogin() {
            window.Kakao.Auth.login({
                scope: "profile_nickname, account_email",
                success: this.getKakaoAccount,
            });
        },
        getKakaoAccount() {
            window.Kakao.API.request({
                url: "/v2/user/me",
                success: (res) => {
                    const kakao_account = res.kakao_account;
                    const email = kakao_account.email; //카카오 이메일
                    const nickname = kakao_account.profile.nickname;
                    // this.user_id = email

                    axios({
                        url: "http://localhost:3000/auth/kakaoJoinProcess",
                        method: "POST",
                        data: {
                            user_id: email,
                            user_nick: nickname
                        },
                    }).then(res => {
                        if (res.data.message == '저장완료') {
                            this.$swal({
                                position: 'top',
                                icon: 'success',
                                title: '회원가입 성공!',
                                showConfirmButton: false,
                                timer: 1000
                            })

                        }
                        else {
                            this.$swal({
                                position: 'top',
                                title: '이미 생성된 계정이 있습니다.',
                                showConfirmButton: false,
                                timer: 1000
                            })
                        }
                        this.$router.push("/login");

                    })
                        .catch(err => {
                            console.log(err);
                        })
                },
                fail: (error) => {
                    console.log(error);
                },
            });

        },

        onSubmitForm() {
            if (!this.validationCheck()) {
                return;
            }
            axios({
                url: "http://localhost:3000/auth/join_process",
                method: "POST",
                data: {
                    user_id: this.user_id,
                    user_nick: this.user_nick,
                    user_email: this.user_email,
                    user_passwd: this.user_passwd,
                    user_num: this.user_num,
                },
            })
                .then(res => {
                    if (res.data.message == 'already_exist_id') {
                        this.$swal("이미 존재하는 아이디입니다.")
                    }
                    else if (res.data.message == 'DB_error') {
                        this.$swal("DB 에러 발생")
                    }
                    else {
                        this.$swal({
                            position: 'top',
                            icon: 'success',
                            title: '회원가입이 완료되었습니다!',
                            showConfirmButton: false,
                            timer: 1000
                        })
                        this.$router.push({ path: '/login' }); // 로그인 화면으로 이동
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        },

        validationCheck() {
            if (this.user_id == "") {
                this.$swal("아이디를 입력하세요.");
                return false;
            }

            if (this.user_nick == "") {
                this.$swal("닉네임을 입력하세요.");
                return false;
            }

            if (this.user_email == "") {
                this.$swal("이메일 주소를 입력하세요.");
                return false;
            }

            if (this.user_passwd == "") {
                this.$swal("비밀번호를 입력하세요.");
                return false;
            }

             // 비밀번호 유효성 검사: 특수문자 포함, 8자에서 12자 사이
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-zA-Z0-9]).{8,12}$/;
    if (!passwordRegex.test(this.user_passwd)) {
        this.$swal("비밀번호는 특수문자를 포함하여 8자 이상, 12자 이하여야 합니다.");
        return false;
    }

            if (this.user_passwd_ck !== this.user_passwd) {
                this.$swal("비밀번호가 일치하지 않습니다.");
                return false;
            }

            if (this.user_num == "") {
                this.$swal('전화번호를 정확히 입력해주세요.');
                return false;
            }
              if (!this.termsAccepted) {
                this.$swal('약관에 동의해야 가입할 수 있습니다.');
                return false;
            }
            return true;
        },
        validatePhoneNumber() {
            this.user_num = this.user_num.replace(/\D/g, ''); // 숫자 이외의 문자 제거
        },
    },
}
</script>