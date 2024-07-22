module.exports = {

  // auth
  join: `INSERT INTO quiz_user (user_id, user_nick, user_email, user_passwd, user_num, user_zipcode, user_adr1, user_adr2) VALUES(?,?,?,?,?,?,?,?)`,

  id_check: `SELECT * FROM quiz_user WHERE user_id = ?`,
  get_user_no: `SELECT user_no FROM quiz_user WHERE user_id = ?`,
  login: `SELECT user_passwd FROM quiz_user WHERE user_id = ?`,
  //카카오 로그인
  kakaoJoin: `INSERT INTO quiz_user (user_id, user_nick, user_email, user_login_ty) VALUES(?,?,?,1)`,
  kakao_check: `SELECT * FROM quiz_user WHERE user_id = ?`,
  kakao_delete: `delete from quiz_user where user_login_ty = 1 and user_no = ?`,
  //네이버 로그인
  naverlogin: `INSERT INTO quiz_user (user_email, user_id, user_nick, user_login_ty) VALUES (?, ?, ?, 2)`,
  naver_id_check: `SELECT * FROM quiz_user WHERE user_id = ?`,


    //게시판 기능
    board_write: `INSERT INTO trip_board(board_tit, board_content,user_no, board_img) VALUES(?, ?, ?, ?);`,
    show_board: `select * from trip_board join trip_user 
          where trip_board.user_no=trip_user.user_no and trip_board.user_no ORDER BY board_no DESC LIMIT ? OFFSET ?;`,
    board_cnt: `SELECT COUNT(*) FROM trip_board`,
    board_search: `SELECT * FROM trip_board join trip_user WHERE trip_board.user_no = trip_user.user_no and board_tit LIKE ? ORDER BY board_no DESC`,
    board_admin: `SELECT * FROM trip_board JOIN trip_user WHERE trip_board.user_no = trip_user.user_no`, //1
    board_Detail: `SELECT * FROM trip_board JOIN trip_user WHERE trip_board.user_no=trip_user.user_no AND board_no = ?; `, //게시글 상세
    board_delete: `DELETE FROM trip_board WHERE board_no = ?`,
    board_Edit: `UPDATE trip_board SET board_content = ?, board_tit = ? WHERE board_no = ?;`,
    comment_list: `SELECT comment_id, comment_content, parent_comment_id, comment_at, user_no, board_no FROM board_comments WHERE board_no = ?`,
    comment_write: `INSERT INTO board_comments(user_no, comment_content) VALUES(?, ?)`,

    boardcnt: `SELECT COUNT(*) FROM trip_board`,

    adminboard: `select * from trip_board join trip_user 
          where trip_board.user_no=trip_user.user_no and trip_board.user_no ORDER BY board_no DESC LIMIT ? OFFSET ?;`,
    deleteboard: `DELETE FROM trip_board WHERE board_no = ?`,
    
}