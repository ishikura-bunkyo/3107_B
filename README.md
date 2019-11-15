# 2019年度「プロジェクト演習A」
## 課題プロジェクト(2)テンプレート

このリポジトリ（スターターキット）にすでにあるファイルは，課題プロジェクト(2)のひな型ファイルです．

### ファイルの一覧
- README.md：このファイル
- .gitignore：Gitの管理対象外のファイルやフォルダを指定（今回の初期設定ではdb_def.phpとphotosフォルダを除外）
- list_example.html：全施設（あるいはカテゴリ毎）を一覧して紹介するためのWebページのひな型HTMLファイル（別名で保存し，git add後，編集したらgit commitする（あるいはリポジトリのWebページからupload））
- detail_example.html：各施設を紹介するためのWebページのひな型HTMLファイル（別名で保存し，git add後，編集したらgit commitする（あるいはリポジトリのWebページからupload））
- detail_review_example.html：各施設をレビューを付けて紹介するためのWebページのひな型HTMLファイル（別名で保存し，git add後，編集したらgit commitする（あるいはリポジトリのWebページからupload））
- レビュー機能を利用するためのPHPスクリプトなど
  - db_def.php.sample：データベース接続設定のためのファイル（レビュー機能を利用する場合にdb_def.phpとして名前を付けて保存し，編集）
  - review_class.php：レビューを表示するために個々のレビューに相当するクラスとレビュー全体をJSON化するPHPスクリプト（編集不要）
  - review_json.php：レビューを表示するためにレビューのコメントをJSON化して取得するPHPスクリプト（編集不要）→レビュー機能を利用する場合はこのPHPファイルの動作を確認する
  - review_reg.php：レビューを登録するためのPHPスクリプト
  - その他PHPスクリプトに関する説明は，レビュー機能を利用したい場合に参考にする
- js/フォルダ
  - js/readJSON_list.js：各グループが作成した（あるいはオープンデータから取得した）データを用いて，施設を紹介する（カテゴリなどの）一覧ページに書き込むJavaScriptプログラム（要編集）
  - js/readJSON_detail.js：各グループが作成した（あるいはオープンデータから取得した）データを用いて，，各施設を紹介するページに書き込むJavaScriptプログラム（要編集）
  - js/readLinkDataJSON_list.js：LinkData.orgから取得したRDF/JSON形式のデータを用いて，施設を紹介する（カテゴリなどの）一覧ページに書き込むJavaScriptプログラム（要編集）
  - js/readLinkDataJSON_detail.js：LinkData.orgから取得したRDF/JSON形式のデータを用いて，各施設を紹介するページに書き込むJavaScriptプログラム（要編集）
  - js/insert_review.js：レビュー掲示機能（review_json.phpからの出力をWebページに書き込む）
- css/フォルダ
  - css/ProA_style.css：各チームで装飾を行うCSSファイル（課題プロジェクト(1)で作成したファイルに上書きすること）
  - css/star-rating.css：評価（☆の数）を表示するためのCSSファイル（編集不要）
