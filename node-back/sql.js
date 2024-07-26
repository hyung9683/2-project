module.exports = {
      mylist:`SELECT q.quiz_no,q.user_no,u.user_nick,q.quiz_tit,q.quiz_hint1,q.quiz_hint2,  q.quiz_thimg,q.quiz_img, q.quiz_category,q.quiz_level,q.quiz_view,q.quiz_report,q.quiz_day,q.quiz_answer,q.quiz_content FROM quiz_info q JOIN quiz_user u ON q.user_no = u.user_no WHERE q.user_no = ?`,
      // mylist:`SELECT * FROM quiz_info JOIN quiz_user WHERE quiz_info.user_no=quiz_user.user_no `,
      // mylist:`select * from quiz_info join quiz_user where quiz_info.user_no=quiz_user.user_no;`,
      // mylist:`SELECT * FROM quiz_info WHERE user_no = ?`,
      mylist2:`SELECT 
    q.quiz_no,
    q.user_no,
    u.user_nick,
    q.quiz_tit,
    q.quiz_hint1,
    q.quiz_hint2,
    q.quiz_thimg,
    q.quiz_img,
    q.quiz_category,
    q.quiz_level,
    q.quiz_view,
    q.quiz_report,
    q.quiz_day,
    q.quiz_answer,
    q.quiz_content
FROM 
    quiz_info q
JOIN 
    quiz_user u ON q.user_no = u.user_no
WHERE 
    q.user_no = ?
`,
      //최신순
  all_list: `SELECT *
  FROM quiz_qna 

  
  `,
  //미답변
  all_list2: `SELECT *
FROM quiz_qna
WHERE qna_ans IS NULL OR qna_ans = '';

  `,
  quizz_delete: `delete from quiz_info where user_no = ?`,

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
  myboard: `select * from quiz_board join quiz_user 
        where quiz_board.user_no=quiz_user.user_no and quiz_board.user_no = ? ORDER BY board_no DESC LIMIT ? OFFSET ?;`,
  deletereview: 'DELETE FROM quiz_review WHERE review_no = ?',

  viewcount: `SELECT board_tit, board_view
          FROM quiz_board;`,

    //게시판 기능
    boardcnt: `SELECT COUNT(*) FROM quiz_board`,
    adminboard: `select * from quiz_board join quiz_user 
          where quiz_board.user_no=quiz_user.user_no and quiz_board.user_no ORDER BY board_no DESC LIMIT ? OFFSET ?;`,
    deleteboard: `DELETE FROM quiz_board WHERE board_no = ?`,
    
}