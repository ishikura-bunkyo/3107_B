$(function(){
	$("#main_content").ready(function(){

		//呼び出された際のURLパラメータの解析（.../detail.html?id=1などのとき，変数名idの値(1)を取り出す）
		$.urlParam = function(name){
			var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
			if(results != null){
				return results[1] || 0;
			}
			else{
				return 0;
			}
		}

		var url = "http://www.shonan.bunkyo.ac.jp/~学籍番号/フォルダ/review_json.php?";

		var id = $.urlParam('id'); //?id=で指定された紹介対象について
		if(id != 0){
			url += "obj_id="+id;
		}

		$("#obj_id").val(id);

		$.getJSON(url,function(data){ //urlで読み出せるJSONデータ(data)の処理を行う

			$.each(data.review_list, function(index,review){ //JSONデータからレビューを一行ずつ取り出し，HTMLを繰り返し生成

				//※review_json.php側では，最初，新しい方から並び替え，5件を取得するようなSQL文としてある

				var item_html = '<tr>';
				item_html += '<th>'+review.user_name+'</th>';
				item_html += '<td>'+review.text+'</td>';
				item_html += '</tr>';

				$("#review_list").append(item_html);//生成したHTMLを<table id="review_list">～</table>間に追加

			});
		})
		.fail(function(jqXHR, textStatus, errorThrown) { //urlにアクセスできなかった時のエラー処理
    	alert("エラー：" + textStatus+"\n以下のURLにアクセスできませんでした．"+url);
		});
	});
});