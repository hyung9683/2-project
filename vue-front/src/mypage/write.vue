<template>
  <div class="main-container">
    <!-- 뒤로가기 버튼 -->
    <button class="back-button" @click="goToMain">
      취소
    </button>

    <!-- 저장 버튼 추가 -->
    <button class="save-button" @click="saveAndGoToMain">
      저장
    </button>

    <!-- 설정 버튼 추가 -->
    <button class="settings-button" @click="openSettingsModal">
      설정
    </button>

    <div class="container">
      <!-- 업로드할 수 있는 칸 -->
      <div class="upload-box" @click="triggerFileInput">
        <div class="upload-content">
          <span role="img" aria-label="plus-circle" class="icon">
            <!-- SVG 코드 -->
          </span>
          <span>문제를 추가해보세요.</span>
        </div>
        <input type="file" ref="fileInput" @change="handleFileChange" style="display: none;">
      </div>

      <div class="images-container">
        <div v-for="(image, index) in images" :key="image.id" class="image-item" @click="openModal(index)">
          <img v-if="image.url" :src="image.url" :alt="'Uploaded Image ' + (index + 1)">
          <button class="delete-button" @click.stop="removeImage(index)">
            <span role="img" aria-label="delete" class="icon">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm5-9h2v6h-2V10zM7 6V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v1h5v2H2V6h5z"/>
              </svg>
            </span>
          </button>
          <div v-if="!image.answers.length" class="warning-overlay">정답을 입력하세요</div>
        </div>
      </div>

      <!-- 이미지 설정 모달 -->
      <div class="modal" v-if="showModal">
        <div class="modal-content">
          <span class="close" @click="closeModal">&times;</span>
          <img :src="currentImage.url" :alt="'Current Image'" class="modal-image">
          <div class="modal-body">
            <div v-for="(answer, i) in currentImage.answers" :key="i" class="answer-item">
              <input v-model="currentImage.answers[i]" type="text" placeholder="정답을 입력하세요">
              <button @click="removeAnswer(i)" class="remove-answer-button">삭제</button>
            </div>
            <button @click="addAnswer" class="add-answer-button">정답 추가</button>

            <!-- 힌트 입력 필드 추가 -->
            <div class="hint-fields">
              <input v-model="currentImage.hint1" type="text" placeholder="힌트 1 입력">
              <input v-model="currentImage.hint2" type="text" placeholder="힌트 2 입력">
            </div>
          </div>
          <button @click="saveAnswers">저장</button>
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </div>
      </div>

      <!-- 설정 모달 -->
