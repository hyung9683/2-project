var express = require('express');
const router = express.Router();
var db = require('../db.js');
var sql = require('../sql.js');
const fs = require('fs');
const path = require("path");
const multer = require('multer');

//최신순
router.get('/all/:sortCase', function (request, response, next) {
  
  db.query(sql.all_list, function (error, results, fields) {
      if (error) {
          console.error(error);
          return response.status(500).json({ error: 'search_error' });
      }
      response.json(results);
  });
});
//오래된순
router.get('/ans/:sortCase', function (request, response, next) {

  db.query(sql.all_list2, function (error, results, fields) {
      if (error) {
          console.error(error);
          return response.status(500).json({ error: 'search_error' });
      }
      response.json(results);
  });
});

router.get('/report/:userNo', async (req, res) => {
  const userNo = req.params.userNo;
  console.log('리포트1', userNo);

  // SQL 쿼리 실행
  db.query(sql.reportDetails, [userNo], function (error, results) {
    if (error) {
      console.error('신고 상세 정보 조회 실패:', error);
      return res.status(500).json({ error: '서버 에러', details: error });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: '신고를 찾을 수 없습니다' });
    }

    // 결과 객체 가져오기
    const report = results[0];

    // 신고 유형 변환
    const reportTypeMap = {
      1: '비속어 사용',
      2: '분란 조장',
      3: '스팸/광고',
      4: '개인정보 노출'
    };

    report.report_type = reportTypeMap[report.report_type_id] || '알 수 없음';

    // 신고 상세 내용 반환
    res.json(report);
  });
});

router.get('/report2/:userNo', async (req, res) => {
  const userNo = req.params.userNo;
  console.log('리포트2',userNo);
  // SQL 쿼리 실행
  db.query(sql.reportDetails2,[userNo], function(error, results) {
    if (error) {
      console.error('신고 상세 정보 조회 실패:', error);
      return res.status(500).json({ error: '서버 에러', details: error });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: '신고를 찾을 수 없습니다' });
    }

    // 신고 상세 내용 반환
    res.json(results[0]);
  });
});

// 계정 잠금
router.post('/lock/:user_no', async (req, res) => {
  const userno = req.params.user_no;
  await db.query(sql.soft_Dele, [userno], function(error, results, fields) {
      if(error) {
          return res.status(500).json({ error: '삭제 실패' });
      }
      console.log(results);
      return res.json(results);
  });
});

// 게시글 삭제
router.post('/delete', (req, res) => {
  const qnanum = req.body.qnano;

  db.query(sql.deleteContent, [qnanum], function (error, result) {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'error' });
    } else {
      res.send(result);

    }
  })

});

// qna게시글 수정
router.post('/edit', (req, res) => {
  const editQna = req.body;
  db.query(sql.qnaEdit, [editQna.content, editQna.tit, editQna.qnano], function (error, result) {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'error' });
    } else {
      res.send(result);

    }
  })

});

// 답변 작성
router.post('/write_ans', (req, res) => {
  const writeAns = req.body;
  db.query(sql.ansWrite, [writeAns.qna_ans, writeAns.qna_no], function (error, result) { 
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'error' });
    } else {
      res.send(result);

    }
  })

});

// qna 상세 내용
router.post('/qnacontent', (req, res) => {
  const qnano = req.body.qna_no;

  db.query(sql.qnaContent, [qnano], function (error, result1) {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'error' });
    } else {
      res.send(result1);


    }
  });
})

// qna 작성
router.post('/write', function (req, res) {
  const writeQna = req.body;

  db.query(sql.qnaWrite, [writeQna.user_no, writeQna.qna_tit, writeQna.qna_content, writeQna.qna_secret], function (error, result) {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'error' });
    } else {
      res.send(result);

    }
  })

});

// qna목록
router.post('/qna_list', (req, res) => {
  const qnapage = req.body;

  const offsetPage = 0 + (req.body.page - 1) * 10;
  db.query(sql.qna, [qnapage.pagesize, offsetPage], (err, result, fields) => {
    res.send(result);
  });
});

// 관리자 qna목록
router.post('/qna_admin_list', (req, res) => {

  db.query(sql.qnaAdmin, (err, result, fields) => {

    res.send(result);
  });
});

//qna 글 갯수 불러오기
router.post('/boardlistcnt', (req, res) => {
  db.query(sql.qnacnt, (error, results, fields) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: '에러' });
    }
    return res.status(200).json(results[0]['COUNT(*)']);
  });
});

