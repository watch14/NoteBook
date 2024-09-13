// utils/maps.js

// Hiragana mapping
export const MAP_HIRA = [
  ["kk", "っk"],
  ["gg", "っg"],
  ["ss", "っs"],
  ["zz", "っz"],
  ["jj", "っj"],
  ["tt", "っt"],
  ["cc", "っc"],
  ["dd", "っd"],
  ["hh", "っh"],
  ["ff", "っf"],
  ["bb", "っb"],
  ["pp", "っp"],
  ["mm", "っm"],
  ["rr", "っr"],
  ["ww", "っw"],
  ["yy", "っy"],
  ["ka", "か"],
  ["ki", "き"],
  ["ku", "く"],
  ["ke", "け"],
  ["ko", "こ"],
  ["ga", "が"],
  ["gi", "ぎ"],
  ["gu", "ぐ"],
  ["ge", "げ"],
  ["go", "ご"],
  ["ta", "た"],
  ["ti", "ち"],
  ["chi", "ち"],
  ["tu", "つ"],
  ["tsu", "つ"],
  ["te", "て"],
  ["to", "と"],
  ["da", "だ"],
  ["di", "ぢ"],
  ["du", "づ"],
  ["dzu", "づ"],
  ["de", "で"],
  ["do", "ど"],
  ["sa", "さ"],
  ["shi", "し"],
  ["su", "す"],
  ["se", "せ"],
  ["so", "そ"],
  ["za", "ざ"],
  ["zi", "じ"],
  ["ji", "じ"],
  ["zu", "ず"],
  ["ze", "ぜ"],
  ["zo", "ぞ"],
  ["ba", "ば"],
  ["bi", "び"],
  ["bu", "ぶ"],
  ["be", "べ"],
  ["bo", "ぼ"],
  ["pa", "ぱ"],
  ["pi", "ぴ"],
  ["pu", "ぷ"],
  ["pe", "ぺ"],
  ["po", "ぽ"],
  ["ma", "ま"],
  ["mi", "み"],
  ["mu", "む"],
  ["me", "め"],
  ["mo", "も"],
  ["ra", "ら"],
  ["ri", "り"],
  ["ru", "る"],
  ["re", "れ"],
  ["ro", "ろ"],
  ["wa", "わ"],
  ["wo", "を"],
  ["kya", "きゃ"],
  ["kyi", "きぃ"],
  ["kyu", "きゅ"],
  ["kye", "きぇ"],
  ["kyo", "きょ"],
  ["gya", "ぎゃ"],
  ["gyi", "ぎぃ"],
  ["gyu", "ぎゅ"],
  ["gye", "ぎぇ"],
  ["gyo", "ぎょ"],
  ["sha", "しゃ"],
  ["sya", "しゃ"],
  ["syi", "しぃ"],
  ["shu", "しゅ"],
  ["syu", "しゅ"],
  ["she", "しぇ"],
  ["sye", "しぇ"],
  ["sho", "しょ"],
  ["syo", "しょ"],
  ["jya", "じゃ"],
  ["zya", "じゃ"],
  ["ja", "じゃ"],
  ["jyi", "じぃ"],
  ["zyi", "じぃ"],
  ["jyu", "じゅ"],
  ["zyu", "じゅ"],
  ["ju", "じゅ"],
  ["jye", "じぇ"],
  ["zye", "じぇ"],
  ["je", "じぇ"],
  ["jyo", "じょ"],
  ["zyo", "じょ"],
  ["jo", "じょ"],
  ["cha", "ちゃ"],
  ["tya", "ちゃ"],
  ["tyi", "ちぃ"],
  ["chu", "ちゅ"],
  ["tyu", "ちゅ"],
  ["che", "ちぇ"],
  ["tye", "ちぇ"],
  ["cho", "ちょ"],
  ["tyo", "ちょ"],
  ["dya", "ぢゃ"],
  ["dyi", "ぢぃ"],
  ["dyu", "ぢゅ"],
  ["dye", "ぢぇ"],
  ["dyo", "ぢょ"],
  ["nya", "にゃ"],
  ["nya", "にぃ"],
  ["nyu", "にゅ"],
  ["nye", "にぇ"],
  ["nyo", "にょ"],
  ["hya", "ひゃ"],
  ["hyi", "ひぃ"],
  ["hyu", "ひゅ"],
  ["hye", "ひぇ"],
  ["hyo", "ひょ"],
  ["bya", "びゃ"],
  ["byi", "びぃ"],
  ["byu", "びゅ"],
  ["bye", "びぇ"],
  ["byo", "びょ"],
  ["pya", "ぴゃ"],
  ["pyi", "ぴぃ"],
  ["pyu", "ぴゅ"],
  ["pye", "ぴぇ"],
  ["pyo", "ぴょ"],
  ["mya", "みゃ"],
  ["myi", "みぃ"],
  ["myu", "みゅ"],
  ["mye", "みぇ"],
  ["myo", "みょ"],
  ["rya", "りゃ"],
  ["ryi", "りぃ"],
  ["ryu", "りゅ"],
  ["rye", "りぇ"],
  ["ryo", "りょ"],
  ["ha", "は"],
  ["hi", "ひ"],
  ["hu", "ふ"],
  ["fu", "ふ"],
  ["he", "へ"],
  ["ho", "ほ"],
  ["fa", "ふぁ"],
  ["fi", "ふぃ"],
  ["fe", "ふぇ"],
  ["fo", "ふぉ"],
  ["fya", "ふゃ"],
  ["fyi", "ふぃ"],
  ["fyu", "ふゅ"],
  ["fye", "ふぇ"],
  ["fyo", "ふょ"],
  ["n", "ん"],
  ["んa", "な"],
  ["んi", "に"],
  ["んu", "ぬ"],
  ["んe", "ね"],
  ["んo", "の"],
  ["んya", "にゃ"],
  ["んyi", "にぃ"],
  ["んyu", "にゅ"],
  ["んye", "にぇ"],
  ["んyo", "にょ"],
  ["ya", "や"],
  ["yi", "い"],
  ["yu", "ゆ"],
  ["ye", "いぇ"],
  ["yo", "よ"],
  ["a", "あ"],
  ["i", "い"],
  ["u", "う"],
  ["e", "え"],
  ["o", "お"],
  [".", "。"],
  [",", "、"],
  ["-", "ー"],
];

