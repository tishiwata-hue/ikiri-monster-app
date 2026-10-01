import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, 
  Dices, 
  BookOpen, 
  HelpCircle, 
  RefreshCw, 
  Share2, 
  Check, 
  Zap, 
  Award, 
  Flame, 
  ShieldAlert, 
  Trophy,
  Copy,
  ChevronRight,
  RotateCcw,
  Palette,
  Laptop,
  Coffee,
  Briefcase,
  Headphones,
  Eye,
  Plus,
  Wand2,
  Lock,
  Crown,
  Search,
  CheckCircle2,
  XCircle,
  Settings
} from 'lucide-react';

const MONSTERS = [
  {
    id: 'ur-1',
    name: 'スターバックスMAC爆打侍',
    rarity: 'UR',
    habitat: '渋谷・表参道のスタバ窓際席',
    skill: '【必殺技】音速エンターキー一閃',
    quote: '「今日のAgendaセットしてスタバでコミット中」',
    power: 9999,
    description: 'Appleのリンゴマークを周囲に見せつけながら、親の敵のようにエンターキーを爆打するサムライ。打鍵音で周りを威圧する。',
    tip: 'そっとノイズキャンセリングイヤホンを装着し、静かな図書館に避難するのが吉。',
    avatar: {
      faceColor: '#38bdf8',
      hairStyle: 'spiky',
      hairColor: '#f59e0b',
      eyes: 'angry',
      mouth: 'smirk',
      accessory: 'macbook',
      itemColor: '#e2e8f0',
      headgear: 'glasses'
    }
  },
  {
    id: 'ur-2',
    name: '逆質問論破王',
    rarity: 'UR',
    habitat: '最終面接会場・役員控室',
    skill: '【必殺技】御社IRデータ極限深掘りブレイク',
    quote: '「アニュアルレポートの34ページに記載の事業成長率についてですが…」',
    power: 9850,
    description: '役員面接の最後に必ず企業の弱点を突くような鋭すぎる逆質問をして優越感に浸る。実はIRを斜め読みしただけで事業実態は分かっていない。',
    tip: '「素晴らしい視点ですね！」と面接官のフリをして褒めてあげると満足します。',
    avatar: {
      faceColor: '#fb7185',
      hairStyle: 'slick',
      hairColor: '#1e293b',
      eyes: 'sharp',
      mouth: 'laugh',
      accessory: 'suit',
      itemColor: '#3b82f6',
      headgear: 'crown'
    }
  },
  {
    id: 'ssr-1',
    name: 'GDファシリジャック',
    rarity: 'SSR',
    habitat: 'グループディスカッション選考会場',
    skill: '【必殺技】タイムキーパー兼議長強奪アタック',
    quote: '「僕が書記とタイムキーパーやるんで、まず定義付けから行きましょう！」',
    power: 8800,
    description: '開始5秒で司会権を強奪するクラッシャー。他人の発言を「要するにこういうことだよね」と強引に自分の手柄にまとめる。',
    tip: '「〇〇さんの意見も聞いてみましょう！」と進行権限を周囲に分散させよう。',
    avatar: {
      faceColor: '#c084fc',
      hairStyle: 'fade',
      hairColor: '#8b5cf6',
      eyes: 'sparkle',
      mouth: 'open',
      accessory: 'watch',
      itemColor: '#a855f7',
      headgear: 'none'
    }
  },
  {
    id: 'ssr-2',
    name: 'LinkedInコネクト狂魔',
    rarity: 'SSR',
    habitat: 'LinkedIn / X (旧Twitter)',
    skill: '【必殺技】無差別「大変勉強になりました」DMストーム',
    quote: '「〇〇社VPの△△さんとカジュアル面談！学びが深すぎました」',
    power: 8500,
    description: '人事や役員と繋がった実績をSNSで自慢しまくる。プロフィールには「学生団体代表 / 起業準備中 / 26卒」とギッシリ書いてある。',
    tip: 'ミュート機能が最も効果的な特効薬です。',
    avatar: {
      faceColor: '#818cf8',
      hairStyle: 'curly',
      hairColor: '#4f46e5',
      eyes: 'star',
      mouth: 'smile',
      accessory: 'badge',
      itemColor: '#0284c7',
      headgear: 'none'
    }
  },
  {
    id: 'ssr-3',
    name: 'コンサル用語連発男',
    rarity: 'SSR',
    habitat: 'ケース面接・選考コミュニティ',
    skill: '【必殺技】MECE・AsIs/ToBeブレインクラッシュ',
    quote: '「それってボトルネックが解消されてなくない？ロジック崩れてるよ」',
    power: 8300,
    description: 'カタカナ語とコンサルフレームワークを使わないと日常会話すらできない。口癖は「結論から言うと」。',
    tip: '「つまり日本語でどういうこと？」と要約を促すとフリーズします。',
    avatar: {
      faceColor: '#a7f3d0',
      hairStyle: 'slick',
      hairColor: '#059669',
      eyes: 'glasses',
      mouth: 'flat',
      accessory: 'whiteboard',
      itemColor: '#10b981',
      headgear: 'glasses'
    }
  },
  {
    id: 'sr-1',
    name: '早期内定自慢ゴースト',
    rarity: 'SR',
    habitat: '12月頃の大学講義室',
    skill: '【必殺技】「まだ就活やってんの？」精神波',
    quote: '「外資系ITと外銀から内定出たけど、どっちに行くか迷うわ〜」',
    power: 7600,
    description: '頼んでもいないのに自分の早期内定実績をアピールしてくる。周りの不安を煽ることで自己肯定感を爆上げしている。',
    tip: '「すごいね！おめでとう！」と一言だけ言い残して立ち去りましょう。',
    avatar: {
      faceColor: '#67e8f9',
      hairStyle: 'wavy',
      hairColor: '#0284c7',
      eyes: 'smug',
      mouth: 'smirk',
      accessory: 'certificate',
      itemColor: '#38bdf8',
      headgear: 'none'
    }
  },
  {
    id: 'sr-2',
    name: 'OB訪問ミリオンサモナー',
    rarity: 'SR',
    habitat: 'ビズリーチ・キャンパス / Matcher',
    skill: '【必殺技】100人斬り名刺召喚術',
    quote: '「今月でOB訪問50人目！トップ企業のリアルが全部見えてきた」',
    power: 7400,
    description: 'OB訪問の「人数」を競うソーシャルゲームだと勘違いしている。会った社会人の肩書を集めて満足しがち。',
    tip: '「で、企業ごとに具体的に何が違ったの？」と深掘りするとボロが出ます。',
    avatar: {
      faceColor: '#fde047',
      hairStyle: 'spiky',
      hairColor: '#d97706',
      eyes: 'happy',
      mouth: 'open',
      accessory: 'businessCard',
      itemColor: '#f59e0b',
      headgear: 'none'
    }
  },
  {
    id: 'sr-3',
    name: 'ガクチカ盛々キマイラ',
    rarity: 'SR',
    habitat: 'エントリーシート記述欄',
    skill: '【必殺技】前年比売上500%アップ(誇張表現)',
    quote: '「バイト先の居酒屋で業務フロー再構築を行い売上を5倍にしました」',
    power: 7100,
    description: '小さな実績を100倍くらいに拡大解釈して語るキマイラ。面接で深掘りされると徐々に数値の辻褄が合わなくなる。',
    tip: '「具体的にどんな施策で5倍になったの？」と優しく質問してあげましょう。',
    avatar: {
      faceColor: '#fca5a5',
      hairStyle: 'wild',
      hairColor: '#dc2626',
      eyes: 'angry',
      mouth: 'teeth',
      accessory: 'chart',
      itemColor: '#ef4444',
      headgear: 'horns'
    }
  },
  {
    id: 'r-1',
    name: '業界最先端評論家',
    rarity: 'R',
    habitat: 'Web説明会のチャット欄',
    skill: '【必殺技】ニュース解説マウントバズーカ',
    quote: '「今の生成AI市場における御社のWeb3シナジーについてどうお考えですか？」',
    power: 5800,
    description: 'NewsPicksで仕入れた知識で専門家気取りをする。企業説明会の質疑応答チャット欄で難解な質問をして存在感を出す。',
    tip: '静かに温かい目で見守り、スルーするのが大人の対応です。',
    avatar: {
      faceColor: '#a5f3fc',
      hairStyle: 'slick',
      hairColor: '#0891b2',
      eyes: 'glasses',
      mouth: 'flat',
      accessory: 'newspaper',
      itemColor: '#06b6d4',
      headgear: 'glasses'
    }
  },
  {
    id: 'r-2',
    name: '自己分析ディープダイバー',
    rarity: 'R',
    habitat: '静かなカフェ・自分の部屋',
    skill: '【必殺技】自分探しの無限迷宮(ルビ:ラビリンス)',
    quote: '「本当の自分らしさってなんだろう…軸がまたブレてきた」',
    power: 5500,
    description: '自己分析ノートを10冊作成し、モチベーショングラフを描きすぎて原点を見失っている。分析だけで満足してエントリーしない。',
    tip: '「とりあえず1社出してみなよ！」と背中を強く押してあげよう。',
    avatar: {
      faceColor: '#d8b4fe',
      hairStyle: 'messy',
      hairColor: '#7e22ce',
      eyes: 'dots',
      mouth: 'sad',
      accessory: 'notebook',
      itemColor: '#a855f7',
      headgear: 'none'
    }
  },
  {
    id: 'r-3',
    name: 'メンター信奉スライム',
    rarity: 'R',
    habitat: '有料就活コミュニティ・学生団体',
    skill: '【必殺技】「〇〇さんが言ってた」絶対バリア',
    quote: '「優秀な社会人のメンターさんが『君は絶対伸びる』って言ってくれた！」',
    power: 5200,
    description: '就活塾や社会人メンターの教えを絶対視するスライム。自分の考えではなくメンターの受け売り言葉だけで会話する。',
    tip: '高額なコンサル料を払わされていないか優しく心配してあげてください。',
    avatar: {
      faceColor: '#bbf7d0',
      hairStyle: 'round',
      hairColor: '#15803d',
      eyes: 'sparkle',
      mouth: 'smile',
      accessory: 'pendant',
      itemColor: '#22c55e',
      headgear: 'none'
    }
  },
  {
    id: 'r-4',
    name: 'スーツビシッとナイト',
    rarity: 'R',
    habitat: '「服装自由」と書かれたインターン会場',
    skill: '【必殺技】フル装備オーダーメイドアーマー',
    quote: '「ビジネスマナー的に私服可でもリクルートスーツを着るのが常識」',
    power: 4900,
    description: '「私服でお越しください」と案内されているのに、一人だけ最高級スーツでバシッと決めて周りを威圧する騎士。',
    tip: 'ラフなオフィスカジュアルで参加して成果を出す方がカッコいいです。',
    avatar: {
      faceColor: '#cbd5e1',
      hairStyle: 'slick',
      hairColor: '#334155',
      eyes: 'sharp',
      mouth: 'flat',
      accessory: 'suit',
      itemColor: '#475569',
      headgear: 'helmet'
    }
  },
  {
    id: 'n-1',
    name: 'カタカナ語誤用ポーン',
    rarity: 'N',
    habitat: '面接控え室・GD現場',
    skill: '【必殺技】雰囲気だけで語る「アジリティ」',
    quote: '「この議論のアジリティを高めるためにコンセンサスをとりましょう！」',
    power: 3200,
    description: 'カタカナビジネス用語を使いたがるが微妙に意味を間違えているポーン。指摘されると急に口数が減る可愛い一面も。',
    tip: '「それどういう意味？」と問い詰めず、そっと流してあげるのが優しさ。',
    avatar: {
      faceColor: '#fed7aa',
      hairStyle: 'bowl',
      hairColor: '#ea580c',
      eyes: 'confused',
      mouth: 'open',
      accessory: 'dictionary',
      itemColor: '#f97316',
      headgear: 'none'
    }
  },
  {
    id: 'n-2',
    name: '過度な謙虚マウント',
    rarity: 'N',
    habitat: '選考終了後の雑談タイム',
    skill: '【必殺技】「全然対策してない〜」ブレイク',
    quote: '「え〜私全然ES書いてないしノー勉だよ〜（添削20回済み）」',
    power: 2800,
    description: 'テスト前に「全然勉強してない」と言うタイプのモンスター。実は陰で死ぬほど練習を重ねている努力家イキリ。',
    tip: '「努力家だね！」と素直に褒めてあげると喜んで素直になります。',
    avatar: {
      faceColor: '#fef08a',
      hairStyle: 'pigtails',
      hairColor: '#ca8a04',
      eyes: 'shy',
      mouth: 'sweat',
      accessory: 'pen',
      itemColor: '#eab308',
      headgear: 'none'
    }
  },
  {
    id: 'n-3',
    name: '企業理念同化ノビス',
    rarity: 'N',
    habitat: '一次面接会場',
    skill: '【必殺技】クレド丸暗記オウム返し',
    quote: '「御社のクレド第3条にある『圧倒的当事者意識』に深く共感しました！」',
    power: 2100,
    description: '企業のホームページに書いてある言葉を丸暗記して復唱する。自分の実体験と結びついていないため浅さがバレる。',
    tip: '自分の言葉で語る面接の練習相手になってあげましょう。',
    avatar: {
      faceColor: '#e2e8f0',
      hairStyle: 'plain',
      hairColor: '#64748b',
      eyes: 'dots',
      mouth: 'flat',
      accessory: 'paper',
      itemColor: '#94a3b8',
      headgear: 'none'
    }
  },
  {
    id: 'n-4',
    name: 'Webテスト画面二刀流',
    rarity: 'N',
    habitat: '自宅のデスク環境',
    skill: '【必殺技】デュアルディスプレイ爆速検索',
    quote: '「Webテストは知識量じゃなくて検索のアジリティが勝負」',
    power: 1900,
    description: 'Webテスト時にディスプレイを2台並べ、問題文を爆速で検索窓に打ち込む職人。本来の地力は鍛えられていない。',
    tip: '監視型Webテストの導入で戦々恐々としています。',
    avatar: {
      faceColor: '#ddd6fe',
      hairStyle: 'messy',
      hairColor: '#6d28d9',
      eyes: 'glasses',
      mouth: 'open',
      accessory: 'monitor',
      itemColor: '#8b5cf6',
      headgear: 'headphones'
    }
  }
];

