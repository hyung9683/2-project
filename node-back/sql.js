module.exports = {
      //최신순
  all_list: `SELECT *
  FROM quiz_qna 

  
  `,
  //오래된순
  all_list2: `SELECT *
FROM quiz_qna
WHERE qna_ans IS NULL OR qna_ans = '';

  `,

reportDetails: `
      
SELECT * FROM quiz_reports WHERE user_no = ?;
`,
// reportDetails2: `
      
// select * from quiz_reports join quiz_user 
//         where quiz_reports.user_no=quiz_user.user_no;

// `,
reportDetails2: `SELECT quiz_reports.*, quiz_user.user_nick, quiz_user.user_email
FROM quiz_reports
JOIN quiz_user ON quiz_reports.user_no = quiz_user.user_no
WHERE quiz_reports.user_no = ?;`,

  // auth
  join: `INSERT INTO quiz_user (user_id, user_nick, user_email, user_passwd, user_num) VALUES(?,?,?,?,?)`,

  id_check: `SELECT * FROM quiz_user WHERE user_id = ?`,

  get_user_no: `SELECT user_no FROM quiz_user WHERE user_id = ?`,
  login: `SELECT user_passwd FROM quiz_user WHERE user_id = ?`,
  //카카오 로그인
  kakaoJoin: `INSERT INTO quiz_user (user_id, user_nick, user_email, user_login_ty) VALUES(?,?,?,1)`,
  kakao_check: `SELECT * FROM quiz_user WHERE user_id = ?`,
  kakao_delete: `delete from quiz_user where user_login_ty = 1 and user_no = ?`,

  // admin 기능 


   admin_ck: `SELECT user_type FROM quiz_user WHERE user_no = ?`,
   
   admin_search: `SELECT * FROM quiz_user`,
  
//사용자 정보 조회
user_info: `SELECT user_id, user_nick, user_email, user_num, user_login_ty
FROM quiz_user
WHERE user_no = ?`,

   // 사용자 정보 수정
  user_update: `update quiz_user set user_id = ?, user_nick = ?, user_email = ?, user_num = ?,
  where user_no = ?`,
    //계정 삭제
  user_delete: `delete from quiz_user where user_no = ?`,

  // 사용자 정보 수정
  user_update: `update quiz_user set user_id = ?, user_nick = ?, user_email = ?, user_num = ?
  where user_no = ?`,
  //계정 삭제
  user_delete: `delete from quiz_user where user_no = ?`,
  soft_Dele : `update quiz_user set deleted_at = now() where user_no=?`,
  //pass
  pass_info: `select user_passwd from quiz_user where user_no = ?`,
  pass_update: 'UPDATE quiz_user SET user_passwd = ? WHERE user_no = ?', 

    // 아이디 비번 찾기
    id_find: `SELECT user_id FROM quiz_user WHERE user_email = ?`,
    user_check: `SELECT user_no FROM quiz_user WHERE user_email = ? AND user_id = ?`,
    pass_update_tem: `UPDATE quiz_user SET user_passwd = ? WHERE user_id = ?`,

   //qna
   qnaContent: `SELECT * FROM quiz_qna JOIN trip_user 
                WHERE trip_qna.user_no=trip_user.user_no AND qna_no = ?;`,
  qnaWrite: `INSERT INTO quiz_qna (user_no, qna_tit, qna_content, qna_secret) VALUES (?, ?, ?, ?)`, 
  qna: `SELECT * FROM quiz_qna JOIN quiz_user 
                WHERE quiz_qna.user_no=quiz_user.user_no 
                ORDER BY qna_no LIMIT ? OFFSET ?;`,//1  
   
  
  deleteContent: `DELETE FROM quiz_qna WHERE qna_no = ?`, 
  qnaEdit: `UPDATE quiz_qna  SET qna_content = ?, qna_tit = ? WHERE qna_no = ?;`, 

  // 아이디 비번 찾기
  id_find: `SELECT user_id FROM quiz_user WHERE user_email = ?`,
  user_check: `SELECT user_no FROM quiz_user WHERE user_email = ? AND user_id = ?`,
  pass_update_tem: `UPDATE quiz_user SET user_passwd = ? WHERE user_id = ?`,
    
  //qna
  qnaContent: `SELECT * FROM quiz_qna JOIN quiz_user 
                WHERE quiz_qna.user_no = quiz_user.user_no AND qna_no = ?;`,
  qnaWrite: `INSERT INTO quiz_qna (user_no, qna_tit, qna_content, qna_secret) VALUES (?, ?, ?, ?)`, 
  qna: `SELECT * FROM quiz_qna JOIN quiz_user 
                WHERE quiz_qna.user_no=quiz_user.user_no 
                ORDER BY qna_no LIMIT ? OFFSET ?;`,//1     
  
  deleteContent: `DELETE FROM quiz_qna WHERE qna_no = ?`, 
  qnaEdit: `UPDATE quiz_qna  SET qna_content = ?, qna_tit = ? WHERE qna_no = ?;`, 
  qnaCheck: `SELECT user_ty FROM quiz_user WHERE user_no =?;`,
  ansWrite: `UPDATE quiz_qna  SET qna_ans = ?  WHERE qna_no = ?;`,
  qnacnt: `SELECT COUNT(*) FROM quiz_qna;`,
  
  myqna: `SELECT * FROM quiz_qna WHERE user_no = ? ORDER BY qna_no DESC LIMIT ? OFFSET ?`,
  my_qnacnt: `SELECT COUNT(*) AS count FROM quiz_qna WHERE user_no = ?`,
  myboard_cnt: `SELECT COUNT(*) AS count FROM quiz_board WHERE user_no = ?`,

  myboard: `select * from quiz_board join trip_user 
        where quiz_board.user_no=quiz_user.user_no and quiz_board.user_no = ? ORDER BY board_no DESC LIMIT ? OFFSET ?;`,

viewcount: `SELECT board_tit, board_view
          FROM quiz_board;`,

// admin 기능 

admin_search: `SELECT * FROM quiz_user`,

    //게시판 기능
    board_write: `INSERT INTO quiz_board(board_tit, board_content,user_no, board_img) VALUES(?, ?, ?, ?);`,
    show_board: `select * from quiz_board join trip_user 
          where quiz_board.user_no=quiz_user.user_no and quiz_board.user_no ORDER BY board_no DESC LIMIT ? OFFSET ?;`,
    board_cnt: `SELECT COUNT(*) FROM quiz_board`,
    board_search: `SELECT * FROM quiz_board WHERE board_tit LIKE ? ORDER BY board_no DESC`,
    board_admin: `SELECT * FROM quiz_board JOIN quiz_user WHERE quiz_board.user_no = quiz_user.user_no`, //1
    board_Detail: `SELECT * FROM quiz_board JOIN quiz_user WHERE quiz_board.user_no=quiz_user.user_no AND board_no = ?; `, //게시글 상세
    board_delete: `DELETE FROM quiz_board WHERE board_no = ?`,
    board_Edit: `UPDATE quiz_board SET board_content = ?, board_tit = ? WHERE board_no = ?;`,
    comment_list: `SELECT comment_id, comment_content, parent_comment_id, comment_at, user_no, board_no FROM board_comments WHERE board_no = ?`,
    comment_write: `INSERT INTO board_comments(user_no, comment_content) VALUES(?, ?)`,

    boardcnt: `SELECT COUNT(*) FROM quiz_board`,

  myboard: `select * from quiz_board join quiz_user 
        where quiz_board.user_no=quiz_user.user_no and quiz_board.user_no = ? ORDER BY board_no DESC LIMIT ? OFFSET ?;`,
  deletereview: 'DELETE FROM quiz_review WHERE review_no = ?',

  viewcount: `SELECT board_tit, board_view
          FROM quiz_board;`,

      // 퀴즈 불러오기
      quiz_All: `select quiz_no, user_no, quiz_tit, quiz_thimg, quiz_category, quiz_level, quiz_day from quiz_info`,

    //게시판 기능
    boardcnt: `SELECT COUNT(*) FROM quiz_board`,
    adminboard: `select * from quiz_board join quiz_user 
          where quiz_board.user_no=quiz_user.user_no and quiz_board.user_no ORDER BY board_no DESC LIMIT ? OFFSET ?;`,
    deleteboard: `DELETE FROM quiz_board WHERE board_no = ?`,

//메인
   all_quiz_list: `SELECT quiz_no, quiz_tit, quiz_thimg
                  FROM quiz_info`,

//공지사항
   noticewrite : `insert into quiz_notice (notice_tit, notice_content) values(?,?);`,
   noticecontent: `select * from quiz_notice;`,
   noticedetail: `select * from quiz_notice where notice_no = ?;`,

//퀴즈 작성
   quizwrite : `insert into quiz_info (quiz_tit, quiz_hint, quiz_img) values(?, ?, ?);`,
   quiz: `SELECT quiz_img 
	FROM quiz_info 
	ORDER BY RAND() 
	LIMIT 1;`,
   bestquiz : `select  quiz_no, quiz_tit, quiz_thimg from quiz_info where quiz_no = ? order by quiz_view desc;`,
   quiz_comment_list: `SELECT comment_id, quiz_context, parent_comment_id, comment_at, user_no, quiz_no FROM quiz_comments WHERE quiz_no = ?`,
   quiz_comment_write: `INSERT INTO quiz_comments(user_no, quiz_context) VALUES(?, ?)`,
   quiz_delete: `DELETE FROM quiz_info WHERE quiz_no = ?`,

//마이페이지
myquiz : `select  quiz_no, quiz_tit, quiz_thimg from quiz_info join quiz_user
	   where quiz_info.user_no = quiz_user.user_no and quiz_info.user_no = ? order by quiz_no desc`, 

}