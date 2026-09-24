# むしとり記録 (bug-visits)

家族でのむしとりお出かけ記録。MulmoClaude 上の schema-driven collection として管理していたデータとスキル定義をエクスポートしたもの。

## 構成

- `data/bug-visits/items/*.json` — お出かけ1回 = 1レコード。日付・場所(名前+緯度経度)・天気・捕まえた生き物/見ただけの生き物・メモを持つ。
- `skill/SKILL.md` — 記録ルール(ワンライン登録の解釈ロジック、生き物名の表記ゆれ辞書、天気の自動入力など)。
- `skill/schema.json` — コレクションのスキーマ定義。
- `skill/views/map.html` — 場所ごとにピンを表示する地図ビュー。
- `skill/views/zukan.html` — 捕まえた/見た生き物を種類ごとにまとめる図鑑ビュー。

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