const DIAGNOSIS_QUESTIONS = [
  {
    id: 1,
    question: "カフェで就活作業やES作成をする時、どこに座る？",
    options: [
      { text: "スタバのガラス張り窓際席でMacBookとタンブラーをアピール", type: "ur" },
      { text: "電源とWi-Fiが完璧な席でノイキャンイヤホンを装着し集中", type: "ssr" },
      { text: "カフェの端っこの席で静かに自己分析ノートを開く", type: "r" },
      { text: "カフェはお金がかかるので大学の図書館か自分の部屋", type: "n" }
    ]
  },
  {
    id: 2,
    question: "グループディスカッション（GD）が始まった直後のあなたの行動は？",
    options: [
      { text: "「僕が司会兼タイムキーパーやるんで、まず定義付けから行きましょう！」", type: "ssr" },
      { text: "「今回の問いのボトルネックと前提条件を論理的に揃えませんか？」", type: "ur" },
      { text: "周囲の様子を見ながらアイデア出しや書記のサポートに回る", type: "sr" },
      { text: "とりあえず頷いて周りの意見に同意しまくる", type: "n" }
    ]
  },
  {
    id: 3,
    question: "SNS（X/LinkedIn）での発信や就活垢の使い方について",
    options: [
      { text: "「〇〇社役員と面談！」など、繋がった社会人実績をバシバシ投下", type: "ur" },
      { text: "「今日の学び」や最新のケース問題の解法・ニュース考察をポスト", type: "ssr" },
      { text: "情報収集メインの見る専で、たまに選考速報をチェックする程度", type: "r" },
      { text: "就活アカウントすら作っていない / 鍵アカウントのみ", type: "n" }
    ]
  },
  {
    id: 4,
    question: "面接で「最後に何か逆質問はありますか？」と聞かれたら？",
    options: [
      { text: "企業のIR資料や最新の競合比較を交えた鋭すぎる深掘り質問をする", type: "ur" },
      { text: "「活躍している社員の共通点と、入社までに学ぶべきスキルは？」", type: "sr" },
      { text: "「御社で働く上で一番やりがいを感じる瞬間を教えてください」", type: "r" },
      { text: "「特にありません」または当たり障りのない質問を短くする", type: "n" }
    ]
  },
  {
    id: 5,
    question: "会話でついつい使ってしまう用語や口癖は？",
    options: [
      { text: "「アジリティ」「コミット」「ボトルネック」「シナジー」「MECE」", type: "ssr" },
      { text: "「結論から言うと」「ファクトベースで語ると」", type: "ur" },
      { text: "「〇〇さんが言ってたんだけど〜」「軸がブレてて〜」", type: "r" },
      { text: "「え〜全然対策してなくてヤバい〜」「なんとかなる」", type: "n" }
    ]
  }
];

