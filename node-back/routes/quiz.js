var express = require('express');
const router = express.Router();
var db = require('../db.js');
var sql = require('../sql.js');
const fs = require('fs');
const path = require("path");
const multer = require('multer');

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads');
        },
        filename(req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + path.extname(file.originalname));
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// 파일 업로드 라우트
router.post('/upload', upload.array('upload', 10), (req, res) => {
    const quiz_no = req.body.quiz_no; // 퀴즈 번호
    const answers = JSON.parse(req.body.answers || '[]'); // 정답 배열

    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: '파일을 업로드 해주세요.' });
    }

    const filePaths = req.files.map(file => file.filename);
    const queries = filePaths.map((filePath, index) => {
        const answer = answers[index] || ''; // 해당 이미지의 정답
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO quiz_images (quiz_no, image_path, answers) VALUES (?, ?, ?)';
            db.query(query, [quiz_no, filePath, answer], (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            });
        });
    });

    Promise.all(queries)
        .then(() => {
            res.json({ paths: filePaths });
        })
        .catch(error => {
            console.error('파일 업로드 중 오류 발생:', error);
            res.status(500).json({ error: '파일 업로드 중 오류가 발생했습니다.' });
        });
});

// 이미지 조회 라우트
router.get('/images', (req, res) => {
    const quiz_no = req.query.quiz_no;
    const query = 'SELECT id, image_path, answers, hint1, hint2 FROM quiz_images WHERE quiz_no = ?';
    db.query(query, [quiz_no], (error, results) => {
        if (error) {
            console.error('이미지 로드 중 오류 발생:', error);
            return res.status(500).json({ error: '이미지 로드 중 오류가 발생했습니다.' });
        }
        res.json(results);
    });
});

// 이미지 삭제 라우트
router.delete('/image/:id', (req, res) => {
    const id = req.params.id;

    const query = 'DELETE FROM quiz_images WHERE id = ?';
    db.query(query, [id], (error, result) => {
        if (error) {
            console.error('이미지 삭제 중 오류 발생:', error);
            return res.status(500).json({ error: '이미지 삭제 중 오류가 발생했습니다.' });
        }
        res.json({ success: true });
    });
});

// 정답 업데이트 라우트
router.put('/update-answers', (req, res) => {
    const { imageId, answers, hint1, hint2 } = req.body; // 이미지 ID, 정답, 힌트1, 힌트2

    const query = 'UPDATE quiz_images SET answers = ?, hint1 = ?, hint2 = ? WHERE id = ?';
    db.query(query, [answers, hint1, hint2, imageId], (error, result) => {
        if (error) {
            console.error('정답 업데이트 중 오류 발생:', error);
            return res.status(500).json({ error: '정답 업데이트 중 오류가 발생했습니다.' });
        }
        res.json({ success: true });
    });
});

// 퀴즈 추가 라우트
router.post('/quizzes', upload.single('thumbnail'), (req, res) => {
    const {user_no, title, content, category, level } = req.body; // 카테고리 추가
    const thumbnail = req.file ? req.file.filename : null;

    if (!title || !content || !category) { // 카테고리 필수 검증 추가
        return res.status(400).json({ error: '제목, 내용, 카테고리를 입력하세요.' });
    }

    const query = 'INSERT INTO quiz_info (user_no, quiz_tit, quiz_content, quiz_category, quiz_level, quiz_thimg) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [user_no, title, content, category, level, thumbnail], (err, result) => {

        if (err) {
            console.error('퀴즈 추가 중 오류 발생:', err);
            return res.status(500).json({ error: '퀴즈 추가 중 오류가 발생했습니다.' });
        }
        res.status(201).json({ quiz_no: result.insertId }); // 생성된 퀴즈 번호 반환
    });
});

// 퀴즈 설정 불러오기 라우트
router.get('/settings/:quizNo', (req, res) => {
    const quizNo = req.params.quizNo;
    const query = 'SELECT quiz_tit AS title, quiz_content AS content, quiz_category AS category, quiz_level AS level, quiz_thimg FROM quiz_info WHERE quiz_no = ?';
    db.query(query, [quizNo], (error, results) => {
        if (error) {
            console.error('퀴즈 설정 로드 중 오류 발생:', error);
            return res.status(500).json({ error: '퀴즈 설정 로드 중 오류가 발생했습니다.' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: '퀴즈를 찾을 수 없습니다.' });
        }
        res.json(results[0]);
    });
});

