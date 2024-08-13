var express = require('express');
const router = express.Router();
var db = require('../db.js');
var sql = require('../sql.js');
const fs = require('fs');
const path = require("path");
const multer = require('multer');


// 공지사항 삭제
router.post('/delete', (req, res) => {
  const noticeno = req.body.noticeno;

  db.query(sql.notice_delete, [noticeno], function (error, result) {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'error' });
    } else {
      res.send(result);

    }
  })

});

// 공지사항 수정
router.post('/edit', (req, res) => {
  const editnotice = req.body;
  db.query(sql.notice_Edit, [editnotice.content, editnotice.tit, editnotice.no], function (error, result) {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'error' });
    } else {
      res.send(result);

    }
  })

});

// 게시글 상세 내용
router.post('/noticecontent', (req, res) => {
  const noticeno = req.body.notice_no;

  db.query(sql.notice_Detail, [noticeno], function (error, result1) {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'error' });
    } else {
      res.send(result1);

    }
  });
})

//댓글 작성
router.post('/comment_write', function (req, res) {
  const { notice_no, user_no, comment_content, parent_comment_id } = req.body;
  
  const query = `
    INSERT INTO notice_comments (notice_no, user_no, comment_content, parent_comment_id)
    VALUES (?, ?, ?, ?)
  `;
  
  db.query(query, [notice_no, user_no, comment_content, parent_comment_id], function (error, result) {
    if (error) {
      console.error('댓글 작성 에러:', error);
      return res.status(500).json({ error: '댓글 작성 중 오류가 발생했습니다.' });
    }
    console.log('댓글 작성 성공:', result);
    res.json(result);
  });
});

router.post('/comment_list', (req, res) => {
  const notice_no = req.body.notice_no;

  const query = `
    SELECT c.comment_id, c.notice_no, c.user_no, c.comment_content, c.parent_comment_id, c.comment_at, u.user_nick
    FROM notice_comments c
    JOIN quiz_user u ON c.user_no = u.user_no
    WHERE c.notice_no = ?
    ORDER BY c.comment_at
  `;

  db.query(query, [notice_no], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error retrieving comments');
    }
    res.send(result);
  });
});

// 게시글 작성
router.post('/write', function (req, res) {
  const { notice_tit, notice_content, user_no, notice_img } = req.body;

  db.query(sql.notice_write, [notice_tit, notice_content, user_no, notice_img], function (error, result) {
    if (error) {
      console.error('글 작성 에러:', error);
      return res.status(500).json({ error: '글 작성 중 오류가 발생했습니다.' });
    }
    console.log('글 작성 성공:', result);
    // 적절한 응답 처리 (예시로 결과를 그대로 클라이언트에게 반환)
    res.json(result);
  });
});


// 게시글 목록 불러오기
router.post('/notice', (req, res) => {
  const { page, pageSize } = req.body;
  const offsetPage = 0 + (page - 1) * pageSize;

  db.query(sql.show_notice, [pageSize, offsetPage], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: '에러' });
    }
    res.send(result);
  });
});

// 게시글 갯수 불러오기
router.post('/noticecnt', (req, res) => {
  db.query(sql.notice_cnt, (error, results) => {
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
          cb(null, 'uploads/uploadnotice');
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

router.post('/incrementnoticeView', (req, res) => {
  const { notice_no } = req.body;
  

  const sql = 'UPDATE quiz_notice SET notice_view = notice_view + 1 WHERE notice_no = ?';
  db.query(sql, [notice_no], (err, result) => {
    if (err) {
      console.error('게시글 조회수 증가 중 오류:', err);
      res.status(500).json({ message: 'Failed to increment notice view' });
    } else {
      res.status(200).json({ message: 'notice view incremented successfully' });
    }
  });
});

//검색
router.post('/contentsearch', function (request, response, next) {
  const searchnotice = '%' + request.body.searchnotice + '%';
  // const sortCase = request.body.sortCase;

  // const order = sortCaseReplace(sortCase);
  db.query(sql.notice_search, [searchnotice], function (error, results, fields) {
      if (error) {
          console.error(error);
          return response.status(500).json({ error: 'search_error' });
      }
      response.json(results);
  });
});


//메인 홈에서 최신순으로 가져오기
router.get('/noticeList', (req, res) => {
  db.query(sql.rownuminit, (error, results, fields) => {
    if(error) {

          console.error({message: '초기화 실패', error});

    } else {
      db.query(sql.mainNotice, (error, results, fields) => {

        if(error) {

          return res.status(500).json({ error: '데이터 연결 실패'});
        }

        res.status(200).json({ message: 'success', results});
      });

    };

  });
})

module.exports = router; 