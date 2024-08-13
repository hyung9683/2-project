<template>
    <div class="container">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

        <div class="userPage">
            <br><br>
            <h1>회원 정보</h1>
            <br>
        </div>

        <table class="userinfo">
            <colgroup>
                <col width="12%" />
                <col width="7%" />
                <col width="12%" />
                <col width="12%" />
                <col width="15%" />
                <col width="14%" />
                <col width="10%" />
            </colgroup>
            <thead>
                <tr>
                    <th class="user_title id">아이디</th>
                    <th class="user_title nick">닉네임</th>
                    <th class="user_title img">이미지</th>
                    <th class="user_title email">이메일</th>
                    <th class="user_title logty">로그인 타입</th>
                    <th class="user_title date">가입일</th>
                    <th class="user_title user">사용자 상태</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, i) in filterUserList" :key="i">
                    <td class="users">{{ item.user_id }}</td>
                    <td class="nick">{{ item.user_nick }}</td>
                    <td class="image">
                        <img style="width:80%;" :src="getImageSrc(item.user_no)">
                    </td>
                    <td>{{ item.user_email }}</td>
                    <td>{{ item.user_login_ty }}</td>
                    <td>{{ formatDate(item.user_day) }}</td>
                    <td><button class="del_btn2" @click="confirmDeleteContent(item)">삭제</button></td>
                    <td><button class="del_btn" @click="confirmLockContent(item)">잠금</button></td>
                    <td><button class="del_btn" @click="showReportDetails(item)">신고</button></td>
                </tr>
            </tbody>
        </table>

        <div class="btn-cover">
            <button @click="movetoprveiouspage" class="page-btn">이전</button>
            <span class="page-count">{{ currentPage }}/{{ totalpage }}페이지</span>
            <button @click="movetonextpage" class="page-btn">다음</button>
        </div>

        <!-- Modal -->
        <div v-if="showReport" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="detail" style="margin-left:25%;">신고 상세 내용</h2>
                    <button @click="hideReportDetails" class="close-button">&times;</button>
                </div>
                <div>
                    <label>신고자: {{ selectedReport.author }}</label><br>
                    <label>신고날짜: {{ formatDate(selectedReport.date) }}</label><br>
                </div>
                <div>
                    <label>신고유형</label>
                    <div>
                        <label>
                            <input type="radio" value="비속어 사용" v-model="selectedReport.type" /> 비속어 사용
                        </label>
                        <label>
                            <input type="radio" value="분란 조장" v-model="selectedReport.type" /> 분란 조장
                        </label>
                        <label>
                            <input type="radio" value="스팸/광고" v-model="selectedReport.type" /> 스팸/광고
                        </label>
                        <label>
                            <input type="radio" value="개인정보 노출" v-model="selectedReport.type" /> 개인정보 노출
                        </label>
                    </div>
                </div><br>
                <div>
                    <label>신고 내용:</label>
                    <textarea v-model="selectedReport.content"></textarea>
                </div>
                <div>
                    <button class="c" @click="hideReportDetails" style="background-color:#e6c9a7; height:40px;">닫기</button>
                    <!-- <button @click="submitReport">제출</button> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            userList: [],
            image: {},
            contentlist: [],
            pageSize: 10,
            cnt: 0,
            ImageSrcMap: {},
            currentPage: 1,
            showReport: false,
            selectedReport: {
                author: '',
                date: '',
                type: '',
                content: ''
            }
        }
    },
    created() {
        this.info();
        this.currentPage = parseInt(this.$route.query.page || 1);
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
        filterUserList() {
            return this.userList.filter(item => item.user_type !== 1);
        },
        totalpage() {
            return this.cnt == 0 ? 1 : Math.ceil(this.cnt / 10);
        }
    },
    methods: {
        async showReportDetails(user) {
            console.log(user.user_no);
            try {
                const response = await axios.get(`http://localhost:3000/admin/report/${user.user_no}`);
                if (response.data) {
                    this.selectedReport = {
                        author: response.data.user_nick,
                        date: response.data.report_day,
                        type: this.getReportType(response.data.report_type_id),
                        content: response.data.content
                    };
                    this.showReport = true;
                } else {
                    this.$swal('신고 정보를 불러오는 데 실패했습니다.');
                }
            } catch (error) {
                console.error('신고 세부 사항 조회 오류:', error);
                this.$swal('신고 정보가 없습니다.');
            }
        },
        getReportType(reportTypeId) {
            switch (reportTypeId) {
                case 1:
                    return '비속어 사용';
                case 2:
                    return '분란 조장';
                case 3:
                    return '스팸/광고';
                case 4:
                    return '개인정보 노출';
                default:
                    return '';
            }
        },
        hideReportDetails() {
            this.showReport = false;
        },
        async submitReport() {
            try {
                // Submit report logic here (adjust URL and data as needed)
                const response = await axios.put(`http://localhost:3000/admin/report/${this.selectedReport.user_no}`, this.selectedReport);
                if (response.status === 200) {
                    this.$swal({
                        icon: 'success',
                        title: '신고가 성공적으로 업데이트되었습니다.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    this.hideReportDetails();
                }
            } catch (error) {
                console.error('신고 업데이트 실패:', error);
                this.$swal({
                    icon: 'error',
                    title: '업데이트 실패',
                    text: '신고를 업데이트하는 데 실패했습니다.'
                });
            }
        },
        confirmReportContent(user) {
            this.$swal({
                title: `${user.user_nick} 회원을 신고 하시겠습니까?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: '신고',
                cancelButtonText: '취소',
                reverseButtons: true
            }).then(result => {
                if (result.value) {
                    this.showReportDetails(user);
                }
            });
        },
        confirmLockContent(user) {
            this.$swal({
                title: `${user.user_nick} 회원을 잠금 하시겠습니까?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: '잠금',
                cancelButtonText: '취소',
                reverseButtons: true
            }).then(result => {
                if (result.value) {
                    this.userDele2(user.user_no);
                }
            });
        },
        async userDele2(userNo) {
            try {
                const response = await axios.post(`http://localhost:3000/admin/lock/${userNo}`);
                if (response.data.message === 'success') {
                    this.$swal({
                        position: 'top',
                        icon: 'success',
                        title: '회원잠금 성공',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                this.$nextTick(() => {
                    this.$router.push({ path: '/' });
                });
            } catch (err) {
                console.error('err');
                this.$swal({
                    icon: 'error',
                    title: '삭제 실패',
                    text: '계정 삭제에 실패했습니다.'
                });
            }
        },
        async info() {
            try {
                const response = await axios.get(`http://localhost:3000/admin/userinfo`);
                this.userList = response.data;
                this.loadImage();
                console.log(this.userList);
            } catch (error) {
                console.error(error);
            }
        },
        formatDate(date) {
            return date ? date.split('T')[0] : '';
        },
        movetoprveiouspage() {
            if (this.$route.query.page <= 1) {
                this.$swal('첫번째 페이지입니다');
            } else {
                let pp = parseInt(this.$route.query.page) - 1;
                window.location.href = window.location.pathname + '?page=' + pp;
            }
        },
        movetonextpage() {
            if (this.$route.query.page >= Math.ceil(this.cnt / 10)) {
                this.$swal('마지막 페이지입니다.');
            } else {
                let pp = parseInt(this.$route.query.page) + 1;
                window.location.href = window.location.pathname + '?page=' + pp;
            }
        },
        loadImage() {
            try {
                for (const users of this.userList) {
                    const userNo = users.user_no;
                    const profileData = localStorage.getItem(`profileImage_${userNo}`);
                    console.log(profileData);
                    if (profileData) {
                        const { imageName } = JSON.parse(profileData);
                        if (imageName && userNo) {
                            this.ImageSrcMap[userNo] = `http://localhost:3000/mypage/images/${imageName}`;
                        } else {
                            this.ImageSrcMap[userNo] = require(`/goodsempty.jpg`);
                        }
                    } else {
                        this.ImageSrcMap[userNo] = require(`/goodsempty.jpg`);
                    }
                }
            } catch (error) {
                console.error('이미지를 로드하는 도중 오류가 발생했습니다:', error);
            }
        },
        getImageSrc(userNo) {
            if (this.ImageSrcMap[userNo]) {
                return this.ImageSrcMap[userNo];
            } else {
                return require(`/goodsempty.jpg`);
            }
        },
        confirmDeleteContent(user) {
            this.$swal({
                title: `${user.user_nick} 회원을 삭제 하시겠습니까?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: '삭제',
                cancelButtonText: '취소',
                reverseButtons: true
            }).then(result => {
                if (result.value && user.user_login_ty === 0) {
                    console.log(result.value);
                    this.userDele(user.user_no);
                } else if (result.value && user.user_login_ty === 1) {
                    console.log(result.value);
                    this.deleteKakaoAccount(user.user_no);
                }
            });
        },
        async userDele(userNo) {
            try {
                const response = await axios.delete(`http://localhost:3000/admin/delete`, {
                    data: { user_no: userNo }
                });
                if (response.status === 200) {
                    this.$swal({
                        position: 'top',
                        icon: 'success',
                        title: '회원탈퇴 성공',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                this.info();
            } catch (err) {
                console.error('err');
                this.$swal({
                    icon: 'error',
                    title: '삭제 실패',
                    text: '계정 삭제에 실패했습니다.'
                });
            }
        },
        async deleteKakaoAccount(userNo) {
            try {
                const response = await axios.delete('http://localhost:3000/mypage/kakaoDelete', {
                    data: { user_no: userNo }
                });
                if (response.data.message === '성공적으로 삭제되었습니다.') {
                    return response.data;
                }
            } catch (err) {
                console.error(err);
                this.$swal({
                    icon: 'error',
                    title: '삭제 실패',
                    text: '계정 삭제에 실패했습니다.'
                });
            }
            const user_id = this.$store.state.user.user_id;
            const user_no = this.$store.state.user.user_no;
            axios({
                url: "http://localhost:3000/mypage/kakaoDelete",
                method: "DELETE",
                data: { user_id: user_id, user_no: user_no }
            }).then(res => {
                if (res.data.message === '성공적으로 삭제되었습니다.') {
                    this.$swal({
                        position: 'top',
                        icon: 'success',
                        title: '카카오 계정 삭제 완료!',
                        showConfirmButton: false,
                        timer: 1000
                    }).then(() => {
                        this.info();
                    });
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }
}
</script>

<style scoped>
@font-face {
    font-family: 'GmarketSansMedium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

div {
    font-family: 'GmarketSansMedium';
    text-align: center;
}

.userPage {
    position: relative;
    text-align: center;
}

table {
    margin-left: auto;
    position: relative;
    width: 100%;
}

.userinfo th {
    border-top: 1px solid #888;
    background-color: #fbdbb6;
}

.userinfo th, td {
    border-bottom: 1px solid #eee;
    padding: 5px 0;
    height: 100%;
    
}

td {
    text-align: center;
}

thead {
    background-color: #e2e1e0;
}

.page-btn {
    height: 26px;
    width: 6.5%;
    border: none;
    background-color: #fbdbb6;
    font-family: 'GmarketSansMedium';
    font-size: 14px;
    box-shadow: 0px 1px 10px 0.1px rgb(240, 240, 240);
}

button.page-btn:hover {
    cursor: pointer;
    background-color: #e6c9a7;
}

.page-count {
    padding: 0 20px 0 20px;
}

.btn-cover {
    position: relative;
    top: 20px;
}

.del_btn {
    height: 35px;
    width: 67px;
    border: none;
    background-color: #fbdbb6;
    font-family: 'GmarketSansMedium';
    font-size: 14px;
}
.del_btn2 {
    height: 35px;
    width: 100px;
    border: none;
    background-color: #fbdbb6;
    font-family: 'GmarketSansMedium';
    font-size: 14px;
}

button.del_btn:hover {
    cursor: pointer;
    background-color: #e6c8a6;
}

/* Modal Styling */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 80%;
    max-width: 500px;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h2 {
    margin: 0;
}

.modal-header .close-button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
}
label {
  display: block; /*라벨을 블록 요소로 설정하여 라벨과 텍스트영역이 수직으로 정렬되도록 함 */
   text-align: left; /*라벨 텍스트를 왼쪽으로 정렬 */
  /* margin-bottom: 5px; 라벨과 텍스트영역 간의 여백 조정 */
}
textarea{
    width: 100%;
    height: 100%;
}

</style>