router.put('/settings/:quizNo', upload.single('thumbnail'), (req, res) => {
    const quizNo = req.params.quizNo;
    const { title, content, category, level } = req.body;
    const thumbnail = req.file ? req.file.filename : null;

    // thumbnail이 있는 경우와 없는 경우에 따라 다른 쿼리 사용
    if (!title || !content || !category) {
        return res.status(400).json({ error: '제목, 내용, 카테고리를 입력하세요.' });
    }

    const query = thumbnail
        ? 'UPDATE quiz_info SET quiz_tit = ?, quiz_content = ?, quiz_category = ?, quiz_level = ?, quiz_thimg = ? WHERE quiz_no = ?'
        : 'UPDATE quiz_info SET quiz_tit = ?, quiz_content = ?, quiz_category = ?, quiz_level = ? WHERE quiz_no = ?';

    const params = thumbnail
        ? [title, content, category, level, thumbnail, quizNo]
        : [title, content, category, level, quizNo];

    db.query(query, params, (err, result) => {
        if (err) {
            console.error('퀴즈 설정 업데이트 중 오류 발생:', err);
            return res.status(500).json({ error: '퀴즈 설정 업데이트 중 오류가 발생했습니다.' });
        }
        res.json({ success: true });
    });
});

router.get('/list', (req, res) => {
    const query = 'SELECT * FROM quiz_info ORDER BY quiz_view DESC'; // 조회수 기준 내림차순 정렬
    db.query(query, (error, results) => {
        if (error) {
            console.error('퀴즈 목록 조회 중 오류 발생:', error);
            return res.status(500).json({ error: '퀴즈 목록 조회 중 오류가 발생했습니다.' });
        }
        res.json(results);
    });
});

router.get('/mylist/:user_no', (req, res) => {
    const userNo = req.params.user_no;
    console.log(userNo)
    db.query(sql.mylist,[userNo], (error, results) => {
        if (error) {
            console.error('퀴즈 목록 조회 중 오류 발생:', error);
            return res.status(500).json({ error: '퀴즈 목록 조회 중 오류가 발생했습니다.' });
        }
        res.json(results);
    });
});
router.get('/finish/:user_no', (req, res) => {
    const userNo = req.params.user_no;
    console.log(userNo)
    db.query(sql.quiz_current,[userNo], (error, results) => {
        if (error) {
            console.error('퀴즈 목록 조회 중 오류 발생:', error);
            return res.status(500).json({ error: '퀴즈 목록 조회 중 오류가 발생했습니다.' });
        }
        res.json(results);
    });
});


// quiz/detail/:quizNo
router.get('/detail/:quizNo', (req, res) => {
    const quizNo = req.params.quizNo; // URL 파라미터에서 quizNo 추출

    // quizNo가 숫자 형식인지 확인 (정수형인지)
    if (isNaN(quizNo)) {
        return res.status(400).json({ error: '유효한 퀴즈 번호를 입력하세요.' });
    }

    const query = 'SELECT * FROM quiz_info WHERE quiz_no = ?';
    db.query(query, [quizNo], (error, results) => {
        if (error) {
            console.error('퀴즈 상세 조회 중 오류 발생:', error);
            return res.status(500).json({ error: '퀴즈 상세 조회 중 오류가 발생했습니다.' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: '퀴즈를 찾을 수 없습니다.' });
        }
        res.json(results[0]); // 결과가 배열이므로 첫 번째 항목을 반환
    });
});

