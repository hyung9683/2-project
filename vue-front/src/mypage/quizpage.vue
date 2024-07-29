<template>
  <div class="quiz-container"><br><br><br>
    <!-- 퀴즈 목록 -->
    <div class="quiz-list">
       <h2>내가 만든 퀴즈</h2>
      <div class="quiz-cards">
        <div 
          class="quiz-card" 
          v-for="quiz in quizzes" 
          :key="quiz.quiz_no" 
          @click="handleCardClick(quiz.quiz_no)"
        >
          <img style="width:100%" :src="getImageUrl(quiz)" alt="섬네일 이미지" class="card-thumbnail">
          <h3 class="card-title">{{ quiz.quiz_tit }}</h3>
        </div>
      </div>
    </div>
     <!-- 퀴즈 푼 목록 -->
    <div class="solved-quiz-list">
      <h2>내가 푼 퀴즈</h2>
      <div class="quiz-cards">
        <div 
          class="quiz-card" 
          v-for="solvedQuiz in solvedQuizzes" 
          :key="solvedQuiz.quiz_no" 
          @click="handleCardClick2(solvedQuiz.quiz_no)"
        >
          <img style="width:100%" :src="getImageUrl(solvedQuiz)" alt="섬네일 이미지" class="card-thumbnail">
          <h3 class="card-title">{{ solvedQuiz.quiz_tit }}</h3>
        </div>
      </div>
    </div>
    
    <!-- 퀴즈 만들기 버튼 -->
    <li class="write" @click="showModal = true">퀴즈 만들기</li>

    <!-- 퀴즈 만들기 모달 -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <h2>퀴즈 만들기</h2>
        <form @submit.prevent="submitQuiz">
          <div class="form-group">
            <label for="title">제목:</label>
            <input v-model="newQuiz.title" id="title" type="text" required>
          </div>
          <div class="form-group">
            <label for="content">내용:</label>
            <textarea v-model="newQuiz.content" id="content" rows="6" required></textarea>
          </div>
          <div class="form-group">
            <label for="category">카테고리:</label>
            <div class="category-buttons">
              <button 
                type="button" 
                :class="{ 'selected': newQuiz.category === 1 }" 
                @click="setCategory(1)">수학
              </button>
              <button 
                type="button" 
                :class="{ 'selected': newQuiz.category === 2 }" 
                @click="setCategory(2)">영어
              </button>
              <button 
                type="button" 
                :class="{ 'selected': newQuiz.category === 3 }" 
                @click="setCategory(3)">한자
              </button>
              <button 
                type="button" 
                :class="{ 'selected': newQuiz.category === 4 }" 
                @click="setCategory(4)">국어
              </button>
            </div>
          </div>
          <div class="form-group">
            <label for="level">난이도:</label>
            <div class="level-buttons">
              <button 
                type="button" 
                :class="{ 'selected': newQuiz.level === 1 }" 
                @click="setLevel(1)">1단계
              </button>
              <button 
                type="button" 
                :class="{ 'selected': newQuiz.level === 2 }" 
                @click="setLevel(2)">2단계
              </button>
              <button 
                type="button" 
                :class="{ 'selected': newQuiz.level === 3 }" 
                @click="setLevel(3)">3단계
              </button>
            </div>
          </div>
          <div class="form-group">
            <label for="thumbnail">썸네일 이미지:</label>
            <div class="upload-box" @click="triggerFileInput">
              <div class="upload-content" v-if="thumbnailUrl">
                <img :src="thumbnailUrl" alt="썸네일 미리보기" class="thumbnail-preview">
              </div>
              <div class="upload-content" v-else>
                <span role="img" aria-label="plus-circle" class="icon">
                  <!-- SVG 코드 -->
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
                <span>썸네일 이미지를 추가해보세요.</span>
              </div>
              <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none;" accept="image/*">
            </div>
          </div>
          <button type="submit">제출</button>
        </form>
      </div>
    </div>
  </div>
</template>

  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        quizzes: [], // 퀴즈 데이터를 저장할 배열
        solvedQuizzes:[],
        showModal: false, // 모달 표시 여부
        newQuiz: {
          title: '',
          content: '',
          thumbnail: null,
          category: null, // 카테고리
          level: null // 난이도
        },
        thumbnailUrl: null, // 썸네일 이미지 URL
      };
    },
    computed: {
    user() {
        return this.$store.state.user; // 로그인 여부
    }
},
    mounted() {
      this.loadQuizzes();
      this.loadQuizzes2();
    },
    
    methods: {
      loadQuizzes() {
        // console.log(this.user.user_no)
      axios.get(`http://localhost:3000/quiz/mylist/${this.user.user_no}`) // 목록 조회 엔드포인트
        .then(response => {
          this.quizzes = response.data;
          
          // console.log('퀴즈 목록:', this.quizzes); // 데이터 확인
        })
        .catch(error => {
          console.error('퀴즈 로드 중 오류 발생:', error);
        });
    },
    loadQuizzes2() {
        console.log(this.user.user_no)
      axios.get(`http://localhost:3000/quiz/finish/${this.user.user_no}`) // 목록 조회 엔드포인트
        .then(response => {
          this.solvedQuizzes = response.data;
          
          console.log('퀴즈 목록2:', this.solvedQuizzes); // 데이터 확인
        })
        .catch(error => {
          console.error('퀴즈 로드 중 오류 발생:', error);
        });
    },
      handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
          this.newQuiz.thumbnail = file;
          this.thumbnailUrl = URL.createObjectURL(file); // 미리보기 URL 생성
        }
      },
      triggerFileInput() {
        this.$refs.fileInput.click();
      },
      setCategory(category) {
        this.newQuiz.category = category;
      },
      setLevel(level) {
        this.newQuiz.level = level;
      },
      handleCardClick(quizNo) {
        this.$router.push(`/write/${quizNo}`); // 클릭된 퀴즈 번호를 포함한 페이지로 이동
      },
      handleCardClick2(quizNo) {
        this.$router.push(`/write/${quizNo}`); // 클릭된 퀴즈 번호를 포함한 페이지로 이동
      },
      getImageUrl(quiz) {
    return `http://localhost:3000/uploads/${quiz.quiz_thimg}`;
  },
      submitQuiz() {
        const formData = new FormData();
        formData.append('user_no', this.user.user_no);
        formData.append('title', this.newQuiz.title);
        formData.append('content', this.newQuiz.content);
        formData.append('category', this.newQuiz.category); // 카테고리
        formData.append('level', this.newQuiz.level); // 난이도
        formData.append('thumbnail', this.newQuiz.thumbnail);
  
        axios.post('http://localhost:3000/quiz/quizzes', formData)
          .then(response => {
            const quizNo = response.data.quiz_no; // 반환된 퀴즈 번호
            if (quizNo) {
              this.$router.push(`/write/${quizNo}`); // 퀴즈 번호를 포함한 페이지로 이동
            }
            this.newQuiz = { title: '', content: '', thumbnail: null, category: null, level: null }; // 입력 필드 초기화
            this.thumbnailUrl = null; // 썸네일 미리보기 초기화
            this.showModal = false; // 모달 닫기
          })
          .catch(error => {
            console.error('퀴즈 제출 중 오류 발생:', error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .form-group {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input[type="text"], textarea {
    width: 100%; /* 입력 칸 너비를 100%로 설정 */
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
  }
  
  .upload-box {
    border: 2px dashed #ccc;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
  }
  
  .upload-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .upload-content .icon {
    font-size: 48px;
    color: #ccc;
  }
  
  .upload-content span {
    margin-top: 10px;
    font-size: 16px;
    color: #555;
  }
  
  .thumbnail-preview {
    max-width: 100%;
    max-height: 200px; /* 썸네일 미리보기 높이 조정 */
    border-radius: 8px;
    object-fit: cover;
  }
  .category-buttons,
  .level-buttons {
    display: flex;
    gap: 10px;
  }
  
  .category-buttons button,
  .level-buttons button {
    padding: 10px 20px;
    border: 1px solid #ddd;
    background-color: #f8f8f8;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .category-buttons button.selected,
  .level-buttons button.selected {
    background-color: #007bff;
    color: white;
  }
  
  .category-buttons button:hover:not(.selected),
  .level-buttons button:hover:not(.selected) {
    background-color: #e0e0e0;
  }
  
  .quiz-list {
    padding: 20px;
  }
  .write {
    margin-left:40%;
    width:20%;
    height:40px;
    margin-top:2%;
    cursor: pointer;
    margin-bottom: 20px;
    padding: 10px;
    background-color: #9dff9d;
    color: #fff;
    border-radius: 5px;
    text-align: center;
  }
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    width: 80%;
    max-width: 500px;
    position: relative;
  }
  
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
  
  .quiz-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center; /* 카드들을 수평으로 중앙 정렬 */
    align-items: center; /* 카드들을 수직으로 중앙 정렬 */
    gap: 20px;
    padding: 20px;
  }
  
  .quiz-card {
    width: 250px; /* 카드의 너비를 설정합니다. */
    height: 250px; /* 카드의 높이를 너비와 동일하게 설정하여 정사각형으로 만듭니다. */
    border: 1px solid #ddd;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1 / 1; /* 카드의 비율을 1:1로 설정하여 정사각형 유지 */
  }
  
  .card-thumbnail {
    width: 100%;
    height: 75%; /* 카드의 높이에 맞춰서 조정 */
    object-fit: cover;
  }
  
  .card-title {
    padding: 10px;
    font-size: 14px; /* 제목 크기를 조정합니다. */
    font-weight: bold;
    color: #333;
  }
  </style>