# むしとり記録 (bug-visits)

家族でのむしとりお出かけ記録。MulmoClaude 上の schema-driven collection として管理していたデータとスキル定義をエクスポートしたもの。

## 🌐 ビューを見る

GitHub Pages で公開中: **https://kzknakajima.github.io/bug-visits/**

- [一覧](https://kzknakajima.github.io/bug-visits/) — お出かけの記録一覧
- [🗺️ 地図](https://kzknakajima.github.io/bug-visits/map.html) — 場所ごとにピン表示
- [🔎 図鑑](https://kzknakajima.github.io/bug-visits/zukan.html) — 捕まえた/見た生き物一覧

`docs/` 以下が公開サイトのソース(`data.json` を fetch して描画する静的版)。MulmoClaude 内で使っていた `skill/views/*.html` は host が注入する `window.__MC_VIEW` に依存するため、GitHub Pages 用に host 非依存の版として書き直したもの。

## 構成

- `data/bug-visits/items/*.json` — お出かけ1回 = 1レコード(MulmoClaude 側の正データ)。日付・場所(名前+緯度経度)・天気・捕まえた生き物/見ただけの生き物・メモを持つ。
- `skill/SKILL.md` — 記録ルール(ワンライン登録の解釈ロジック、生き物名の表記ゆれ辞書、天気の自動入力など)。
- `skill/schema.json` — コレクションのスキーマ定義。
- `skill/views/map.html` / `skill/views/zukan.html` — MulmoClaude アプリ内で使うビュー(host 依存)。
- `docs/` — GitHub Pages で公開する静的サイト(`index.html` / `map.html` / `zukan.html` / `data.json`)。

## レコードの例

```json
{
  "id": "2026-09-22-yashiro-no-mori-koen",
  "date": "2026-09-22",
  "placeName": "やしろの森公園",
  "spotType": "自然公園",
  "lat": 34.909056,
  "lng": 135.03806,
  "weather": "晴れ",
  "catches": [
    { "creature": "爬虫類", "count": 1, "note": "カナヘビ" }
  ],
  "sightings": [
    { "creature": "水辺の生きもの", "count": 1, "note": "アメリカザリガニ" }
  ]
}
```