const RARITY_STYLES = {
  UR: {
    bg: 'bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600',
    border: 'border-amber-400',
    badge: 'bg-gradient-to-r from-amber-300 to-yellow-500 text-amber-950 font-black',
    glow: 'shadow-[0_0_30px_rgba(251,191,36,0.6)]',
    text: 'text-amber-300',
    cardBg: 'from-amber-950/80 via-slate-900 to-slate-950'
  },
  SSR: {
    bg: 'bg-gradient-to-r from-purple-600 to-indigo-600',
    border: 'border-purple-400',
    badge: 'bg-purple-500 text-white font-bold',
    glow: 'shadow-[0_0_22px_rgba(168,85,247,0.5)]',
    text: 'text-purple-300',
    cardBg: 'from-purple-950/80 via-slate-900 to-slate-950'
  },
  SR: {
    bg: 'bg-gradient-to-r from-blue-600 to-cyan-600',
    border: 'border-blue-400',
    badge: 'bg-blue-500 text-white font-bold',
    glow: 'shadow-[0_0_18px_rgba(59,130,246,0.4)]',
    text: 'text-blue-300',
    cardBg: 'from-blue-950/80 via-slate-900 to-slate-950'
  },
  R: {
    bg: 'bg-gradient-to-r from-emerald-600 to-teal-600',
    border: 'border-emerald-400',
    badge: 'bg-emerald-500 text-white font-bold',
    glow: 'shadow-[0_0_14px_rgba(16,185,129,0.3)]',
    text: 'text-emerald-300',
    cardBg: 'from-emerald-950/80 via-slate-900 to-slate-950'
  },
  N: {
    bg: 'bg-gradient-to-r from-slate-600 to-slate-700',
    border: 'border-slate-400',
    badge: 'bg-slate-400 text-slate-900 font-bold',
    glow: 'shadow-[0_0_10px_rgba(148,163,184,0.2)]',
    text: 'text-slate-300',
    cardBg: 'from-slate-900 via-slate-900 to-slate-950'
  }
};

