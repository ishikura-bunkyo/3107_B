<?php
/*
 * レビュー情報をJSONで出力するためのPHPスクリプト
*/
include("db_def.php");				//定義用ファイルの読み込み
include("review_class.php");		//review用クラスの読み込み

$c = pg_connect("user={$dbuser} password={$dbpasswd}");		//DB接続用のユーザー名とパスワードを指定

if(!$c){ //接続できなかった場合もJSONでエラーメッセージを返す
	echo '{ "Status": "Error", "Message" : "'.$dbuser.'が'.$dbpasswd.'で，データベースに接続できませんでした"}';
	exit; //途中で終了
}
$sql = "SELECT * FROM review "; //reviewはテーブル名
if(isset($_REQUEST["obj_id"]) && !empty($_REQUEST["obj_id"])){ //obj_idの値（呼び出し元のhtmlに渡されたid）によって検索
	$obj_id = pg_escape_string($c,$_REQUEST["obj_id"]);
	$sql .= " WHERE obj_id = ".$obj_id;
}
$sql .= "ORDER BY id DESC LIMIT 5"; //新しいもの（idの大きい順）から5件分を取得する
$sql .= ";";

//echo "$sql\n";
$rs = pg_query($c, $sql);			//SQL文実行

$review_list = new reviewList();			//紹介対象をリストにするクラスの生成
while($arr = pg_fetch_assoc($rs)){	//DBの取得件数分だけ紹介対象のクラスを生成し，リスト用クラスに追加
	$review_list -> add($arr);
}
pg_close($c);						//DBを閉じる
echo($review_list -> getJson());				//JSONデータとして出力
?>
