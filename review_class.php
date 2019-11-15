<?php //紹介対象のクラス定義，テーブルに相当するリストのクラス定義

class review{

	var $id; //idのカラムの値
	var $obj_id; //obj_idのカラムの値
	var $user_name; //user_nameのカラムの値
	var $score; //scoreのカラムの値
	var $text; //textのカラムの値
	//PHPのクラスでは，その他任意の変数をフィールド変数とすることができる

	function review($arr){ //コンストラクタ（インスタンス化のタイミングで実行されるメソッド）
		foreach($arr as $k => $v) $this -> $k = $v;  //DBのフィールド名をそのまま同名のプロパティにデータの流し込み
	}
}

//紹介対象のオブジェクトをリストで保持するためのクラス
class reviewList{
	//プロパティ
	public $review_list = array();	//クラスintroduction_objのインスタンスを配列で保持するプロパティ
	//メソッド
	function add($arr){	//introduction_obj型インスタンス１つをリストに追加するメソッド
		$tmp = new review($arr);
		$this -> review_list[] = $tmp;
	}

	function getJson(){	//現在クラスが保持するuserリストをJSON形式で出力するメソッド
		$data = json_encode($this);
		return($data);
	}
}


?>