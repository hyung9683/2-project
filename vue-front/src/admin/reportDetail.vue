<template>
  <div class="modal" v-if="!loading">
    <div class="modal-content">
      <div class="modal-header">
        <h2>신고 상세 내용</h2>
        <button @click="goBack" class="close-button">&times;</button>
      </div>
      <div>
        <label>신고자: {{ localReport.user_nick }}</label><br>
        <label>신고날짜: {{ formatDate(localReport.report_day) }}</label>
      </div>
      <div>
        <label>신고유형</label>
        <div>
          <label>
            <input type="radio" value="비속어 사용" v-model="localReport.type" /> 비속어 사용
          </label>
          <label>
            <input type="radio" value="분란 조장" v-model="localReport.type" /> 분란 조장
          </label>
          <label>
            <input type="radio" value="스팸/광고" v-model="localReport.type" /> 스팸/광고
          </label>
          <label>
            <input type="radio" value="개인정보 노출" v-model="localReport.type" /> 개인정보 노출
          </label>
        </div>
      </div>
      <div>
        <label>신고 내용:</label>
        <textarea v-model="localReport.content"></textarea>
      </div>
      <div>
        <button @click="goBack">뒤로가기</button>
        <button @click="submitReport">제출</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      localReport: {
        user_nick: '',  
        report_day: '', 
        user_no:null,
        author: '',
        date: '',
        type: '',
        content: ''
      },
      loading: true
    };
  },
  props: {
    user_no: {
      type: Number,
      required: true
    }
  },
  created() {
    console.log('User No:', this.user_no); // 콘솔에 userNo 값 출력
    this.fetchReportDetails(this.user_no);
  },
  methods: {
     async fetchReportDetails(user_no) {
      try {
        const response = await axios.get(`http://localhost:3000/admin/report2/${user_no}`);
        this.localReport = {
          user_nick: response.data.user_nick,
          report_day: response.data.report_day, 
          type: response.data.type,
          content: response.data.content
        };
      } catch (error) {
        console.error('신고 상세 정보 로딩 실패:', error);
        this.$swal({
          icon: 'error',
          title: '로딩 실패',
          text: '신고 상세 정보를 불러오는 데 실패했습니다.'
        });
      } finally {
        this.loading = false;
      }
    },
    goBack() {
      this.$emit('back');
    },
     formatDate(date) {
            return date ? date.split('T')[0] : '';
        },
    // async submitReport() {
    //   try {
    //     const response = await axios.put(`http://localhost:3000/admin/report/${this.reportId}`, this.localReport);
    //     if (response.status === 200) {
    //       this.$swal({
    //         icon: 'success',
    //         title: '신고가 성공적으로 업데이트되었습니다.',
    //         showConfirmButton: false,
    //         timer: 1500
    //       });
    //       this.goBack();
    //     }
    //   } catch (error) {
    //     console.error('신고 업데이트 실패:', error);
    //     this.$swal({
    //       icon: 'error',
    //       title: '업데이트 실패',
    //       text: '신고를 업데이트하는 데 실패했습니다.'
    //     });
    //   }
    // }
  }
};
</script>

<style scoped>
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
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  font-size: 24px;
  cursor: pointer;
}
</style>
