$(function(){
	$("#main_content").ready(function(){ //<div id="main_content">~</div>の読み込みが完了したら

		//呼び出された際のURLパラメータの解析（.../detail1.html?id=1などのとき，変数名idの値(1)を取り出す）※テンプレートの時点では使っていない
		$.urlParam = function(name){
			var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
			if(results != null){
				return results[1] || 0;
			}
			else{
				return 0;
			}
		}

		var id = 0; //URLに?id=番号を付けて読み込む
		id = parseInt($.urlParam('id')); //?id=Nで指定されたとき

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

		$.getJSON(url,function(data){ //urlの文字列のURLからidまたはqで指定した値を持つJSONオブジェクトを取得

			//?id=で指定された番号のデータを取り出す
			var num = id+1;
			//
			var resource_id = resource_uri+"#"+num;//「テーブルデータの内容」で一番左の列の値となるように文字列を作成
			var instance = data[resource_id]
			//データから必要な項目を取り出す（※データによって異なるため，調整が必要）
			var title = instance[label_uri][1].value
			var address = instance[addr_uri][0].value
			address = '住所：'+address;
			var region = instance[label_uri][2].value
			var phone_number = instance[phone_uri][0].value
			var detail = "地域："+region+'<br />'; //詳細説明のHTML文字列をデータの値から作成
			detail += '電話番号：'+phone_number+'<br />';
			var lat = instance[lat_uri][0].value //【注意】urlに入っている「藤沢市小学校一覧」では間違った値が入っている
			var lng = instance[lng_uri][0].value //【注意】urlに入っている「藤沢市小学校一覧」では間違った値が入っている
			//var image_url = instance[][0].value//オープンデータに画像が含まれる場合などに値を読み取る

			if($("main").get(0)){ //<main>～</main>があったら

				$("head > title").text(title); //<head><title>～</title></head>の間の～のところ（文字列）を変更
				$("h1.jumbotron-heading").text(title); //<h1 class="jumbotron">～</h1>の間の～のところ（文字列）を変更
				if($("h2").get(0)){ //<h2>のタグがあったら(すべてのh2タグが変更されるので，必要に応じてidで区別する)
					$("h2").text(title);
				}

				//<img id="thumnail_img">タグのsrcの値をサムネイル画像のファイルに設定（photosフォルダに”画像名_thum.jpg”があるとする）
				//$("img#thumnail_img").attr("src","./photos/"+obj.image_file+"_thum.jpg");

				if($("p#abstract").get(0)){ //<p id="abstract"></p>のタグがあったら
					$("p#abstract").text(address); //abstractの値を変更
				}

				if($("p#detail").get(0)){//<p id="detail"></p>のタグがあったら
					$("p#detail").html(detail); //detailの値を変更
				}

				/*

				if($("div#image_list").get(0)){//<div id="image_list">のタグがあったら

					if(obj.image_file1 != null && obj.image_file1!=""){
						var img1_tag = '<a href="./photos/'+obj.image_file1+'.jpg" data-lightbox="image-list">';
						img1_tag += '<img src="./photos/'+obj.image_file1+'_thum.jpg" class="col-3 mb-5 box-shadow"/></a>';
						$("div#image_list").append(img1_tag);
					}

					if(obj.image_file2 != null && obj.image_file2!=""){
						var img2_tag = '<a href="./photos/'+obj.image_file2+'.jpg" data-lightbox="image-list">';
						img2_tag += '<img src="./photos/'+obj.image_file2+'_thum.jpg" class="col-3 mb-5 box-shadow"/></a>';
						$("div#image_list").append(img2_tag);
					}

					if(obj.image_file3 != null && obj.image_file3!=""){
						var img3_tag = '<a href="./photos/'+obj.image_file3+'.jpg" data-lightbox="image-list">';
						img3_tag += '<img src="./photos/'+obj.image_file3+'_thum.jpg" class="col-3 mb-5 box-shadow"/></a>';
						$("div#image_list").append(img3_tag);
					}

				 }
				 */
				/*

				if($("div.star-rating").get(0)){//<div class="star-rating">のタグがあったら
					if(obj.score != null){
						var font_size_str = $("div.star-rating").css("font-size");
						var font_size = font_size_str.match(/\d+/)[0]; //○○pxの○○（数字の部分を抜き出す）
						var width = (obj.score / 5.0) *font_size*5; //px値にする(5は満点)
					  $("div.star-rating-front").attr("style","width: "+width+"px"); //scoreの値をstar-rating-frontのstyle="width: ○○%"の値とする
					}
				}
				*/

				if($("#map_here").get(0)){//<div id="map_here">のタグがあったら
					//leaflet.jsを使ってOpen Street Mapを表示する
					// 地図のデフォルトの緯度経度(35.369744, 139.415493)と拡大率(拡大レベル16)
					var map = L.map('map_here').setView([lat, lng], 16);//map_hereはidの値
 
					// 描画する(Copyrightは消しちゃダメよ)
					L.tileLayer(
						'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
						{ attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }
					).addTo(map);

					//マーカーを地図に追加する
					L.marker([lat, lng]).addTo(map);

				}

			}
			else{
				alert('<main>のタグは消さないでください．');
			}

		})
		.fail(function(jqXHR, textStatus, errorThrown) { //urlにアクセスできなかった時のエラー処理
			alert("エラー：" + textStatus+"\n以下のURLにアクセスできませんでした．readLinkDataJSON_detail.jsの中のurlの値を変更してください．"+url);
		});
	});
});


