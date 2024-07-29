<template>
  <div><br><br>
    <h1 style="margin-left:44%; margin-top:-0.5%;">퀴즈 정보</h1>
    <br>
    <table>
       <colgroup>
        <col width="8%" />
        <col width="7%" />
        <col width="7%" />
        <col width="10%" />
        <col width="9%" />
        <col width="9%" />
        <col width="7%" />
        <col width="7%" />
        <col width="7%" />
        <col width="5%" />
        <col width="5%" />
        <col width="8%" />
        <col width="7%" />
        <col width="11%" />
      </colgroup>
      <thead>
        <tr>
          <th>푼 날짜</th>
          <th>유저 번호</th>
          <th>유저 이름</th>
          <th>퀴즈 제목</th>
          <th>힌트 1</th>
          <th>힌트 2</th>
          <th>메인사진</th>
          <th>퀴즈사진</th>
          <th>카테고리</th>
          <th>레벨</th>
          <th>조회수</th>
          <th>날짜</th>
          <th>정답</th>
          <th>내용</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="quiz in quizzes" :key="quiz.quiz_no">
          <td>{{ formatDate(quiz.uploads_at) }}</td>
          <td>{{ quiz.user_no }}</td>
          <td>{{ quiz.user_nick }}</td>
          <td>{{ quiz.quiz_tit }}</td>
          <td>{{ quiz.quiz_hint1 }}</td>
          <td>{{ quiz.quiz_hint2 }}</td>
          <td>
            <img v-if="!quiz.quiz_thimg" src="../assets/img_notReady.png" alt="이미지 준비 중" width="100%">
            <img v-else :src="require(`../../../node-back/uploads/${quiz.quiz_thimg}`)" alt="퀴즈 이미지" width="100%">
          </td>
          <td>
            <img v-if="!quiz.quiz_img" src="../assets/img_notReady.png" alt="이미지 준비 중" width="100%">
            <img v-else :src="require(`../../../node-back/uploads/${quiz.quiz_img}`)" alt="퀴즈 이미지" width="100%">
          </td>
          <td>{{ quiz.quiz_category }}</td>
          <td>{{ quiz.quiz_level }}</td>
          <td>{{ quiz.quiz_view }}</td>
          <td>{{ formatDate(quiz.quiz_day) }}</td>
          <td>{{ quiz.quiz_answer }}</td>
          <td>{{ quiz.quiz_content }}</td>
          <td><button class="del_btn" @click="confirmDeleteContent(item.quiz_no)">삭제</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      quizzes: []
    };
  },
  created() {
    axios.get('http://localhost:3000/admin/quizzes')
      .then(response => {
        this.quizzes = response.data;
      })
      .catch(error => {
        console.error('데이터 불러오기 오류:', error);
      });
  },
  methods:{
    
     confirmDeleteContent(quiz_no) {

            this.$swal({
                title: `${quiz_no}번 퀴즈를 삭제하시겠습니까?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: '삭제',
                cancelButtonText: '취소',
                reverseButtons: true
            }).then(result => {
                if (result.value) {
                    this.deleteContent(quiz_no);
                    this.$router.go(0);
                }
            });
        },
        deleteContent(quiz_no) {
            axios({
                url: "http://localhost:3000/admin/quizz_delete",
                method: "POST",
                data: {
                    quizno: quiz_no
                },
            }).then(res => {
                this.content = res.data;
                console.log(res.data)

            }).catch(err => {
                alert(err);
            });
        },
     formatDate(date) {
            return date ? date.split('T')[0] : '';
        }
  }
};
</script>

<style>

table {
  width: 140%;
  border-collapse: collapse;
  margin-left:-20%;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #fbdbb6;
  text-align: center;
}
.del_btn{
  height: 35px;
  width: 67px;
  border: none;
  background-color: #fbdbb6;
  font-family: 'GmarketSansMedium';
  font-size: 14px;
 
  
}
</style>