const MonsterAvatar = ({ config, className = "w-32 h-32" }) => {
  const {
    faceColor = '#38bdf8',
    hairStyle = 'spiky',
    hairColor = '#f59e0b',
    eyes = 'angry',
    mouth = 'smirk',
    accessory = 'macbook',
    itemColor = '#3b82f6',
    headgear = 'none'
  } = config || {};

  return (
    <svg viewBox="0 0 120 120" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`glow-${faceColor.replace('#', '')}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={faceColor} stopOpacity="0.3" />
          <stop offset="100%" stopColor={faceColor} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Aura Glow */}
      <circle cx="60" cy="60" r="50" fill={`url(#glow-${faceColor.replace('#', '')})`} />

      {/* Body / Torso */}
      <path d="M 35 95 C 35 75, 85 75, 85 95 Z" fill={itemColor} />
      
      {/* Tie / Suit details if applicable */}
      {accessory === 'suit' && (
        <path d="M 55 80 L 60 95 L 65 80 Z" fill="#ef4444" />
      )}

      {/* Face Base */}
      <circle cx="60" cy="55" r="28" fill={faceColor} stroke="#0f172a" strokeWidth="2.5" />

      {/* Hair Styles */}
      {hairStyle === 'spiky' && (
        <path d="M 32 45 L 38 25 L 48 35 L 60 20 L 72 35 L 82 25 L 88 45 Z" fill={hairColor} stroke="#0f172a" strokeWidth="2" />
      )}
      {hairStyle === 'slick' && (
        <path d="M 32 50 C 32 25, 88 25, 88 50 C 80 32, 40 32, 32 50 Z" fill={hairColor} stroke="#0f172a" strokeWidth="2" />
      )}
      {hairStyle === 'fade' && (
        <path d="M 34 40 C 35 25, 85 25, 86 40 L 88 48 C 70 38, 50 38, 32 48 Z" fill={hairColor} stroke="#0f172a" strokeWidth="2" />
      )}
      {hairStyle === 'curly' && (
        <g fill={hairColor} stroke="#0f172a" strokeWidth="1.5">
          <circle cx="40" cy="32" r="8" />
          <circle cx="52" cy="28" r="9" />
          <circle cx="68" cy="28" r="9" />
          <circle cx="80" cy="32" r="8" />
        </g>
      )}
      {hairStyle === 'wild' && (
        <path d="M 30 52 L 25 30 L 40 35 L 45 15 L 60 30 L 75 15 L 80 35 L 95 30 L 90 52 Z" fill={hairColor} stroke="#0f172a" strokeWidth="2" />
      )}

      {/* Eyes */}
      {eyes === 'angry' && (
        <g stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round">
          <line x1="42" y1="46" x2="52" y2="52" />
          <line x1="78" y1="46" x2="68" y2="52" />
          <circle cx="47" cy="53" r="3" fill="#0f172a" />
          <circle cx="73" cy="53" r="3" fill="#0f172a" />
        </g>
      )}
      {eyes === 'sharp' && (
        <g fill="#0f172a">
          <polygon points="42,48 54,50 44,54" />
          <polygon points="78,48 66,50 76,54" />
        </g>
      )}
      {eyes === 'sparkle' && (
        <g fill="#f59e0b">
          <polygon points="47,46 49,52 55,54 49,56 47,62 45,56 39,54 45,52" />
          <polygon points="73,46 75,52 81,54 75,56 73,62 71,56 65,54 71,52" />
        </g>
      )}
      {eyes === 'glasses' && (
        <g stroke="#0f172a" strokeWidth="2" fill="none">
          <rect x="38" y="46" width="16" height="12" rx="3" fill="#ffffff" fillOpacity="0.4" />
          <rect x="66" y="46" width="16" height="12" rx="3" fill="#ffffff" fillOpacity="0.4" />
          <line x1="54" y1="52" x2="66" y2="52" strokeWidth="2" />
        </g>
      )}
      {eyes === 'smug' && (
        <g stroke="#0f172a" strokeWidth="2.5" fill="none">
          <path d="M 40 52 Q 47 46 54 52" />
          <path d="M 66 52 Q 73 46 80 52" />
        </g>
      )}
      {eyes === 'dots' && (
        <g fill="#0f172a">
          <circle cx="46" cy="52" r="3" />
          <circle cx="74" cy="52" r="3" />
        </g>
      )}

      {/* Mouth */}
      {mouth === 'smirk' && (
        <path d="M 48 66 Q 60 70 72 62" stroke="#0f172a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      )}
      {mouth === 'laugh' && (
        <path d="M 45 64 Q 60 78 75 64 Z" fill="#ef4444" stroke="#0f172a" strokeWidth="2" />
      )}
      {mouth === 'open' && (
        <ellipse cx="60" cy="66" rx="8" ry="6" fill="#0f172a" />
      )}
      {mouth === 'flat' && (
        <line x1="48" y1="66" x2="72" y2="66" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
      )}
      {mouth === 'teeth' && (
        <rect x="46" y="62" width="28" height="8" rx="2" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
      )}

      {/* Accessories (Held / Foreground) */}
      {accessory === 'macbook' && (
        <g transform="translate(30, 80)">
          <rect x="0" y="0" width="60" height="25" rx="3" fill="#cbd5e1" stroke="#0f172a" strokeWidth="2" />
          <path d="M 25 10 A 5 5 0 0 1 35 10 C 35 15, 25 15, 25 10" fill="#64748b" />
          <line x1="0" y1="20" x2="60" y2="20" stroke="#0f172a" strokeWidth="1.5" />
        </g>
      )}
      {accessory === 'coffee' && (
        <g transform="translate(75, 70)">
          <rect x="0" y="0" width="18" height="26" rx="2" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
          <rect x="-2" y="0" width="22" height="6" rx="1" fill="#065f46" />
          <circle cx="9" cy="14" r="4" fill="#065f46" />
        </g>
      )}
      {accessory === 'businessCard' && (
        <g transform="translate(70, 70) rotate(-15)">
          <rect x="0" y="0" width="28" height="18" rx="1" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
          <line x1="4" y1="5" x2="16" y2="5" stroke="#3b82f6" strokeWidth="2" />
          <line x1="4" y1="10" x2="22" y2="10" stroke="#94a3b8" strokeWidth="1" />
        </g>
      )}

      {/* Headgear */}
      {headgear === 'crown' && (
        <polygon points="42,26 48,10 60,20 72,10 78,26" fill="#f59e0b" stroke="#0f172a" strokeWidth="2" />
      )}
      {headgear === 'headphones' && (
        <g stroke="#0f172a" strokeWidth="3" fill="none">
          <path d="M 30 55 A 32 32 0 0 1 90 55" />
          <rect x="24" y="48" width="10" height="18" rx="3" fill="#3b82f6" />
          <rect x="86" y="48" width="10" height="18" rx="3" fill="#3b82f6" />
        </g>
      )}
      {headgear === 'horns' && (
        <g fill="#ef4444" stroke="#0f172a" strokeWidth="2">
          <path d="M 38 30 Q 25 15 20 28 Q 30 32 38 35 Z" />
          <path d="M 82 30 Q 95 15 100 28 Q 90 32 82 35 Z" />
        </g>
      )}
    </svg>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('gacha'); // 'gacha' | 'diagnosis' | 'custom' | 'pokedex'
  const [collectedIds, setCollectedIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [obtainedMonster, setObtainedMonster] = useState(null);
  
  // Gacha states
  const [gachaEpisode, setGachaEpisode] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // Diagnosis states
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [diagnosisAnswers, setDiagnosisAnswers] = useState([]);

  // Custom Monster Creator states
  const [customName, setCustomName] = useState('マイ・イキリ・ドッペルゲンガー');
  const [customRarity, setCustomRarity] = useState('UR');
  const [customQuote, setCustomQuote] = useState('「それって本質的じゃないよね？」');
  const [customPower, setCustomPower] = useState(8888);
  const [customAvatar, setCustomAvatar] = useState({
    faceColor: '#38bdf8',
    hairStyle: 'spiky',
    hairColor: '#f59e0b',
    eyes: 'angry',
    mouth: 'smirk',
    accessory: 'macbook',
    itemColor: '#3b82f6',
    headgear: 'none'
  });

  // Toast / Share feedback
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Load unlocked pokedex from local storage
  useEffect(() => {
    const saved = localStorage.getItem('ikiri_pokedex_v2');
    if (saved) {
      try {
        setCollectedIds(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse pokedex:', e);
      }
    } else {
      // Default unlock 1 monster so pokedex isn't completely empty
      setCollectedIds(['n-1']);
    }
  }, []);

  // Save to pokedex
  const saveToPokedex = (monsterId) => {
    setCollectedIds((prev) => {
      if (!prev.includes(monsterId)) {
        const next = [...prev, monsterId];
        localStorage.setItem('ikiri_pokedex_v2', JSON.stringify(next));
        return next;
      }
      return prev;
    });
  };

  const handleRunGacha = () => {
    setIsLoading(true);
    
    const steps = [
      'イキリ波動を測定中...',
      'スタバのカタカナ語密度を解析中...',
      'GDでのファシリ奪取率を計算中...',
      'マウント波形を検知...',
      'モンスター召喚完了！'
    ];
    let idx = 0;
    setLoadingText(steps[0]);
    const timer = setInterval(() => {
      idx++;
      if (idx < steps.length) {
        setLoadingText(steps[idx]);
      }
    }, 450);

    setTimeout(() => {
      clearInterval(timer);
      
      let candidatePool = [...MONSTERS];
      if (gachaEpisode.trim()) {
        const ep = gachaEpisode.toLowerCase();
        if (ep.includes('スタバ') || ep.includes('mac') || ep.includes('カフェ')) {
          candidatePool = MONSTERS.filter(m => m.id === 'ur-1' || m.rarity === 'UR');
        } else if (ep.includes('逆質問') || ep.includes('面接') || ep.includes('ir')) {
          candidatePool = MONSTERS.filter(m => m.id === 'ur-2' || m.rarity === 'SSR');
        } else if (ep.includes('gd') || ep.includes('グループ') || ep.includes('司会')) {
          candidatePool = MONSTERS.filter(m => m.id === 'ssr-1');
        }
      }

      // Rarity Roll
      const rand = Math.random() * 100;
      let targetRarity = 'N';
      if (rand < 10) targetRarity = 'UR';
      else if (rand < 28) targetRarity = 'SSR';
      else if (rand < 52) targetRarity = 'SR';
      else if (rand < 76) targetRarity = 'R';

      let pool = candidatePool.filter(m => m.rarity === targetRarity);
      if (pool.length === 0) pool = MONSTERS;

      const selected = pool[Math.floor(Math.random() * pool.length)];
      setObtainedMonster(selected);
      saveToPokedex(selected.id);
      setIsLoading(false);
    }, 2200);
  };

  const handleAnswerQuestion = (type) => {
    const nextAnswers = [...diagnosisAnswers, type];
    setDiagnosisAnswers(nextAnswers);

    if (currentQuestionIndex + 1 < DIAGNOSIS_QUESTIONS.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsLoading(true);
      setLoadingText('あなたの隠れイキリ度をディープ解析中...');
      
      setTimeout(() => {
        const counts = { ur: 0, ssr: 0, sr: 0, r: 0, n: 0 };
        nextAnswers.forEach(t => counts[t] = (counts[t] || 0) + 1);

        let maxType = 'n';
        let maxVal = -1;
        Object.entries(counts).forEach(([t, count]) => {
          if (count > maxVal) {
            maxVal = count;
            maxType = t;
          }
        });

        const matchedRarity = maxType.toUpperCase();
        const pool = MONSTERS.filter(m => m.rarity === matchedRarity);
        const selected = pool[Math.floor(Math.random() * pool.length)] || MONSTERS[0];

        setObtainedMonster(selected);
        saveToPokedex(selected.id);
        setIsLoading(false);
      }, 2200);
    }
  };

  const resetDiagnosis = () => {
    setCurrentQuestionIndex(0);
    setDiagnosisAnswers([]);
    setObtainedMonster(null);
  };

  // Generate Custom Monster Object
  const handleSaveCustomMonster = () => {
    const newMonster = {
      id: `custom-${Date.now()}`,
      name: customName || '名無しのイキリ',
      rarity: customRarity,
      habitat: '現実世界とSNSの狭間',
      skill: '【必殺技】自作オリジナル・イキリ砲',
      quote: customQuote,
      power: Number(customPower) || 7777,
      description: 'ユーザーが自ら作り出した究極のドッペルゲンガー。意識の高さと個性が合体している。',
      tip: '温かい目で自分自身を見つめ直してみましょう。',
      avatar: customAvatar
    };
    setObtainedMonster(newMonster);
  };

  // Copy share text
  const handleShare = () => {
    if (!obtainedMonster) return;
    const text = `【就活イキリモンスター図鑑】\n診断・ガチャ結果：『${obtainedMonster.name}』（レア度: ${obtainedMonster.rarity} / マウント力: ${obtainedMonster.power}）\n口癖：${obtainedMonster.quote}\n#就活イキリモンスター図鑑 #就活あるある`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Filtered Pokedex Monsters
  const filteredMonsters = useMemo(() => {
    return MONSTERS.filter(m => 
      m.name.includes(searchTerm) || 
      m.description.includes(searchTerm) || 
      m.rarity.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col items-center p-3 sm:p-6 selection:bg-cyan-500 selection:text-slate-950">
      
      {}
      <header className="w-full max-w-3xl text-center my-4 sm:my-6">
        <div className="inline-flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-full px-4 py-1.5 text-xs sm:text-sm text-cyan-400 mb-3 shadow-inner">
          <Sparkles className="w-4 h-4 animate-pulse text-amber-400" />
          <span className="font-semibold">周囲の意識高い系発言・マウントを笑いに昇華！</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-md">
          就活イキリモンスター図鑑
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-2">
          診断 & ガチャで生息する「意識高い系モンスター」を収集しよう！
        </p>

        {/* Collection Counter Card */}
        <div className="mt-4 flex items-center justify-center">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl px-5 py-2.5 flex items-center gap-4 shadow-xl">
            <Trophy className="w-6 h-6 text-amber-400 shrink-0" />
            <div className="text-left">
              <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">図鑑コンプリート率</div>
              <div className="text-sm font-bold text-slate-200">
                <span className="text-cyan-400 text-lg font-black">{collectedIds.length}</span> / {MONSTERS.length} 種獲得中
              </div>
            </div>
            <div className="w-24 sm:w-36 bg-slate-800 h-3 rounded-full overflow-hidden border border-slate-700">
              <div 
                className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 h-full transition-all duration-500" 
                style={{ width: `${(collectedIds.length / MONSTERS.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {}
      <nav className="w-full max-w-2xl grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 mb-6 shadow-xl">
        <button
          onClick={() => { setActiveTab('gacha'); setObtainedMonster(null); }}
          className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'gacha'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Dices className="w-4 h-4" />
          <span>イキリガチャ</span>
        </button>
        <button
          onClick={() => { setActiveTab('diagnosis'); resetDiagnosis(); }}
          className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'diagnosis'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>イキリ診断</span>
        </button>
        <button
          onClick={() => { setActiveTab('custom'); setObtainedMonster(null); }}
          className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'custom'
              ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Wand2 className="w-4 h-4" />
          <span>自作モンスター</span>
        </button>
        <button
          onClick={() => { setActiveTab('pokedex'); setObtainedMonster(null); }}
          className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'pokedex'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>モンスター図鑑</span>
        </button>
      </nav>

      {/* Main Content Body */}
      <main className="w-full max-w-2xl flex-1 flex flex-col items-center">
        
        {}
        {activeTab === 'gacha' && !obtainedMonster && !isLoading && (
          <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col gap-5">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                目撃したイキリエピソードを鑑定（または即ガチャ）
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                「カフェで大声でアジリティを連発していた」等、身の回りの投稿・発言を入力してみよう！
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-300">エピソード入力 (任意)</label>
              <textarea
                value={gachaEpisode}
                onChange={(e) => setGachaEpisode(e.target.value)}
                placeholder="例: グループディスカッションで開始3秒で『僕タイムキーパーやります』と言って他人の発言を遮ってきた"
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-300">頻出タグ</label>
              <div className="flex flex-wrap gap-2">
                {['#グループディスカッション', '#スタバ窓際', '#逆質問マウント', '#内定報告', '#カタカナ語連発'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      selectedTag === tag
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleRunGacha}
              className="mt-2 w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white font-extrabold text-base sm:text-lg shadow-lg hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group"
            >
              <Dices className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
              <span>イキリモンスターを召喚する！</span>
            </button>
          </div>
        )}

        {}
        {activeTab === 'diagnosis' && !obtainedMonster && !isLoading && (
          <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col gap-5">
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700">
              <div
                className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / DIAGNOSIS_QUESTIONS.length) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">
                Question {currentQuestionIndex + 1} / {DIAGNOSIS_QUESTIONS.length}
              </span>
              <span className="text-xs text-slate-500">隠れイキリ度診断</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-100 leading-relaxed">
              {DIAGNOSIS_QUESTIONS[currentQuestionIndex].question}
            </h3>

            <div className="flex flex-col gap-3 mt-1">
              {DIAGNOSIS_QUESTIONS[currentQuestionIndex].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerQuestion(opt.type)}
                  className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left text-xs sm:text-sm text-slate-200 hover:border-purple-500 hover:bg-purple-950/20 active:scale-[0.99] transition-all flex items-center justify-between group"
                >
                  <span className="pr-2">{opt.text}</span>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {}
        {activeTab === 'custom' && !obtainedMonster && !isLoading && (
          <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col gap-6">
            <div className="border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Palette className="w-5 h-5 text-pink-400" />
                オリジナル・イキリモンスターをデザイン
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                自分や友達をイキリモンスター化してカードを生成しよう！
              </p>
            </div>

            {/* Live Preview Avatar */}
            <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="flex flex-col items-center gap-2">
                <MonsterAvatar config={customAvatar} className="w-32 h-32" />
                <span className="text-[10px] text-slate-500">リアルタイムアバター</span>
              </div>

              <div className="flex-1 w-full flex flex-col gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-400">モンスター名</label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-pink-500 mt-1"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400">決まり文句・口癖</label>
                  <input
                    type="text"
                    value={customQuote}
                    onChange={(e) => setCustomQuote(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-pink-500 mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Customizer Controls */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-400 font-bold block mb-1">顔の色</label>
                <div className="flex gap-1.5 flex-wrap">
                  {['#38bdf8', '#fb7185', '#c084fc', '#fde047', '#a7f3d0', '#cbd5e1'].map(color => (
                    <button
                      key={color}
                      onClick={() => setCustomAvatar({...customAvatar, faceColor: color})}
                      className={`w-6 h-6 rounded-full border ${customAvatar.faceColor === color ? 'ring-2 ring-white scale-110' : ''}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-bold block mb-1">髪型</label>
                <select
                  value={customAvatar.hairStyle}
                  onChange={(e) => setCustomAvatar({...customAvatar, hairStyle: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-200"
                >
                  <option value="spiky">ツンツンヘア</option>
                  <option value="slick">七三オールバック</option>
                  <option value="fade">マッシュフェード</option>
                  <option value="curly">パーマヘア</option>
                  <option value="wild">爆発ヘア</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 font-bold block mb-1">目つき</label>
                <select
                  value={customAvatar.eyes}
                  onChange={(e) => setCustomAvatar({...customAvatar, eyes: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-200"
                >
                  <option value="angry">鋭い眼光</option>
                  <option value="sharp">自信満々</option>
                  <option value="sparkle">キラキラ</option>
                  <option value="glasses">インテリメガネ</option>
                  <option value="smug">ドヤ顔</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 font-bold block mb-1">持ち物・アイテム</label>
                <select
                  value={customAvatar.accessory}
                  onChange={(e) => setCustomAvatar({...customAvatar, accessory: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-slate-200"
                >
                  <option value="macbook">MacBook</option>
                  <option value="coffee">スタバタンブラー</option>
                  <option value="businessCard">大量の名刺</option>
                  <option value="suit">オーダースーツ</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleSaveCustomMonster}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-extrabold text-sm shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <Wand2 className="w-5 h-5" />
              <span>カードを生成する</span>
            </button>
          </div>
        )}

        {}
        {isLoading && (
          <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-2xl flex flex-col items-center justify-center gap-6 min-h-[340px]">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-slate-800 border-t-cyan-400 border-r-purple-500 border-b-amber-400 border-l-rose-500 animate-spin" />
              <Zap className="w-10 h-10 text-amber-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce" />
            </div>
            <div className="text-center flex flex-col gap-2">
              <p className="text-base font-bold text-slate-100 animate-pulse">{loadingText}</p>
              <p className="text-xs text-slate-500">意識の高さをエネルギーに変換中...</p>
            </div>
          </div>
        )}

        {}
        {obtainedMonster && !isLoading && (
          <div className="w-full flex flex-col items-center gap-5 animate-in fade-in zoom-in duration-300">
            {/* Trading Card Container */}
            <div className={`w-full max-w-md bg-gradient-to-b ${RARITY_STYLES[obtainedMonster.rarity]?.cardBg || RARITY_STYLES.N.cardBg} border-2 ${RARITY_STYLES[obtainedMonster.rarity]?.border || RARITY_STYLES.N.border} rounded-3xl p-6 shadow-2xl ${RARITY_STYLES[obtainedMonster.rarity]?.glow || ''} relative overflow-hidden flex flex-col gap-4`}>
              
              {/* Card Rarity Badge & ID Header */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 z-10">
                <span className={`px-3 py-1 rounded-full text-xs uppercase ${RARITY_STYLES[obtainedMonster.rarity]?.badge || RARITY_STYLES.N.badge}`}>
                  {obtainedMonster.rarity}
                </span>
                <span className="text-xs text-slate-400 font-mono">No. {obtainedMonster.id}</span>
              </div>

              {/* Monster Avatar Graphic */}
              <div className="flex justify-center my-1 z-10">
                <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-2xl shadow-inner">
                  <MonsterAvatar config={obtainedMonster.avatar} className="w-36 h-36" />
                </div>
              </div>

              {/* Monster Title & Quote */}
              <div className="text-center z-10">
                <h3 className={`text-2xl font-black ${RARITY_STYLES[obtainedMonster.rarity]?.text || 'text-slate-200'} tracking-tight`}>
                  {obtainedMonster.name}
                </h3>
                <p className="text-xs text-slate-300 italic mt-2 bg-slate-950/80 py-2 px-3 rounded-xl border border-slate-800">
                  {obtainedMonster.quote}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 text-xs z-10">
                <div className="bg-slate-950/90 p-2.5 rounded-xl border border-slate-800 flex flex-col">
                  <span className="text-[10px] text-slate-500">生息地</span>
                  <span className="font-semibold text-slate-300 mt-0.5 truncate">{obtainedMonster.habitat}</span>
                </div>
                <div className="bg-slate-950/90 p-2.5 rounded-xl border border-slate-800 flex flex-col">
                  <span className="text-[10px] text-slate-500">マウント力 (攻撃力)</span>
                  <span className="font-bold text-amber-400 mt-0.5 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-amber-400" />
                    {obtainedMonster.power.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Special Skill */}
              <div className="bg-slate-950/90 p-3 rounded-xl border border-slate-800 z-10">
                <div className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">SPECIAL SKILL</div>
                <div className="text-xs sm:text-sm font-bold text-slate-200 mt-0.5">{obtainedMonster.skill}</div>
              </div>

              {/* Description */}
              <div className="text-xs text-slate-300 leading-relaxed bg-slate-950/50 p-3 rounded-xl border border-slate-800/80 z-10">
                <p className="font-semibold text-slate-400 text-[10px] mb-1">【生態】</p>
                {obtainedMonster.description}
              </div>

              {/* Advice */}
              <div className="text-xs text-cyan-300 bg-cyan-950/40 border border-cyan-900/60 p-3 rounded-xl flex items-start gap-2 z-10">
                <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">対処法・アドバイス: </span>
                  {obtainedMonster.tip}
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3 mt-1 z-10">
                <button
                  onClick={handleShare}
                  className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-bold border border-slate-700 transition-all flex items-center justify-center gap-1.5"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'コピー完了！' : '結果をシェア'}</span>
                </button>
                <button
                  onClick={() => {
                    setObtainedMonster(null);
                    if (activeTab === 'diagnosis') resetDiagnosis();
                  }}
                  className="py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 hover:brightness-110"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>もう一度引く</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {}
        {activeTab === 'pokedex' && (
          <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-400" />
                  イキリモンスター図鑑
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">全{MONSTERS.length}種類のカードリスト</p>
              </div>

              {/* Search filter */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="モンスター名で検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 w-full sm:w-48"
                />
              </div>
            </div>

            {/* Grid display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredMonsters.map((monster) => {
                const isUnlocked = collectedIds.includes(monster.id);

                return (
                  <div
                    key={monster.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col gap-3 relative overflow-hidden ${
                      isUnlocked
                        ? 'bg-slate-950 border-slate-800 hover:border-slate-700'
                        : 'bg-slate-950/40 border-slate-900 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-black ${
                        isUnlocked ? RARITY_STYLES[monster.rarity]?.badge : 'bg-slate-800 text-slate-500'
                      }`}>
                        {monster.rarity}
                      </span>
                      <span className="text-[10px] text-slate-600 font-mono">No. {monster.id}</span>
                    </div>

                    {isUnlocked ? (
                      <div className="flex items-center gap-3">
                        <MonsterAvatar config={monster.avatar} className="w-16 h-16 shrink-0 bg-slate-900 rounded-xl border border-slate-800 p-1" />
                        <div className="flex flex-col min-w-0">
                          <h4 className="text-sm font-bold text-slate-200 truncate">{monster.name}</h4>
                          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{monster.quote}</p>
                          <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                            <span>マウント力: {monster.power}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center py-5 gap-3 text-slate-600">
                        <Lock className="w-5 h-5" />
                        <span className="text-xs font-semibold">未解放のイキリ</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      <footer className="mt-12 text-center text-xs text-slate-600 pb-6">
        <p>© 就活イキリモンスター図鑑 & イキリ診断 - 面接の緊張を笑いに変えよう！</p>
      </footer>
    </div>
  );
}
