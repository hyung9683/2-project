<template>
  <div>
    <h1 class="tit">공지사항 게시판</h1>

    <table class="tbList">
      <colgroup>
        <col width="15%" />
        <col width="*" />
        <col width="20%" />
        <col width="20%" />
        <col width="10%" />
      </colgroup>
      <thead>
        <tr>
          <th>no</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
          <th>조회수</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="notice in contentlist" :key="notice.notice_no"
            @click="handlenoticeClick(notice.notice_no)">
          <td>{{ notice.notice_no }}</td>
          <td>{{ notice.notice_tit }}</td>
          <td>{{ notice.user_nick }}</td>
          <td>{{ notice.notice_day.split('T')[0] }}</td>
          <td>{{ notice.notice_view }}</td>
        </tr>
      </tbody>
    </table>

    <div class="btn-cover">
      <button @click="movetopreviouspage" class="page-btn">이전</button>
      <span class="page-count">{{ currentPage }}/{{ totalPage }} 페이지</span>
      <button @click="movetonextpage" class="page-btn">다음</button>
    </div>

    
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      contentlist: [], // 현재 페이지에 표시할 게시글 리스트
      cnt: 0, // 전체 게시글 수
      pageSize: 10, // 페이지당 게시글 수
      currentPage: parseInt(this.$route.query.page) || 1, // 현재 페이지 번호
      searchnotice: '', // 검색어
    };
  },
  computed: {
    user() {
      return this.$store.state.user; // 로그인 상태 확인
    },
    totalPage() {
      if (this.cnt === 0) {
        return 1; // 게시글이 없을 경우 1 페이지로 표시
      } else {
        return Math.ceil(this.cnt / this.pageSize); // 전체 페이지 수 계산
      }
    },
  },
  mounted() {
    this.fetchContent(); // 컴포넌트가 마운트되면 게시글 가져오기
    this.fetchContentCount(); // 전체 게시글 수 가져오기
  },
  methods: {
    // 게시글 가져오기
    fetchContent() {
      axios
        .post("http://localhost:3000/notice/notice", {
          page: this.currentPage,
          pageSize: this.pageSize,
        })
        .then((res) => {
          this.contentlist = res.data;
        })
        .catch((err) => {
          alert("게시글을 가져오는 중 오류가 발생했습니다.");
          console.error(err);
        });
    },
    // 전체 게시글 수 가져오기
    fetchContentCount() {
      axios
        .post("http://localhost:3000/notice/noticecnt")
        .then((res) => {
          this.cnt = res.data;
        })
        .catch((err) => {
          alert("게시글 수를 가져오는 중 오류가 발생했습니다.");
          console.error(err);
        });
    },
    // 게시글 상세 페이지로 이동
  handlenoticeClick(notice_no) {
    // 게시글 조회수 증가 요청
    axios.post("http://localhost:3000/notice/incrementnoticeView", { notice_no })
      .then(() => {
        // 조회수 증가 후 상세 페이지로 이동
        this.$router.push({
          path: `/notice/noticeDetail`,
          query: { notice_no },
        });
      })
      .catch((err) => {
        console.error("게시글 조회수 증가 중 오류:", err);
      });
  },
    // 이전 페이지로 이동
    movetopreviouspage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updatePage();
      } else {
        this.$swal("첫 번째 페이지입니다!");
      }
    },
    // 다음 페이지로 이동
    movetonextpage() {
      if (this.currentPage < this.totalPage) {
        this.currentPage++;
        this.updatePage();
      } else {
        this.$swal("마지막 페이지입니다!");
      }
    },
    // 페이지 업데이트
    updatePage() {
      this.$router.push({ path: this.$route.path, query: { page: this.currentPage } });
      this.fetchContent(); // 페이지 업데이트 시 게시글 다시 가져오기
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: 'GmarketSansMedium';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

p {
  height: 10px;
}

div {
  font-family: 'GmarketSansMedium';
  text-align: center;
}

table {
  margin: auto;
  width: 80%;
  border-collapse: collapse; /* 박스 형태로 칸을 구분 */
}

.tbList th,
.tbList td {
  border: 1px solid #ddd;
  padding: 8px;
}

.tbList th {
  background-color: #f2f2f2;
  text-align: center;
}

.tbList td {
  text-align: center;
}

thead {
  background-color: #43D174;
}

.btn {
  display: block;
  height: 70px;
  position: relative;
  top: 10px;
  left: 85.5%;
  width: 50px;
}

.btn-cover {
  margin-bottom: 50px;
  position: relative;
}

.page-count {
  padding: 0 20px 0 20px;
  /* 위 오 아래 왼 간격 조절 */
}

.write_btn {
  height: 35px;
  width: 80px;
  border: none;
  border-radius: 4px;
  background-color: #C1A3FF;
  font-family: 'GmarketSansMedium';
  font-size: 16px;
  box-shadow: 0px 1px 9px 1px rgb(221, 221, 221);
}

button.write_btn:hover {
  cursor: pointer;
  background-color: #C1A3FF;
}

.page-btn {
      height: 26px;
      width: 7%;
      border: none;
      margin-top:5%;
      background-color: #C1A3FF;
      font-family: 'GmarketSansMedium';
      font-size: 14px;
      box-shadow: 0px 1px 10px 0.1px rgb(240, 240, 240);
    }

button.page-btn:hover {
  height: 25px;
  width: 60px;
  cursor: pointer;
  background-color: transparent;
}

.btn-search {
  height: 25px;
  width: 67px;
  border: none;
  border-radius: 4px;
  background-color: #C1A3FF;
  font-family: 'GmarketSansMedium';
  font-size: 14px;
  box-shadow: 0px 1px 9px 1px rgb(221, 221, 221);
}

.form-control{
  width: 20%;
  border: var(--bs-border-width) solid var(--bs-border-color);
  display: inline-block;
  padding: 0 20px;
  text-align: center;
}

button.btn-search:hover {
  cursor: pointer;
  background-color: #C1A3FF;
}

.tbList tbody {
  display: table-row-group; /* 테이블 행 그룹으로 설정 */
}

.tbList tbody tr {
  display: table-row; /* 테이블 행으로 설정 */
}

.tbList tbody td {
  border: 1px solid #ddd; /* 테이블 셀에 border 추가 */
  padding: 8px; /* 셀의 padding 설정 */
  text-align: center; /* 텍스트 가운데 정렬 */
}

.tbList tbody th {
  background-color: #f2f2f2; /* 테이블 헤더 배경색 */
  border: 1px solid #ddd; /* 테이블 헤더 border 추가 */
  padding: 8px; /* 헤더의 padding 설정 */
  text-align: center; /* 헤더 텍스트 가운데 정렬 */
}

.tit{
  margin-top: 4.5%;
  font-size: 35px;
}
</style>