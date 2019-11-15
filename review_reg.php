<?php
require('db_def.php'); //データベース接続用の定数を定義したファイルを読み込む

if(isset($_POST["user_name"])){//hiddenタイプで送信されたmethodの値を使って登録動作かどうかを判断
	if(!empty($_REQUEST["user_name"])){//ユーザ名が入力されていた場合

		//データベースへの接続を行う
		$connect = pg_connect("user=$dbuser password=$dbpasswd");

		//FORMから送信された値を読み取る
		//idはデータベース側で自動採番のため省略
		$obj_id = htmlspecialchars($_REQUEST["obj_id"]);//HTML表示に影響する文字列をエスケープ
		$obj_id = pg_escape_string($connect,$obj_id);//SQL中の不正文字をエスケープ
		$user_name = htmlspecialchars($_REQUEST["user_name"]);
		$user_name = pg_escape_string($connect,$user_name);//SQL中の不正文字をエスケープ
		$score = htmlspecialchars($_REQUEST["review_score"]);
		$score = pg_escape_string($connect,$score);//SQL中の不正文字をエスケープ
		$text = htmlspecialchars($_REQUEST["review_text"]);
		$text = pg_escape_string($connect,$text);//SQL中の不正文字をエスケープ

		//INSERT文を生成
		$sql = "INSERT INTO review (obj_id, user_name, score, text) VALUES (";
		$sql .= "$obj_id";
		$sql .= ",'{$user_name}'";
		$sql .= ",$score";
		$sql .= ",'$text'";
		$sql .= ");";

		if(!empty($connect)){ //データベースに接続されているかを確認して
			$result = pg_query($connect,$sql);
			pg_close($connect);

			if(! $result){ echo "$sqlの実行に失敗しました。\n\n"; }
			echo "$sql\n";
			echo "を実行しました。\n\n";
			//元のページに戻る場合は，上2行のecho文をコメントアウトし，以下の2行のコメントを外す
			//$ref = $_SERVER['HTTP_REFERER'];
			//header("Location: {$ref}");
		}
		else{
			echo "データベースにユーザ名{$dbuser}，パスワード{$dbpasswd}で接続できませんでした。";
		}
	}
}

?>