// 댓글 추가 라우트
router.post('/comments/:quizNo', (req, res) => {
    const quizNo = req.params.quizNo;
    const { text, userNo } = req.body; // 사용자 ID와 댓글 내용

    // 사용자 닉네임 조회
    const getNickQuery = 'SELECT user_nick FROM quiz_user WHERE user_no = ?';

    db.query(getNickQuery, [userNo], (err, result) => {
        if (err) {
            console.error('닉네임 조회 중 오류 발생:', err);
            return res.status(500).json({ error: '닉네임 조회 중 오류가 발생했습니다.' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
        }

        const userNick = result[0].user_nick;
        const insertQuery = 'INSERT INTO quiz_comments (quiz_no, user_no, quiz_content, comment_at, user_nick) VALUES (?, ?, ?, NOW(), ?)';

        // 댓글 추가
        db.query(insertQuery, [quizNo, userNo, text, userNick], (error, result) => {
            if (error) {
                console.error('댓글 추가 중 오류 발생:', error);
                return res.status(500).json({ error: '댓글 추가 중 오류가 발생했습니다.' });
            }

            // 방금 생성된 댓글을 반환
            res.status(201).json({
                id: result.insertId,
                text: text,
                user_nick: userNick, // 반환하는 댓글 데이터에 사용자 닉네임 추가
                createdAt: new Date() // 생성 시간 추가
            });
        });
    });
});

// 특정 퀴즈에 대한 댓글 조회
router.get('/commentlist/:quizNo', (req, res) => {
    const quizNo = req.params.quizNo;
    const query = 'SELECT comment_id AS id, user_nick AS nick, quiz_content AS text, comment_at AS createdAt FROM quiz_comments WHERE quiz_no = ? ORDER BY comment_id DESC';

    console.log();
    
    db.query(query, [quizNo], (error, results) => {
        if (error) {
            console.error('댓글 조회 중 오류 발생:', error);
            return res.status(500).json({ error: '댓글 조회 중 오류가 발생했습니다.' });
        }
        res.json(results);
    });
});

// 댓글 삭제 라우트
router.delete('/delete/:quizNo/:commentId', (req, res) => {
    const quizNo = req.params.quizNo;
    const commentId = req.params.commentId;
    const userNo = req.body.userNo; // 사용자 ID를 요청 본문에서 받아옵니다.

    // 댓글 조회 쿼리
    const getCommentQuery = 'SELECT user_no FROM quiz_comments WHERE comment_id = ? AND quiz_no = ?';
    db.query(getCommentQuery, [commentId, quizNo], (error, result) => {
        if (error) {
            console.error('댓글 조회 중 오류 발생:', error);
            return res.status(500).json({ error: '댓글 조회 중 오류가 발생했습니다.' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: '댓글을 찾을 수 없습니다.' });
        }

        const commentOwner = result[0].user_no;

        // 댓글 작성자와 요청자 일치 여부 확인
        if (commentOwner !== userNo) {
            return res.status(403).json({ error: '본인의 댓글만 삭제할 수 있습니다.' });
        }

        // 댓글 삭제 쿼리
        const deleteQuery = 'DELETE FROM quiz_comments WHERE comment_id = ? AND quiz_no = ?';
        db.query(deleteQuery, [commentId, quizNo], (error, result) => {
            if (error) {
                console.error('댓글 삭제 중 오류 발생:', error);
                return res.status(500).json({ error: '댓글 삭제 중 오류가 발생했습니다.' });
            }

            // 삭제 성공 응답
            if (result.affectedRows > 0) {
                res.status(200).json({ message: '댓글이 삭제되었습니다.' });
            } else {
                res.status(404).json({ error: '댓글을 찾을 수 없습니다.' });
            }
        });
    });
});

// 서버 코드: quiz_info 테이블에서 quiz_view 증가시키기
router.post('/view/:quizNo', (req, res) => {
    const quizNo = req.params.quizNo;

    // quiz_view 값을 1 증가시키는 쿼리
    const updateQuery = 'UPDATE quiz_info SET quiz_view = quiz_view + 1 WHERE quiz_no = ?';

    db.query(updateQuery, [quizNo], (error, result) => {
        if (error) {
            console.error('조회 수 업데이트 중 오류 발생:', error);
            return res.status(500).json({ error: '조회 수 업데이트 중 오류가 발생했습니다.' });
        }
        res.status(200).json({ message: '조회 수가 업데이트되었습니다.' });
    });
});

router.get('/top-quizzes/:category', (req, res) => {
    const category = req.params.category;
    const query = 'SELECT * FROM quiz_info WHERE quiz_category = ? ORDER BY quiz_view DESC LIMIT 4';

    db.query(query, [category], (error, results) => {
        if (error) {
            console.error('퀴즈 목록 조회 중 오류 발생:', error);
            return res.status(500).json({ error: '퀴즈 목록 조회 중 오류가 발생했습니다.' });
        }
        res.json(results);
    });
});

router.post('/report', (req, res) => {
    const { comment_id, report_type_id, content, user_no } = req.body; // 댓글 ID, 신고 유형 ID, 신고 내용, 사용자 ID

    if (!comment_id || !report_type_id || !content || !user_no) {
        return res.status(400).json({ error: '모든 필드를 입력해야 합니다.' });
    }

    // 사용자 닉네임 조회
    const getNickQuery = 'SELECT user_nick FROM quiz_user WHERE user_no = ?';

    db.query(getNickQuery, [user_no], (err, result) => {
        if (err) {
            console.error('닉네임 조회 중 오류 발생:', err);
            return res.status(500).json({ error: '닉네임 조회 중 오류가 발생했습니다.' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
        }

        const userNick = result[0].user_nick;

        // 댓글 작성자 ID와 퀴즈 번호 조회
        const getCommentQuery = 'SELECT user_no, quiz_no FROM quiz_comments WHERE comment_id = ?';

        db.query(getCommentQuery, [comment_id], (err, commentResult) => {
            if (err) {
                console.error('댓글 조회 중 오류 발생:', err);
                return res.status(500).json({ error: '댓글 조회 중 오류가 발생했습니다.' });
            }

            if (commentResult.length === 0) {
                return res.status(404).json({ error: '댓글을 찾을 수 없습니다.' });
            }

            const commentUserNo = commentResult[0].user_no;
            const quizNo = commentResult[0].quiz_no;

            // 신고 추가
            const insertReportQuery = 'INSERT INTO quiz_reports (user_no, report_type_id, content, user_nick, quiz_no, comment_id) VALUES (?, ?, ?, ?, ?, ?)';

            db.query(insertReportQuery, [commentUserNo, report_type_id, content, userNick, quizNo, comment_id], (error, result) => {
                if (error) {
                    console.error('신고 추가 중 오류 발생:', error);
                    return res.status(500).json({ error: '신고 추가 중 오류가 발생했습니다.' });
                }

                res.status(201).json({ message: '신고가 접수되었습니다.' });
            });
        });
    });
});


// 메인 화면에 표시할 인기 퀴즈
router.get('/quizList', (req, res) => {
    db.query(sql.quiz_best, (error, results, fields) => {
        if(error) {
            return res.status(500).json({error: '오류 발생'});
        }
        return res.status(200).json({message:'success', results});
    });
});

// 퀴즈 완료를 처리하는 라우트
router.put('/complete/:quizNo', (req, res) => {
    const quizNo = req.params.quizNo;

    // 현재 시간을 가져옵니다
    const currentTime = new Date();

    // 데이터베이스 쿼리
    const query = 'UPDATE quiz_info SET uploads_at = ? WHERE quiz_no = ?';
    db.query(query, [currentTime, quizNo], (err, result) => {
        if (err) {
            console.error('퀴즈 완료 시간 업데이트 중 오류 발생:', err);
            res.status(500).send('서버 오류 발생');
        } else {
            res.status(200).send('퀴즈 완료 시간 업데이트 성공');
        }
    });
});

//최근에 푼 퀴즈
router.get('/currentQuiz', (req, res) => {
    db.query(sql.quiz_current, (error, results, fields) => {

        if(error) {
            return res.status(500).json({error: '오류 발생'});
        }
        return res.status(200).json({message:'success', results});
    });
});

// 메뉴 난이도 클릭시 나오는 퀴즈화면
router.get('/:quizLevel/:quizCategory', (req, res) => {
    const quizLevel = req.params.quizLevel
    const quizCategory = req.params.quizCategory
    console.log('요청 받은 레벨:',quizLevel);
    console.log('요청 받은 카테고리:', quizCategory);
    
    
    db.query(sql.quiz_All, [quizLevel, quizCategory], (error, results, fields) => {

        if(error) {
            console.log('현재 에러:', error);
            
            return res.status(500).json({error: '오류 발생'});
        } else if(!quizLevel) {
            console.log('요청 받은 레벨이 없을시:',error);
            
            return res.status(500).json({error: '해당 값이 없습니다.'})
            
        }
        console.log(results);
        
        return res.status(200).json({ message: 'success', results});
    });
});


module.exports = router;