<div v-if="showSettingsModal" class="modal">
  <div class="modal-content">
    <span class="close" @click="closeSettingsModal">&times;</span>
    <h2>퀴즈 만들기</h2>
    <form @submit.prevent="submitSettings">
      <div class="form-group">
        <label for="title">제목:</label>
        <input v-model="settings.title" id="title" type="text" required>
      </div>
      <div class="form-group">
        <label for="content">내용:</label>
        <textarea v-model="settings.content" id="content" rows="6" required></textarea>
      </div>
      <div class="form-group">
        <label for="category">카테고리:</label>
        <div class="category-buttons">
          <button
            type="button"
            :class="{ 'selected': settings.category === 1 }"
            @click="setCategory(1)">수학
          </button>
          <button
            type="button"
            :class="{ 'selected': settings.category === 2 }"
            @click="setCategory(2)">영어
          </button>
          <button
            type="button"
            :class="{ 'selected': settings.category === 3 }"
            @click="setCategory(3)">한자
          </button>
          <button
            type="button"
            :class="{ 'selected': settings.category === 4 }"
            @click="setCategory(4)">국어
          </button>
        </div>
      </div>
      <div class="form-group">
        <label for="level">난이도:</label>
        <div class="level-buttons">
          <button
            type="button"
            :class="{ 'selected': settings.level === 1 }"
            @click="setLevel(1)">1단계
          </button>
          <button
            type="button"
            :class="{ 'selected': settings.level === 2 }"
            @click="setLevel(2)">2단계
          </button>
          <button
            type="button"
            :class="{ 'selected': settings.level === 3 }"
            @click="setLevel(3)">3단계
          </button>
        </div>
      </div>
      <div class="form-group">
        <label for="thumbnail">썸네일 이미지:</label>
        <div class="upload-box" @click="triggerThumbnailInput">
          <div class="upload-content" v-if="settings.thumbnailUrl">
            <img :src="settings.thumbnailUrl" alt="썸네일 미리보기" class="thumbnail-preview">
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
          <input type="file" ref="thumbnailInput" @change="handleThumbnailUpload" style="display: none;" accept="image/*">
        </div>
      </div>
      <button type="submit">제출</button>
    </form>
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
      images: [],
      showModal: false,
      showSettingsModal: false,
      currentIndex: null,
      errorMessage: '',
      quizNo: this.$route.params.quizNo, // URL에서 퀴즈 번호 가져오기
      settings: {
        title: '',
        content: '',
        thumbnail: null,
        thumbnailUrl: null,
        category: null, // 카테고리
        level: null // 난이도
      },
    };
  },
  mounted() {
    this.loadImages();
    this.loadQuizSettings();
  },
  methods: {
    goToMain() {
      this.$router.push('/'); // 메인 페이지로 이동
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    triggerThumbnailInput() {
      this.$refs.thumbnailInput.click();
    },
    handleFileChange(event) {
      const files = event.target.files;
      const formData = new FormData();
      const answers = this.images.map(img => img.answers.join(',')); // 각 이미지의 정답을 쉼표로 구분된 문자열로 변환

      if (!this.quizNo) {
        console.error('퀴즈 번호가 없습니다.');
        return;
      }

      for (let i = 0; i < files.length; i++) {
        formData.append('upload', files[i]);
      }

      formData.append('quiz_no', this.quizNo); // 퀴즈 번호 포함
      formData.append('answers', JSON.stringify(answers)); // 정답 배열을 JSON 문자열로 변환하여 전송

      axios.post('http://localhost:3000/quiz/upload', formData)
        .then(response => {
          if (response.data.paths && Array.isArray(response.data.paths)) {
            this.loadImages(); // 이미지와 정답을 새로 고침
          } else {
            console.error('예상하지 못한 응답 형식:', response.data);
          }
        })
        .catch(error => {
          console.error('파일 업로드 중 오류 발생:', error.response ? error.response.data : error.message);
        });

      this.$refs.fileInput.value = null;
    },
    handleThumbnailUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.settings.thumbnail = file;
        this.settings.thumbnailUrl = URL.createObjectURL(file); // 미리보기 URL 생성
      }
    },
    removeImage(index) {
      const imageToRemove = this.images[index];
      axios.delete(`http://localhost:3000/quiz/image/${imageToRemove.id}`)
        .then(() => {
          this.images.splice(index, 1);
        })
        .catch(error => {
          console.error('이미지 삭제 중 오류 발생:', error.response ? error.response.data : error.message);
        });
    },
    openModal(index) {
      if (this.images[index]) {
        this.currentIndex = index;
        this.showModal = true;
      }
    },
    closeModal() {
      this.showModal = false;
      this.currentIndex = null;
      this.errorMessage = '';
    },
    openSettingsModal() {
      this.showSettingsModal = true;
    },
    closeSettingsModal() {
      this.showSettingsModal = false;
    },
    setCategory(category) {
    this.settings.category = category; // 수정
  },
  setLevel(level) {
    this.settings.level = level; // 수정
  },
    addAnswer() {
      if (this.currentImage && Array.isArray(this.currentImage.answers)) {
        this.currentImage.answers.push('');
      }
    },
    removeAnswer(index) {
      if (this.currentImage && Array.isArray(this.currentImage.answers)) {
        this.currentImage.answers.splice(index, 1);
      }
    },
    saveAnswers() {
      if (!this.currentImage || !Array.isArray(this.currentImage.answers) || !this.currentImage.answers.length || this.currentImage.answers.some(answer => !answer.trim())) {
        this.errorMessage = '정답을 입력하세요.';
        return;
      }
      this.errorMessage = '';

      const answers = this.currentImage.answers.join(','); // 쉼표로 구분된 문자열
      const imageId = this.currentImage.id; // 현재 이미지 ID
      const hint1 = this.currentImage.hint1 || '';
      const hint2 = this.currentImage.hint2 || '';

      axios.put('http://localhost:3000/quiz/update-answers', { imageId, answers, hint1, hint2 })
        .then(response => {
          if (response.data.success) {
            this.loadImages(); // 이미지와 정답을 새로 고침
            this.closeModal(); // 모달을 닫기
          } else {
            console.error('정답 저장 실패:', response.data);
          }
        })
        .catch(error => {
          console.error('정답 저장 중 오류 발생:', error.response ? error.response.data : error.message);
        });
    },
    saveAndGoToMain() {
      this.saveAnswers();
      this.goToMain();
    },
    loadImages() {
      if (!this.quizNo) return;

      axios.get('http://localhost:3000/quiz/images', { params: { quiz_no: this.quizNo } })
        .then(response => {
          if (Array.isArray(response.data)) {
            this.images = response.data.map(image => ({
              id: image.id,
              url: `http://localhost:3000/uploads/${image.image_path}`,
              answers: image.answers ? image.answers.split(',') : [], // 쉼표로 구분된 문자열을 배열로 변환
              hint1: image.hint1 || '', // 힌트1 초기화
              hint2: image.hint2 || ''  // 힌트2 초기화
            }));
          } else {
            console.error('예상하지 못한 응답 형식:', response.data);
          }
        })
        .catch(error => {
          console.error('이미지 로드 중 오류 발생:', error.response ? error.response.data : error.message);
        });
    },
    loadQuizSettings() {
      if (!this.quizNo) return;

      axios.get(`http://localhost:3000/quiz/settings/${this.quizNo}`)
        .then(response => {
          const { title, content, category, level, quiz_thimg } = response.data;
          this.settings.title = title || '';
          this.settings.content = content || '';
          this.settings.category = category || null;
          this.settings.level = level || null;
          this.settings.thumbnailUrl = quiz_thimg ? `http://localhost:3000/uploads/${quiz_thimg}` : null;
        })
        .catch(error => {
          console.error('퀴즈 설정 로드 중 오류 발생:', error.response ? error.response.data : error.message);
        });
    },
    submitSettings() {
      const formData = new FormData();
      formData.append('title', this.settings.title);
      formData.append('content', this.settings.content);
      formData.append('category', this.settings.category);
      formData.append('level', this.settings.level);
      if (this.settings.thumbnail) {
        formData.append('thumbnail', this.settings.thumbnail);
      }

      axios.put(`http://localhost:3000/quiz/settings/${this.quizNo}`, formData)
        .then(response => {
          if (response.data.success) {
            this.closeSettingsModal();
          } else {
            console.error('설정 저장 실패:', response.data);
          }
        })
        .catch(error => {
          console.error('설정 저장 중 오류 발생:', error.response ? error.response.data : error.message);
        });
    }
  },
  computed: {
    currentImage() {
      return this.images[this.currentIndex] || {}; // 빈 객체 반환
    }
  }
};
  </script>
  
  <style scoped>
  .main-container {
    position: relative;
    padding-top: 0; /* 상단 여백 제거 */
  }
  
  .back-button {
    position: absolute;
    top: 16px;
    right: 100px;
    background-color: #28a745;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    color: #fff;
  }
  
  .back-button .icon {
    font-size: 1em;
    vertical-align: middle;
  }
  
  .save-button {
    position: absolute;
    top: 16px;
    right: 16px;
    background-color: #28a745;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
  }
  
  .container {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 60px; /* Adjust this if needed to fit the buttons correctly */
  }
  
  .upload-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 240px;
    height: 240px;
    border: 2px dashed #007bff;
    border-radius: 8px;
    position: relative;
    cursor: pointer;
  }
  
  .upload-content {
    text-align: center;
    color: #007bff;
  }
  
  .images-container {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    width: calc(100% - 260px);
  }
  
  .image-item {
    width: 240px;
    height: 240px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }
  
  .image-item img {
    max-width: 100%;
    max-height: 100%;
  }
  
  .delete-button {
    position: absolute;
    top: 5px;
    right: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }
  
  .delete-button .icon {
    font-size: 1.5em;
    color: red;
  }
  
  .warning-overlay {
    position: absolute;
    bottom: 5px;
    left: 5px;
    background: rgba(255, 0, 0, 0.7);
    color: white;
    padding: 5px;
    border-radius: 4px;
    font-size: 0.9em;
  }
  
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
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    max-width: 90%;
    position: relative;
  }
  
  .modal-image {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
  }
  
  .modal-body {
    margin-bottom: 20px;
  }
  
  .answer-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .answer-item input {
    flex: 1;
    margin-right: 10px;
  }
  
  .add-answer-button, .remove-answer-button {
    margin-top: 10px;
  }
  
  .add-answer-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .remove-answer-button {
    background-color: #dc3545;
    color: #fff;
    border: none;
    padding: 5px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.5em;
    cursor: pointer;
  }
  
  .modal .hint-fields {
    margin-top: 10px;
  }
  
  .modal .hint-fields input {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
    font-size: 16px;
  }
  
  .modal .error-message {
    color: red;
    font-size: 14px;
    margin-top: 10px;
  }
  .main-container {
  padding: 20px;
}
.back-button, .save-button, .settings-button {
  margin: 10px;
}
.upload-box {
  border: 1px dashed #ccc;
  padding: 20px;
  text-align: center;
  cursor: pointer;
}
.images-container {
  display: flex;
  flex-wrap: wrap;
}
.image-item {
  position: relative;
  margin: 10px;
}
.delete-button {
  position: absolute;
  top: 10px;
  right: 10px;
}
.warning-overlay {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: rgba(255, 0, 0, 0.5);
  color: white;
  padding: 5px;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background-color: white;
  padding: 20px;
  position: relative;
}
.modal-image {
  max-width: 100%;
  height: auto;
}
.answer-item {
  display: flex;
  align-items: center;
}
.remove-answer-button {
  margin-left: 10px;
}
.hint-fields {
  margin-top: 10px;
}
.error-message {
  color: red;
}
.form-group {
  margin-bottom: 15px;
}
.thumbnail-preview {
  max-width: 100px;
  max-height: 100px;
}
.quiz-list {
  list-style-type: none;
  padding: 0;
}

.quiz-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  text-align: center;
}

.quiz-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.quiz-title {
  font-size: 1.5em;
  margin: 12px 0;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 500px; /* 너비를 넓힙니다 */
  max-height: 90vh; /* 높이를 제한합니다 */
  overflow-y: auto; /* 내용이 넘치면 스크롤바를 표시합니다 */
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}

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
  </style>