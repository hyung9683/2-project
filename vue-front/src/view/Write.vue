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
              <button type="submit">저장</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      currentImage: { url: '', answers: [], hint1: '', hint2: '' },
      images: [],
      errorMessage: '',
      showSettingsModal: false,
      settings: {
        title: '',
        content: '',
        category: null,
        level: null,
      },
    };
  },
  methods: {
    goToMain() {
      // 메인으로 이동
    },
    saveAndGoToMain() {
      // 저장 후 메인으로 이동
    },
    openSettingsModal() {
      this.showSettingsModal = true;
    },
    closeSettingsModal() {
      this.showSettingsModal = false;
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.images.push({
            id: Date.now(),
            url: e.target.result,
            answers: [],
            hint1: '',
            hint2: '',
          });
        };
        reader.readAsDataURL(file);
      }
    },
    openModal(index) {
      this.currentImage = { ...this.images[index] };
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    addAnswer() {
      this.currentImage.answers.push('');
    },
    removeAnswer(index) {
      this.currentImage.answers.splice(index, 1);
    },
    saveAnswers() {
      const imageIndex = this.images.findIndex(img => img.id === this.currentImage.id);
      if (imageIndex !== -1) {
        this.$set(this.images, imageIndex, this.currentImage);
        this.closeModal();
      }
    },
    removeImage(index) {
      this.images.splice(index, 1);
    },
    submitSettings() {
      // 설정 저장 처리
    },
    setCategory(category) {
      this.settings.category = category;
    },
    setLevel(level) {
      this.settings.level = level;
    },
  },
};
</script>

<style scoped>
.main-container {
  margin-top: 20px; /* 내비게이션 바가 없으므로 적절한 여백 */
  padding: 20px;
}

.back-button,
.save-button,
.settings-button {
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.back-button {
  background-color: #f8f9fa;
}

.save-button {
  background-color: #198754;
  color: white;
}

.settings-button {
  background-color: #0d6efd;
  color: white;
}

.upload-box {
  border: 2px dashed #007bff;
  padding: 20px;
  text-align: center;
  cursor: pointer;
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.images-container {
  display: flex;
  flex-wrap: wrap;
}

.image-item {
  position: relative;
  margin: 10px;
  width: 150px;
  height: 150px;
}

.delete-button {
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  cursor: pointer;
}

.warning-overlay {
  position: absolute;
  bottom: 5px;
  left: 5px;
  background-color: rgba(255, 0, 0, 0.7);
  color: white;
  padding: 5px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  max-width: 600px;
  width: 100%;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.modal-body {
  margin-top: 20px;
}

.add-answer-button,
.remove-answer-button {
  margin-top: 10px;
}

.hint-fields {
  margin-top: 20px;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.category-buttons button.selected,
.level-buttons button.selected {
  background-color: #007bff;
  color: white;
}
</style>