// Katakana mapping
export const MAP_KATA = [
  ["KK", "ッK"],
  ["GG", "ッG"],
  ["SS", "ッS"],
  ["ZZ", "ッZ"],
  ["JJ", "ッJ"],
  ["TT", "ッT"],
  ["CC", "ッC"],
  ["DD", "ッD"],
  ["HH", "ッH"],
  ["FF", "ッF"],
  ["BB", "ッB"],
  ["PP", "ッP"],
  ["MM", "ッM"],
  ["RR", "ッR"],
  ["WW", "ッW"],
  ["YY", "ッY"],
  ["KA", "カ"],
  ["KI", "キ"],
  ["KU", "ク"],
  ["KE", "ケ"],
  ["KO", "コ"],
  ["GA", "ガ"],
  ["GI", "ギ"],
  ["GU", "グ"],
  ["GE", "ゲ"],
  ["GO", "ゴ"],
  ["TA", "タ"],
  ["TI", "チ"],
  ["CHI", "チ"],
  ["TU", "ツ"],
  ["TSU", "ツ"],
  ["TE", "テ"],
  ["TO", "ト"],
  ["DA", "ダ"],
  ["DI", "ヂ"],
  ["DU", "ヅ"],
  ["DZU", "ヅ"],
  ["DE", "デ"],
  ["DO", "ド"],
  ["SA", "サ"],
  ["SHI", "シ"],
  ["SU", "ス"],
  ["SE", "セ"],
  ["SO", "ソ"],
  ["ZA", "ザ"],
  ["ZI", "ジ"],
  ["JI", "ジ"],
  ["ZU", "ズ"],
  ["ZE", "ゼ"],
  ["ZO", "ゾ"],
  ["BA", "バ"],
  ["BI", "ビ"],
  ["BU", "ブ"],
  ["BE", "ベ"],
  ["BO", "ボ"],
  ["PA", "パ"],
  ["PI", "ピ"],
  ["PU", "プ"],
  ["PE", "ペ"],
  ["PO", "ポ"],
  ["MA", "マ"],
  ["MI", "ミ"],
  ["MU", "ム"],
  ["ME", "メ"],
  ["MO", "モ"],
  ["RA", "ラ"],
  ["RI", "リ"],
  ["RU", "ル"],
  ["RE", "レ"],
  ["RO", "ロ"],
  ["WA", "ワ"],
  ["WO", "ヲ"],
  ["KYA", "キャ"],
  ["KYI", "キィ"],
  ["KYU", "キュ"],
  ["KYE", "キェ"],
  ["KYO", "キョ"],
  ["GYA", "ギャ"],
  ["GYI", "ギィ"],
  ["GYU", "ギュ"],
  ["GYE", "ギェ"],
  ["GYO", "ギョ"],
  ["SHA", "シャ"],
  ["SYA", "シャ"],
  ["SYI", "シィ"],
  ["SHU", "シュ"],
  ["SYU", "シュ"],
  ["SHE", "シェ"],
  ["SYE", "シェ"],
  ["SHO", "ショ"],
  ["SYO", "ショ"],
  ["JYA", "ジャ"],
  ["ZYA", "ジャ"],
  ["JA", "ジャ"],
  ["JYI", "ジィ"],
  ["ZYI", "ジィ"],
  ["JYU", "ジュ"],
  ["ZYU", "ジュ"],
  ["JU", "ジュ"],
  ["JYE", "ジェ"],
  ["ZYE", "ジェ"],
  ["JE", "ジェ"],
  ["JYO", "ジョ"],
  ["ZYO", "ジョ"],
  ["JO", "ジョ"],
  ["CHA", "チャ"],
  ["TYA", "チャ"],
  ["TYI", "チィ"],
  ["CHU", "チュ"],
  ["TYU", "チュ"],
  ["CHE", "チェ"],
  ["TYE", "チェ"],
  ["CHO", "チョ"],
  ["TYO", "チョ"],
  ["DYA", "ヂャ"],
  ["DYI", "ヂィ"],
  ["DYU", "ヂュ"],
  ["DYE", "ヂェ"],
  ["DYO", "ヂョ"],
  ["NYA", "ニャ"],
  ["NYI", "ニィ"],
  ["NYU", "ニュ"],
  ["NYE", "ニェ"],
  ["NYO", "ニョ"],
  ["HYA", "ヒャ"],
  ["HYI", "ヒィ"],
  ["HYU", "ヒュ"],
  ["HYE", "ヒェ"],
  ["HYO", "ヒョ"],
  ["BYA", "ビャ"],
  ["BYI", "ビィ"],
  ["BYU", "ビュ"],
  ["BYE", "ビェ"],
  ["BYO", "ビョ"],
  ["PYA", "ピャ"],
  ["PYI", "ピィ"],
  ["PYU", "ピュ"],
  ["PYE", "ピェ"],
  ["PYO", "ピョ"],
  ["MYA", "ミャ"],
  ["MYI", "ミィ"],
  ["MYU", "ミュ"],
  ["MYE", "ミェ"],
  ["MYO", "ミョ"],
  ["RYA", "リャ"],
  ["RYI", "リィ"],
  ["RYU", "リュ"],
  ["RYE", "リェ"],
  ["RYO", "リョ"],
  ["HA", "ハ"],
  ["HI", "ヒ"],
  ["HU", "フ"],
  ["FU", "フ"],
  ["HE", "ヘ"],
  ["HO", "ホ"],
  ["FA", "ファ"],
  ["FI", "フィ"],
  ["FE", "フェ"],
  ["FO", "フォ"],
  ["FYA", "フャ"],
  ["FYI", "フィ"],
  ["FYU", "フュ"],
  ["FYE", "フェ"],
  ["FYO", "フョ"],
  ["NA", "ナ"],
  ["NI", "ニ"],
  ["NU", "ヌ"],
  ["NE", "ネ"],
  ["NO", "ノ"],
  ["NYA", "ニャ"],
  ["NYI", "ニィ"],
  ["NYU", "ニュ"],
  ["NYE", "ニェ"],
  ["NYO", "ニョ"],
  ["YA", "ヤ"],
  ["YI", "イ"],
  ["YU", "ユ"],
  ["YE", "イェ"],
  ["YO", "ヨ"],
  ["A", "ア"],
  ["I", "イ"],
  ["U", "ウ"],
  ["E", "エ"],
  ["O", "オ"],
  [".", "。"],
  [",", "、"],
  ["-", "ー"],
];
