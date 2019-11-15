$(function(){
	$("main").ready(function(){

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

		//各施設に関する情報をデータから読み取って詳細な紹介をするページのHTMLファイル名
		var detail_page_html = "detail_example.html"; //?id=1等と付けて各施設のデータを読み取るようにすること

		//LinkData.orgからJSON(P)を取得するURLは，各データセットの”その他の形式のAPIリストを表示”から
		//”その他のAPI”→RDF/JSONのURLをコピー＆貼り付けし，?callback=?を加える
		//　例：var url = "http://linkdata.org/api/1/rdf1s2833i/fujisawa_shogakkou_rdf.json?callback=?";
		var url = "http://linkdata.org/api/から始まるRDF/JSON形式のURL?callback=?";//←各チームの企画によって変更！
		var resource_uri = "http://linkdata.org/resource/rdf1s2833i"; //データIDにあたるURLの部分をここに書く
		var label_uri ="http://www.w3.org/2000/01/rdf-schema#label"; //ラベルとなっている項目のURI(変更の必要なし）
		var addr_uri ="http://purl.org/jrrk#address"; //住所の項目を取り出すためのURI
		var phone_uri = "http://schema.org/telephone"; //電話番号の項目を取り出すためのURI
		var lat_uri = "http://www.w3.org/2003/01/geo/wgs84_pos#lat"; //緯度の項目を取り出すためのURI
		var lng_uri = "http://www.w3.org/2003/01/geo/wgs84_pos#long"; //経度の項目を取り出すためのURI
		//各データに従って取り出す項目のURIを追加・削除する

		$.getJSON(url,function(data){ //urlで読み出せるJSONデータ(data)の処理を行う
			var num=1; //項目の数を数える（独自のJSONは0から始まるので，データを作成，あるいは取り出す際注意！）
			var resource_id = resource_uri+"#"+num;
			do{
				var instance = data[resource_id]
				//データから必要な項目を取り出す（※データによって異なるため，調整が必要）
				var title = instance[label_uri][1].value
				var address = instance[addr_uri][0].value
				var region = instance[label_uri][2].value
				var phone_number = instance[phone_uri][0].value
				//var image_url = instance[image_uri][0].value//オープンデータに画像が含まれる場合などに値を読み取る
				
				//表示用のHTMLを生成
				var item_html='<hr class="featurette-divider">';
				item_html += '<div class="row featurette">';
				item_html += '<div class="col-md-7 offset-md-1">'; //左に寄せるときはoffset-mdを外す
				item_html += '<h2 class="featurette-heading bg-lightblue">';
				var id = num -1; //idの値はLinkData.orgのデータから-1する（ローカルデータの番号と合わせるため）
				item_html += '<a href="./'+detail_page_html+'?id='+id+'">';
				item_html += title; //紹介対象のなまえ
				item_html += '</a></h2>';
				item_html += '<p class="lead">';
				item_html += '住所：'+address; //住所に関する文字列をデータから取得して表示
				item_html += '</p>';
				item_html += '<p>';
				item_html += '地域：'+region; //住所に関する文字列をデータから取得して表示
				item_html += '</p>';
				item_html += '</div>';
				item_html += '<div class="col-md-3">';
				//item_html += '<img class="featurette-image img-fluid mx-auto" src="';
				//item_html += image_file;
				//item_html += '" alt="'+title+'のサムネイル画像">';
				item_html += '電話番号：'+phone_number;
				item_html += '</div>';
				item_html += '</div>';
				$("#list_content").append(item_html);//生成したHTMLを<div id="main_content">～</div>間に追加

				num++;
				resource_id = resource_uri+"#"+num;
			} while (data[resource_id]);
		})
		.fail(function(jqXHR, textStatus, errorThrown) { //urlにアクセスできなかった時のエラー処理
    	alert("エラー：" + textStatus+"\n以下のURLにアクセスできませんでした．readLinkDataJSON_list.jsの中のurlの値を変更してください．"+url);
		});
	});
});
