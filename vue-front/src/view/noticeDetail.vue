<template>
  <div>
    <div class="content" v-for="notice in content" :key="notice.notice_no">
      <div class="notice_content">
        <label class="t2">작성자</label>&nbsp;&nbsp;
        <label class="writer" style="font-size: 17px; font-style: bold;">{{ content[0].user_nick }}</label>

        <div class="card"> 
           <div class="main-content">
           <div class="t3"></div>
           <p class="text2" :disabled="editable === false" style="font-size: 17px;">{{ content[0].notice_tit }}</p>
           <hr class="hr-style">
           <div class="t4"></div>
           <div v-if="editable">
                <textarea v-model="content[0].notice_content" class="textarea-editable" ref="`textarea_${index}`" @input="adjustHeight" style="font-size: 17px;"></textarea>
             </div>
             <div v-else>
             <p class="text1" :disabled="editable === false" style="font-size: 17px;">{{ content[0].notice_content }}</p>
             </div></div>
           <!-- 이미지 칸 -->
           <div class="main-image text-center"> <!-- 가운데 정렬 추가 -->
               <!-- 예시 이미지 제거 -->
               <img
               v-if="notice.notice_img"
              :src="require(`../../../node-back/uploads/uploadnotice/${notice.notice_img}`)"
               alt="게시된 이미지"
               width="20%"
               />
                <!-- 이미지가 없는 경우 빈 상태로 유지 -->
              <img
               v-else
               style="display: none;"
               src="../assets/img_notReady.png"
               alt="미리보기 이미지 없음"
               width="20%"
               />
              </div>
          </div>
            
          

           <div class="btn-area">
           <div v-if="this.user.user_no == this.content[0].user_no" class="right_btn">
            <button type="button" class="btn" @click="editContent()" v-if="editable === false">수정</button>
            <button type="button" class="btn" @click="confirmEditContent()" v-else>수정완료</button>
            <button type="button" class="btn" @click="confirmDeleteContent(notice.notice_no)">삭제</button>
          </div> 
      </div>

      <!-- 댓글 목록 -->
      <div v-for="comment in comments" :key="comment.comment_id">
        <div class="box1">
        <p class="commentA">{{ comment.user_nick }} : {{ comment.comment_content }}</p>
        <button @click="showReplyForm(comment.comment_id, $event)" class="recommentbtn">댓글</button>
      </div>
        <div v-if="comment.replies && comment.replies.length">
          <div v-for="reply in comment.replies" :key="reply.comment_id" style="margin-left: 20px;">
            <div class="box2">
            <p class="commentB">{{ reply.user_nick }} : {{ reply.comment_content }}</p>
            </div>
          </div>
        </div>
        <div v-if="replyFormVisible === comment.comment_id">
          <textarea v-model="replyContent" class="text3" placeholder="댓글을 작성해주세요"></textarea>
          <button @click="submitReply(comment.comment_id)" class="commentwriteA">댓글 작성</button>
        </div>
      </div>

      <!-- 댓글 작성 폼 -->
      <div @submit.prevent="commentwrite">
        <textarea v-model="newcomment" class="text6" placeholder="댓글을 작성해주세요"></textarea>
        <button type="button" class="commentwrite" @click="commentwrite">댓글 작성</button>
      </div>


      <div class="btn_area">
        <button type="button" class="main_btn" @click="noticeMain">목록으로</button>
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
    comments: [],
    content: [],
    notice_no: this.$route.query.notice_no,
    editable: false,
    newcomment: '',
    replyFormVisible: null,
    replyContent: ''
  }
},
computed: {
  user() {
    return this.$store.state.user;
  },
},
mounted() {
  this.loadContent();
  this.loadComments();
  this.$nextTick(() => {
      if(this.$refs.textarea) {
        this.adjustHeight();
      }
    })
},
methods: {
  adjustHeight() {
    this.$nextTick(() => {
      const textarea = this.$refs.textarea;
      if (textarea) {
        textarea.style.height = 'auto'; // 현재 높이 리셋
        textarea.style.height = `${textarea.scrollHeight}px`; // 내용에 따라 높이 조정
      } else {
        console.error('error')
      }
    });
  },
  confirmDeleteContent(notice_no) {
    if (this.user.user_no != this.content[0].user_no) {
      this.$swal("본인이 작성한 글만 삭제 가능합니다.")
    } else {
      this.$swal({
        title: `${notice_no}번 게시글을 삭제하시겠습니까?`,
        icon: 'notice',
        showCancelButton: true,
        confirmButtonText: '삭제',
        cancelButtonText: '취소',
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          this.deleteContent(notice_no);
          this.$swal({
            position: 'top',
            icon: 'success',
            title: '삭제되었습니다',
            showConfirmButton: false,
            timer: 1500
          });
          this.$router.push({ path: "/notice?page=1" }); 
        }
      });
    }
  },
  deleteContent(notice_no) {
    axios({
      url: "http://localhost:3000/notice/delete",
      method: "POST",
      data: {
        noticeno: notice_no
      },
    }).then(res => {
      this.content = res.data;
      this.$router.push({ path: "/notice?page=1" });
    }).catch(err => {
      alert(err);
    });
  },
  editContent() {
    if (this.user.user_no != this.content[0].user_no) {
      this.$swal("본인이 작성한 글만 수정 가능합니다.")
    } else {
      this.editable = true;
    }
  },
  navigateTonoticeMain() {
    this.$router.push('/notice?page=1');
  },
  confirmEditContent() {
    axios.post("http://localhost:3000/notice/edit", {
      content: this.content[0].notice_content,
      tit: this.content[0].notice_tit,
      no: this.content[0].notice_no
    })
    .then(() => {
      this.$swal("수정완료");
      this.editable = false;
    })
    .catch(error => {
      console.log(error);
    });
  },
  noticeMain() {
    this.$router.push('/notice?page=1');
  },
  loadContent() {
    axios.post("http://localhost:3000/notice/noticecontent", {
      notice_no: this.notice_no
    }).then(res => {
      this.content = res.data;
    }).catch(err => {
      alert(err);
    });
  },
  commentwrite() {
    axios.post('http://localhost:3000/notice/comment_write', {
      notice_no: this.notice_no,
      user_no: this.$store.state.user.user_no,
      comment_content: this.newcomment,
      parent_comment_id: null
    })
    .then(() => {
      this.newcomment = '';
      this.loadComments();
    })
    .catch(error => {
      console.log(error);
      alert('댓글 작성 중 오류가 발생했습니다.');
    });
  },
  showReplyForm(comment_id, event) {
    event.preventDefault();
    this.replyFormVisible = comment_id;
    this.replyContent = '';
  },
  submitReply(parent_comment_id) {
    axios.post('http://localhost:3000/notice/comment_write', {
      notice_no: this.notice_no,
      user_no: this.$store.state.user.user_no,
      comment_content: this.replyContent,
      parent_comment_id: parent_comment_id
    })
    .then(() => {
      this.replyFormVisible = null;
      this.replyContent = '';
      this.loadComments();
    })
    .catch(error => {
      console.error(error);
      alert('대댓글 작성 중 오류가 발생했습니다.');
    });
  },
  loadComments() {
    axios.post("http://localhost:3000/notice/comment_list", {
      notice_no: this.notice_no
    }).then(response => {
      const comments = response.data;
      const groupedComments = comments.reduce((acc, comment) => {
        if (comment.parent_comment_id === null) {
          acc.push({ ...comment, replies: [] });
        } else {
          const parentComment = acc.find(c => c.comment_id === comment.parent_comment_id);
          if (parentComment) {
            parentComment.replies.push(comment);
          }
        }
        return acc;
      }, []);
      this.comments = groupedComments;
    }).catch(error => {
      console.log(error);
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

* {
	margin: 0;
	padding: 0;
}

.text1, .text2  {
  font-family: 'GmarketSansMedium';
  font-size: 17px;
  overflow: hidden; /* 스크롤바 없이 내용이 넘치면 높이 자동 조정 */
  word-wrap: break-word; /* 긴 단어가 줄바꿈되도록 */
  box-sizing: border-box; /* 패딩과 테두리 포함하여 크기 조정 */
}

/* 작성자, 제목, 내용, 삽입 이미지 칸 */
.board-content{ 
  resize: none;
}

/* 작성자 */
.t2 {
	margin: 20px 0px 5px 0px;
	font-size: 17px;
	font-weight: bold;
}

/*제목*/
.text2 {
	resize: none;
	height: 30px;
	font-family: 'GmarketSansMedium';
}

/* 이미지 칸 */
.main-image {
  display: flex;
  justify-content: center; /* 이미지 중앙 정렬 */
  margin-top: 20px; /* 제목과 이미지 사이 여백 */
}

/* 이미지 크기 조정 */
.main-image img {
  max-width: 100%; /* 이미지의 최대 너비를 부모 요소에 맞춤 */
  height: auto; /* 이미지 비율 유지 */
}

/* 메인 내용 */
.main-content {
  display: flex;
  flex-direction: column; /* 내용이 수직 방향으로 배치되도록 설정 */
  box-sizing: border-box; /* 패딩과 테두리 포함하여 크기 조정 */
}

/* 가로 줄 */
.hr-style {
  border: none; /* 기본 테두리 제거 */
  border-top: 1px solid black; /* 가로 줄 추가 */
  margin: 20px 0; /* 위아래 여백 */
}


/* 내용 */
.text1 {

display: block;
resize: none;
font-family: 'GmarketSansMedium';
height: auto;
width: none;
min-height: 100px;

}

.textarea-editable {
  width: 100%; /* 전체 너비 사용 */
  min-height: 100px; /* 최소 높이 설정 */
  height: auto; /* 내용에 따라 높이 자동 조정 */
  resize: none; /* 사용자가 크기 조절 불가 */
  box-sizing: border-box; /* 패딩과 테두리 포함하여 크기 조정 */
  font-family: 'GmarketSansMedium';
  font-size: 17px; /* font-size 설정 */
}



/* 작성자 닉네임 가져온거 */
.writer{
  margin: 20px 0px 5px 0px;
  font-size: 16px;
  font-weight: lighter;
}

/* 글 전체 내용(제목, 내용, 삽입 이미지) 박스 */
.card{
  display: flex;
  flex-direction: column; /* 수직 방향으로 배치 */
  border: 2px solid #ccc;
  padding: 20px;
  margin: 10px 0;
  border-radius: 5px;
  background-color: #f9f9f9;
}


div {
	font-family: 'GmarketSansMedium';
}

.content {
	margin: auto;
	padding: 30px;
	max-width: 900px;
}


.content textarea {
	width: 100%;
}


.main_btn {
	font-size: 16px;
	width: 80px;
	height: 40px;
	background-color: #C1A3FF;
	border: black;
	border-radius: 4px;
	cursor: pointer;
	font-family: 'GmarketSansMedium';
	vertical-align: middle;
  color: black;
}

.right_btn {
	margin-left: auto;
	height: 60px;
	margin: 1px;
}

.btn {
	font-size: 13.5px;
	width: 70px;
	height: 30px;
	margin-left: auto;
	background-color: #C1A3FF;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-family: 'GmarketSansMedium';
	margin: 3px;
  color: black;
}

.btn:hover {
	background-color: #C1A3FF;
}


.t4{
	margin: 20px 0px 5px 0px;
	font-size: 13px;
	font-weight: bold;
}

.text3:focus {
	outline: none;
}

.btn_area {
	align-items: center;
	display: flex;
	vertical-align: middle;
	height: 100px;
	margin: auto;
	padding: auto;
	justify-content: flex-start;
}


.ans {
  margin-bottom: 20px;
}

.comment-box {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}

.text4 {
  margin: auto;
  font-family: 'GmarketSansMedium';
}

.text3 {
	resize: none;
	height: 50px;
	margin-bottom: 10px;
	font-family: 'GmarketSansMedium';
}

.text6 {
	resize: none;
	height: 100px;
	margin-bottom: 10px;
	font-family: 'GmarketSansMedium';
  border: 1px solid #000;

}

/* 댓글작성 버튼 */
.commentwrite {
  resize: none;
  display: block;
  margin-top: 0px;
  height: 35px;
  width: 80px;
  border: none;
  border-radius: 4px;
  background-color: #C1A3FF;
  font-family: 'GmarketSansMedium';
  font-size: 16px;
  cursor: pointer;
  color: black;
}

.writeans:hover {
  background-color: #C1A3FF;
}

.commentA{
  font-size: 15px;
  margin-top: 0px;
  display: block;
  resize: none;
  color: black;
  
}

.commentB{
  font-size: 14px;
  margin-top: 0;
  display: block;
  resize: none;
  color: black;
}

.box1{
  padding: 1px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
  font-family: 'GmarketSansMedium';
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.recommentbtn{
  resize: none;
  display: block;
  height: 20px;
  width: 40px;
  border: 1px solid gray;
  border-radius: 4px;
  background-color: #C1A3FF;
  font-family: 'GmarketSansMedium';
  font-size: 13px;
  cursor: pointer;
  color: black;
}

.box2{
  padding: 1px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
  font-family: 'GmarketSansMedium';
  margin-bottom: 5px;
}

.commentwriteA{
  resize: none;
  display: block;
  margin-top: -15px;
  margin-bottom: 5px;
  height: 20px;
  width: 65px;
  border: none;
  border-radius: 4px;
  background-color: #C1A3FF;
  font-family: 'GmarketSansMedium';
  font-size: 14px;
  cursor: pointer;
  color: black;
}

</style>