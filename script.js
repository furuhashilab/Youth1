// OpenFreeMap のスタイルを使用して3D建物を表現
const styleUrl = 'https://tiles.openfreemap.org/styles/liberty';

const map = new maplibregl.Map({
    container: 'map',
    style: styleUrl,
    center: [-23.5092, 14.9177], // カーボベルデ・プライア
    zoom: 2,
    pitch: 60, // 直下視禁止のため深い角度を設定
    bearing: 0,
    antialias: true
});

// ストーリーシーンの定義
const scenes = [
    {
        title: "歴史的快挙：カーボベルデ代表",
        description: "1975年に独立した人口約50万人の島国が、ついにFIFAワールドカップ2026への切符を手にしました [2]。",
        center: [-23.5092, 14.9177],
        zoom: 4,
        pitch: 65,
        bearing: 0,
        duration: 6000
    },
    {
        title: "「ブルー・シャークス」の誕生",
        description: "代表チームは独立から3年後の1978年に始動。数十年をかけて世界の舞台へ名乗りを上げました [2]。",
        center: [-23.5092, 14.9177],
        zoom: 12,
        pitch: 70,
        bearing: 45,
        duration: 6000
    },
    {
        title: "智将ブビスタ監督",
        description: "元代表主将のブビスタ監督は、強固な守備と鋭いカウンターを武器にチームを導きました [3]。",
        center: [-23.5092, 14.9177],
        zoom: 15,
        pitch: 75,
        bearing: -30,
        duration: 6000
    },
    {
        title: "要塞プライア",
        description: "予選ではホーム5戦5勝、失点ゼロ。本拠地プライアでエスワティニを3-0で破り出場を決めました [4]。",
        center: [-23.5092, 14.9177],
        zoom: 16,
        pitch: 80,
        bearing: 120,
        duration: 6000
    },
    {
        title: "舞台は北米へ：アトランタ",
        description: "本大会、最初の戦いはアメリカ・ジョージア州のアトランタ・スタジアムです [4, 5]。",
        center: [-84.4006, 33.7553],
        zoom: 13,
        pitch: 60,
        bearing: 0,
        duration: 6000
    },
    {
        title: "アトランタ・スタジアム",
        description: "収容人数75,000人。2017年に開場した世界最新鋭のスタジアムで初陣を飾ります [6]。",
        center: [-84.4006, 33.7553],
        zoom: 17,
        pitch: 75,
        bearing: 150,
        duration: 6000
    },
    {
        title: "第1戦：vs スペイン",
        description: "6月15日、強豪スペインと対戦。カーボベルデにとって歴史的なワールドカップ初試合となりました [4, 7]。",
        center: [-84.4006, 33.7553],
        zoom: 18,
        pitch: 80,
        bearing: -45,
        duration: 7000
    },
    {
        title: "第2戦の舞台：マイアミ",
        description: "次なる舞台はマイアミ・スタジアム。ウルグアイとの激戦が待っています [4]。",
        center: [-80.2389, 25.9580],
        zoom: 14,
        pitch: 60,
        bearing: 0,
        duration: 6000
    },
    {
        title: "ウルグアイを止める",
        description: "6月21日、強豪ウルグアイを相手に後半追いつき、2-2の歴史的なドローを演じました [1, 4]。",
        center: [-80.2389, 25.9580],
        zoom: 17,
        pitch: 75,
        bearing: 90,
        duration: 7000
    },
    {
        title: "第3戦：ヒューストン",
        description: "6月26日、グループステージ最終戦。ヒューストンでサウジアラビアと激突します [4]。",
        center: [-95.4082, 29.6847],
        zoom: 14,
        pitch: 60,
        bearing: 0,
        duration: 6000
    },
    {
        title: "新たな伝説の始まり",
        description: "面積4000平方キロメートルの小国が、世界の予想を覆す物語を書き換えています [2, 3]。",
        center: [-95.4082, 29.6847],
        zoom: 17,
        pitch: 80,
        bearing: 200,
        duration: 7000
    }
];

let currentScene = 0;
const popup = new maplibregl.Popup({ closeButton: false, closeOnClick: false });

function playScene() {
    const scene = scenes[currentScene];
    
    map.flyTo({
        center: scene.center,
        zoom: scene.zoom,
        pitch: scene.pitch,
        bearing: scene.bearing,
        essential: true,
        duration: 4000
    });

    document.getElementById('scene-title').innerText = scene.title;
    document.getElementById('scene-description').innerText = scene.description;

    // ポップアップを表示
    popup.setLngLat(scene.center)
        .setHTML(`<strong>${scene.title}</strong>`)
        .addTo(map);

    currentScene = (currentScene + 1) % scenes.length;
    setTimeout(playScene, scene.duration);
}

map.on('load', () => {
    // 3D建物の表示設定
    map.addLayer({
        'id': '3d-buildings',
        'source': 'openmaptiles',
        'source-layer': 'building',
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': ['get', 'render_height'],
            'fill-extrusion-base': ['get', 'render_min_height'],
            'fill-extrusion-opacity': 0.6
        }
    });

    playScene();
});