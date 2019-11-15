$(function(){
	$("main").ready(function(){

		//呼び出された際のURLパラメータの解析（.../list.html?id=1などのとき，変数名idの値(1)を取り出す）
		$.urlParam = function(name){
			var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
			if(results != null){
				return results[1] || 0;
			}
			else{
				return 0;
			}
		}

		var url = "http://www.shonan.bunkyo.ac.jp/~学籍番号/各グループのリポジトリ名/data.json";

		var q = decodeURIComponent($.urlParam('q')); //?q=検索語で指定されたとき
		var category = decodeURIComponent$.urlParam('category')); //?category=カテゴリ名で指定されたとき
		//qやcategoryなどでの検索する場合は，以下の表示HTML作成の処理にif文を追加する

		$.getJSON(url,function(data){ //urlで読み出せるJSONデータ(data)の処理を行う
			var num=0; //項目の数を数える（featuretteでは奇数，偶数で表示を変えるため）
			$.each(data.introduction_obj_list, function(index,elem){ //JSONデータから繰り返し内容部分のHTMLを繰り返し生成

				var item_html='<hr class="featurette-divider">';
				item_html += '<div class="row featurette">';
				item_html += '<div class="col-md-7">';
				item_html += '<h2 class="featurette-heading bg-lightblue">';
				item_html += '<a href="./detail.html?id='+elem.id+'">';
				item_html += elem.title; //紹介対象のなまえ
				item_html += '</a></h2>';
				item_html += '<p class="lead">';
				item_html += elem.abstract; //概要説明（施設や場所・授業→紹介文，料理など→価格）</p>
				item_html += '</div>';
				item_html += '<div class="col-md-5">';
				item_html += '<img class="featurette-image img-fluid mx-auto" src="./photos/';//画像はphotosフォルダに置く
				item_html += elem.image_file;
				item_html += '.jpg" alt="'+elem.title+'のサムネイル画像">';
				item_html += '</div>';
				item_html += '</div>';

				$("#list_content").append(item_html);//生成したHTMLを<div id="main_content">～</div>間に追加
				num++;
			});
		})
		.fail(function(jqXHR, textStatus, errorThrown) { //urlにアクセスできなかった時のエラー処理
    	alert("エラー：" + textStatus+"\n以下のURLにアクセスできませんでした．readJSON_list.jsの中のurlの値を変更してください．"+url);
		});
	});
});