// 이미지 업로더 
const upload = multer({
  storage: multer.diskStorage({
      destination(req, file, cb) {
          cb(null, 'uploads');
      },
      filename(req, file, cb) {
          cb(null, file.originalname);
      },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// 이미지 업로드
router.post('/upload', upload.single('upload'), function(request, response) {
  if(!request.file) {
      return response.status(404).json({ error: '이미지 업로드를 해주세요.'});
  }
  const imagePath = request.file.path
  console.log(imagePath)
  return response.json({ imagePath: imagePath})
}) 


// 상품 정렬 방식 
function sortCaseReplace(sortCase) {
  let order = ` ORDER BY quiz_no Desc`; // 한자초급
  if (sortCase == 0) { // 최근 순
      order = ` ORDER BY quiz_no Desc`;
  }
   else if (sortCase == 1) { // 한자 중급
      order = ` ORDER BY quiz_no`;
  }
  else if (sortCase == 2) { // 한자고급
      order = ` ORDER BY quiz_no`;
  }
  return order;
}

// 상품 정렬 방식 2
function sortCaseReplace2(sortCase) {
  let order2 = ` ORDER BY quiz_no Desc`; // 영어초급
  if (sortCase == 0) { // 최근 순
      order2 = ` ORDER BY quiz_no Desc`;
  }
   else if (sortCase == 1) { // 영어 중급
      order2 = ` ORDER BY quiz_no`;
  }
  else if (sortCase == 2) { //영어고급
      order2 = ` ORDER BY quiz_no`;
  }
  return order2;
}

//전체축제리스트
router.get('/quiz/:sortCase', function (request, response, next) {

  const sortCase = request.params.sortCase;
 const order2 = sortCaseReplace2(sortCase);

  db.query(sql.all_list + order2, function (error, results, fields) {
      if (error) {
          console.error(error);
          return response.status(500).json({ error: 'search_error' });
      }
      response.json(results);
  });
});

router.post('/viewcount', function (req, res) {
  db.query(sql.viewcount, function (error, results, fields) {
      if (error) {
          console.error(error);
      }
      console.log(results);
      return res.json(results);
  })
})

//admin 계정을 제외한 모든 사용자 정보 가져오기
router.get('/userinfo', function (req, res) {
  db.query(sql.admin_search, function(error, results, fields) {
      if(error) {
        console.error(error);
          return res.status(500).json({ error: '서버 에러', details: error});
      }

      if (!results || results.length === 0) {
        console.log('No results found');
        return res.status(404).json({ error: '없는 사용자입니다' });
      }
      return res.json(results);
  });
})

//퀴즈 삭제
router.post('/quiz/delete', function (request, response, next) {
  const quizno = request.body.quiz_no; 

  if (!Array.isArray(quizno)) {
    return response.status(400).json({ error: 'Invalid input' });
  }

  db.query(sql.quiz_list_delete, [quizno], function (error, results, fields) {
    if (error) {
      console.error(error);
      return response.status(500).json({ error: 'delete_error' });
    }
    response.json(results);
  });
});

 // 내 게시글 목록 불러오기
 router.post('/board_list', (req, res) => {
  const { page, limit } = req.body;
  
  // 기본값 설정
  let pageNum = parseInt(page, 10) || 1;
  let limitNum = parseInt(limit, 10) || 10;
  const offset = (pageNum - 1) * limitNum;

  db.query(sql.adminboard, [limitNum, offset], function (error, result) {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'error' });
    } else {
      res.send(result);
    }
  });
});

// 내 게시글 갯수 불러오기
router.post('/board_count', (req, res) => {

  db.query(sql.boardcnt, (error, results, fields) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: '에러' });
    }
    return res.status(200).json(results[0].count);
  });
});

// 게시글 삭제
router.post('/boarddelete', (req, res) => {
  const { boardno } = req.body;
  db.query(sql.deleteboard, [boardno], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(result);
  });
});

// 계정 삭제
router.delete('/delete', function (req, res) {
  const userno = req.body;
  console.log(userno.user_no);
  db.query(sql.user_delete, [userno.user_no], function(error, results, fields) {
      if(error) {
          return res.status(500).json({ error: '삭제 실패' });
      }
      console.log(results);
      return res.json(results);
  });
});

module.exports = router;