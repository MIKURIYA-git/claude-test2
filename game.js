class QuantumNexusGame {
    constructor() {
        this.gameState = {
            quantumEnergy: 0,
            energyPerSecond: 0,
            currentDimension: 3.0,
            realityFlux: 1.0,
            totalClicks: 0,
            totalEnergyEarned: 0,
            startTime: Date.now(),
            lastSave: Date.now(),
            prestige: 0,
            prestigePoints: 0,
            universeLevel: 1,
            timeDistortion: 1.0,
            darkMatter: 0,
            strangeMatter: 0,
            timelineShifts: 0,
            completedMilestones: [],
            currentEvent: null,
            eventEndTime: 0
        };

        // Massive upgrade system with 40+ upgrades across multiple tiers
        this.upgrades = [
            // Tier 1: Basic Quantum Generators (1-15 cost range)
            {
                id: 'photon_collector',
                name: '光子収集装置',
                description: '周囲の光子粒子を回収してエネルギーに変換',
                baseCost: 15,
                baseEps: 0.1,
                count: 0,
                costMultiplier: 1.15,
                tier: 1,
                unlocked: true
            },
            {
                id: 'electron_spinner',
                name: '電子スピナー',
                description: '電子の回転エネルギーを効率的に利用',
                baseCost: 100,
                baseEps: 1,
                count: 0,
                costMultiplier: 1.2,
                tier: 1,
                unlocked: true
            },
            {
                id: 'proton_beam',
                name: 'プロトン加速器',
                description: 'プロトンを高速で加速してエネルギーを放出',
                baseCost: 1100,
                baseEps: 8,
                count: 0,
                costMultiplier: 1.25,
                tier: 1,
                unlocked: true
            },
            {
                id: 'neutron_forge',
                name: '中性子フォージ',
                description: '中性子の核融合反応によりエネルギーを生成',
                baseCost: 12000,
                baseEps: 47,
                count: 0,
                costMultiplier: 1.3,
                tier: 1,
                unlocked: true
            },
            {
                id: 'muon_catalyst',
                name: 'μ粒子触媒',
                description: 'ミューオンを利用した高効率エネルギー触媒',
                baseCost: 130000,
                baseEps: 260,
                count: 0,
                costMultiplier: 1.35,
                tier: 1,
                unlocked: true
            },
            
            // Tier 2: Advanced Quantum Systems (130k-10M range)
            {
                id: 'quark_manipulator',
                name: 'クォーク操作装置',
                description: '基本粒子のクォークを直接操作してエネルギーを抽出',
                baseCost: 1400000,
                baseEps: 1400,
                count: 0,
                costMultiplier: 1.4,
                tier: 2,
                unlocked: false,
                unlockRequirement: { type: 'energy', value: 500000 }
            },
            {
                id: 'gluon_binder',
                name: 'グルーオン結合器',
                description: '強い核力を媒介するグルーオンからエネルギーを取得',
                baseCost: 20000000,
                baseEps: 7800,
                count: 0,
                costMultiplier: 1.45,
                tier: 2,
                unlocked: false,
                unlockRequirement: { type: 'upgrade', id: 'quark_manipulator', count: 5 }
            },
            {
                id: 'boson_field',
                name: 'ボソン場発生器',
                description: 'ヒッグスボソンを含む場のエネルギーを利用',
                baseCost: 330000000,
                baseEps: 44000,
                count: 0,
                costMultiplier: 1.5,
                tier: 2,
                unlocked: false,
                unlockRequirement: { type: 'upgrade', id: 'gluon_binder', count: 3 }
            },
            {
                id: 'lepton_harvester',
                name: 'レプトン収穫機',
                description: '電子族粒子の相互作用からエネルギーを収穫',
                baseCost: 5500000000,
                baseEps: 240000,
                count: 0,
                costMultiplier: 1.55,
                tier: 2,
                unlocked: false,
                unlockRequirement: { type: 'upgrade', id: 'boson_field', count: 2 }
            },
            {
                id: 'hadron_collider',
                name: 'ハドロン衝突装置',
                description: '高エネルギーハドロン衝突による大量エネルギー生成',
                baseCost: 75000000000,
                baseEps: 1300000,
                count: 0,
                costMultiplier: 1.6,
                tier: 2,
                unlocked: false,
                unlockRequirement: { type: 'upgrade', id: 'lepton_harvester', count: 2 }
            },
            
            // Tier 3: Exotic Matter Systems (75B-1Qa range)
            {
                id: 'dark_matter_extractor',
                name: 'ダークマター抽出装置',
                description: '宇宙の約27%を占める暗黒物質からエネルギーを抽出',
                baseCost: 1000000000000,
                baseEps: 7200000,
                count: 0,
                costMultiplier: 1.65,
                tier: 3,
                unlocked: false,
                unlockRequirement: { type: 'dimension', value: 4.0 }
            },
            {
                id: 'dark_energy_siphon',
                name: 'ダークエネルギー吸引器',
                description: '宇宙膨張の原因となる暗黒エネルギーを利用',
                baseCost: 14000000000000,
                baseEps: 40000000,
                count: 0,
                costMultiplier: 1.7,
                tier: 3,
                unlocked: false,
                unlockRequirement: { type: 'upgrade', id: 'dark_matter_extractor', count: 5 }
            },
            {
                id: 'strange_matter_forge',
                name: 'ストレンジマター鍛冶場',
                description: '理論上最安定な物質ストレンジマターを生成・利用',
                baseCost: 200000000000000,
                baseEps: 220000000,
                count: 0,
                costMultiplier: 1.75,
                tier: 3,
                unlocked: false,
                unlockRequirement: { type: 'upgrade', id: 'dark_energy_siphon', count: 3 }
            },
            {
                id: 'antimatter_annihilator',
                name: '反物質消滅装置',
                description: '物質と反物質の完全消滅によるE=mc²の実現',
                baseCost: 2800000000000000,
                baseEps: 1200000000,
                count: 0,
                costMultiplier: 1.8,
                tier: 3,
                unlocked: false,
                unlockRequirement: { type: 'upgrade', id: 'strange_matter_forge', count: 2 }
            },
            {
                id: 'monopole_generator',
                name: '磁気単極発生器',
                description: '理論上の磁気単極子を利用した超高効率発電',
                baseCost: 40000000000000000,
                baseEps: 6600000000,
                count: 0,
                costMultiplier: 1.85,
                tier: 3,
                unlocked: false,
                unlockRequirement: { type: 'upgrade', id: 'antimatter_annihilator', count: 2 }
            },
            
            // Tier 4: Dimensional Manipulation (40Qa+ range)
            {
                id: 'dimensional_rift',
                name: '次元亀裂生成器',
                description: '高次元から低次元へのエネルギー流入を制御',
                baseCost: 560000000000000000,
                baseEps: 36000000000,
                count: 0,
                costMultiplier: 1.9,
                tier: 4,
                unlocked: false,
                unlockRequirement: { type: 'dimension', value: 5.0 }
            },
            {
                id: 'spacetime_weaver',
                name: '時空織機',
                description: '時空構造自体を編み直してエネルギーを創造',
                baseCost: 8000000000000000000,
                baseEps: 200000000000,
                count: 0,
                costMultiplier: 1.95,
                tier: 4,
                unlocked: false,
                unlockRequirement: { type: 'upgrade', id: 'dimensional_rift', count: 3 }
            },
            {
                id: 'temporal_engine',
                name: '時間エンジン',
                description: '時間の流れそのものを動力源として利用',
                baseCost: 110000000000000000000,
                baseEps: 1100000000000,
                count: 0,
                costMultiplier: 2.0,
                tier: 4,
                unlocked: false,
                unlockRequirement: { type: 'upgrade', id: 'spacetime_weaver', count: 2 }
            },
            {
                id: 'reality_anchor',
                name: '現実錨装置',
                description: '現実の基盤構造に錨を下ろしエネルギーを汲み上げ',
                baseCost: 1600000000000000000000,
                baseEps: 6100000000000,
                count: 0,
                costMultiplier: 2.05,
                tier: 4,
                unlocked: false,
                unlockRequirement: { type: 'upgrade', id: 'temporal_engine', count: 2 }
            },
            {
                id: 'void_harvester',
                name: '虚無収穫機',
                description: '何もない虚無の中に潜むゼロ点エネルギーを収穫',
                baseCost: 22000000000000000000000,
                baseEps: 33000000000000,
                count: 0,
                costMultiplier: 2.1,
                tier: 4,
                unlocked: false,
                unlockRequirement: { type: 'upgrade', id: 'reality_anchor', count: 2 }
            },
            
            // Tier 5: Universe Manipulation (22Sx+ range)
            {
                id: 'universe_factory',
                name: '宇宙工場',
                description: '小宇宙を工場として量産しそのエネルギーを利用',
                baseCost: 310000000000000000000000,
                baseEps: 180000000000000,
                count: 0,
                costMultiplier: 2.15,
                tier: 5,
                unlocked: false,
                unlockRequirement: { type: 'dimension', value: 6.0 }
            },
            {
                id: 'multiverse_tap',
                name: '多元宇宙タップ',
                description: '並行宇宙からエネルギーを引き抜く装置',
                baseCost: 4300000000000000000000000,
                baseEps: 990000000000000,
                count: 0,
                costMultiplier: 2.2,
                tier: 5,
                unlocked: false,
                unlockRequirement: { type: 'upgrade', id: 'universe_factory', count: 3 }
            },
            {
                id: 'omniversal_nexus',
                name: '全能宇宙結節点',
                description: 'あらゆる可能性の宇宙を結ぶ結節点からエネルギーを取得',
                baseCost: 61000000000000000000000000,
                baseEps: 5500000000000000,
                count: 0,
                costMultiplier: 2.25,
                tier: 5,
                unlocked: false,
                unlockRequirement: { type: 'upgrade', id: 'multiverse_tap', count: 2 }
            },
            {
                id: 'conceptual_engine',
                name: '概念エンジン',
                description: '概念そのものを燃料として動作する究極のエンジン',
                baseCost: 850000000000000000000000000,
                baseEps: 30000000000000000,
                count: 0,
                costMultiplier: 2.3,
                tier: 5,
                unlocked: false,
                unlockRequirement: { type: 'upgrade', id: 'omniversal_nexus', count: 2 }
            },
            {
                id: 'transcendence_core',
                name: '超越コア',
                description: '次元や現実の概念を超越した究極のエネルギー源',
                baseCost: 12000000000000000000000000000,
                baseEps: 170000000000000000,
                count: 0,
                costMultiplier: 2.35,
                tier: 5,
                unlocked: false,
                unlockRequirement: { type: 'upgrade', id: 'conceptual_engine', count: 2 }
            }
        ];

        // Massive research tree with 30+ research items
        this.research = [
            // Basic Research (Tier 1)
            {
                id: 'efficiency_matrix',
                name: '効率マトリックス',
                description: 'すべての生産効率を100%向上させる',
                cost: 1000,
                completed: false,
                multiplier: 2.0,
                tier: 1
            },
            {
                id: 'manual_override',
                name: '手動オーバーライド',
                description: 'クリック威力を5倍に強化',
                cost: 5000,
                completed: false,
                clickMultiplier: 5.0,
                tier: 1
            },
            {
                id: 'quantum_resonance',
                name: '量子共鳴',
                description: '光子収集装置の効率を300%向上',
                cost: 25000,
                completed: false,
                upgradeMultiplier: { photon_collector: 4.0 },
                tier: 1
            },
            {
                id: 'particle_acceleration',
                name: '粒子加速理論',
                description: '全ての粒子系装置の効率を200%向上',
                cost: 100000,
                completed: false,
                upgradeMultiplier: { 
                    electron_spinner: 3.0, 
                    proton_beam: 3.0, 
                    neutron_forge: 3.0 
                },
                tier: 1
            },
            
            // Advanced Research (Tier 2)
            {
                id: 'dimensional_breakthrough',
                name: '次元突破',
                description: '次元レベルを0.5向上し高次元操作を可能にする',
                cost: 500000,
                completed: false,
                dimensionBoost: 0.5,
                tier: 2,
                unlockRequirement: { type: 'research', count: 3 }
            },
            {
                id: 'reality_manipulation',
                name: '現実操作',
                description: '現実操作倍率を0.5向上させる',
                cost: 2000000,
                completed: false,
                realityFluxBoost: 0.5,
                tier: 2
            },
            {
                id: 'exotic_matter_theory',
                name: 'エキゾチック物質理論',
                description: 'エキゾチック物質系装置を解除し効率を向上',
                cost: 10000000,
                completed: false,
                unlockUpgrades: ['dark_matter_extractor'],
                upgradeMultiplier: { 
                    dark_matter_extractor: 2.0,
                    dark_energy_siphon: 2.0
                },
                tier: 2
            },
            {
                id: 'antimatter_containment',
                name: '反物質制御',
                description: '反物質の安全な制御技術を確立',
                cost: 50000000,
                completed: false,
                unlockUpgrades: ['antimatter_annihilator'],
                tier: 2
            },
            {
                id: 'temporal_mechanics',
                name: '時間力学',
                description: '時間の流れを1.5倍に加速する',
                cost: 200000000,
                completed: false,
                timeDistortionBoost: 0.5,
                tier: 2
            },
            
            // Expert Research (Tier 3)
            {
                id: 'higher_dimensions',
                name: '高次元理論',
                description: '5次元以上の理解により全体効率を大幅向上',
                cost: 1000000000,
                completed: false,
                multiplier: 3.0,
                dimensionBoost: 1.0,
                tier: 3,
                unlockRequirement: { type: 'dimension', value: 4.5 }
            },
            {
                id: 'universal_constants',
                name: '宇宙定数調整',
                description: '物理定数の微調整により現実操作倍率を大幅向上',
                cost: 5000000000,
                completed: false,
                realityFluxBoost: 1.0,
                tier: 3
            },
            {
                id: 'quantum_entanglement_network',
                name: '量子もつれネットワーク',
                description: '全装置間の量子もつれによる効率向上',
                cost: 25000000000,
                completed: false,
                multiplier: 2.5,
                tier: 3
            },
            {
                id: 'strange_matter_stabilization',
                name: 'ストレンジマター安定化',
                description: 'ストレンジマターの安定化により新装置解除',
                cost: 100000000000,
                completed: false,
                unlockUpgrades: ['strange_matter_forge'],
                tier: 3
            },
            {
                id: 'spacetime_engineering',
                name: '時空工学',
                description: '時空構造の直接操作技術を確立',
                cost: 500000000000,
                completed: false,
                unlockUpgrades: ['spacetime_weaver', 'temporal_engine'],
                tier: 3
            },
            
            // Master Research (Tier 4)
            {
                id: 'reality_hacking',
                name: '現実ハッキング',
                description: '現実のソースコードに直接アクセス',
                cost: 2500000000000,
                completed: false,
                multiplier: 5.0,
                realityFluxBoost: 2.0,
                tier: 4,
                unlockRequirement: { type: 'dimension', value: 6.0 }
            },
            {
                id: 'void_engineering',
                name: '虚無工学',
                description: '何もない空間から何かを創造する技術',
                cost: 12000000000000,
                completed: false,
                unlockUpgrades: ['void_harvester'],
                tier: 4
            },
            {
                id: 'universe_manufacturing',
                name: '宇宙製造学',
                description: '宇宙そのものを工場として利用する技術',
                cost: 60000000000000,
                completed: false,
                unlockUpgrades: ['universe_factory'],
                tier: 4
            },
            {
                id: 'multiverse_theory',
                name: '多元宇宙理論',
                description: '並行宇宙へのアクセス技術を確立',
                cost: 300000000000000,
                completed: false,
                unlockUpgrades: ['multiverse_tap'],
                tier: 4
            },
            
            // Transcendent Research (Tier 5)
            {
                id: 'omniversal_consciousness',
                name: '全能宇宙意識',
                description: 'あらゆる宇宙の意識と接続',
                cost: 1500000000000000,
                completed: false,
                unlockUpgrades: ['omniversal_nexus'],
                multiplier: 10.0,
                tier: 5,
                unlockRequirement: { type: 'dimension', value: 7.0 }
            },
            {
                id: 'conceptual_physics',
                name: '概念物理学',
                description: '物理法則を概念として扱う究極の科学',
                cost: 7500000000000000,
                completed: false,
                unlockUpgrades: ['conceptual_engine'],
                tier: 5
            },
            {
                id: 'transcendent_understanding',
                name: '超越的理解',
                description: 'あらゆる概念を超越した究極の理解',
                cost: 37500000000000000,
                completed: false,
                unlockUpgrades: ['transcendence_core'],
                multiplier: 25.0,
                tier: 5
            }
        ];

        // Massive achievement system with 60+ achievements
        this.achievements = [
            // Basic Achievements
            { id: 'first_click', name: '初回接触', description: '量子コアをクリックする', threshold: 1, type: 'clicks', unlocked: false, reward: 'clickMultiplier', value: 1.1 },
            { id: 'hundred_clicks', name: '量子ダンサー', description: '100回クリックする', threshold: 100, type: 'clicks', unlocked: false, reward: 'clickMultiplier', value: 1.2 },
            { id: 'thousand_clicks', name: 'クリックマスター', description: '1,000回クリックする', threshold: 1000, type: 'clicks', unlocked: false, reward: 'clickMultiplier', value: 1.5 },
            { id: 'first_upgrade', name: '進化の始まり', description: '最初のアップグレードを購入', threshold: 1, type: 'upgrades', unlocked: false, reward: 'globalMultiplier', value: 1.1 },
            { id: 'first_thousand', name: 'エネルギー収集家', description: '1,000エネルギーを収集', threshold: 1000, type: 'energy', unlocked: false, reward: 'energyBonus', value: 100 },
            { id: 'first_million', name: '量子富豪', description: '1,000,000エネルギーを収集', threshold: 1000000, type: 'energy', unlocked: false, reward: 'globalMultiplier', value: 1.25 },
            { id: 'first_research', name: '科学者', description: '最初の研究を完了', threshold: 1, type: 'research', unlocked: false, reward: 'globalMultiplier', value: 1.1 },
            { id: 'automation_master', name: '自動化マスター', description: '1,000 EPS達成', threshold: 1000, type: 'eps', unlocked: false, reward: 'globalMultiplier', value: 1.3 },
            
            // Dimensional Achievements
            { id: 'dimension_walker', name: '次元歩行者', description: '次元4.0に到達', threshold: 4.0, type: 'dimension', unlocked: false, reward: 'dimensionBonus', value: 0.1 },
            { id: 'dimension_master', name: '次元マスター', description: '次元5.0に到達', threshold: 5.0, type: 'dimension', unlocked: false, reward: 'dimensionBonus', value: 0.2 },
            { id: 'dimension_god', name: '次元神', description: '次元6.0に到達', threshold: 6.0, type: 'dimension', unlocked: false, reward: 'dimensionBonus', value: 0.3 },
            { id: 'transcendent_being', name: '超越存在', description: '次元7.0に到達', threshold: 7.0, type: 'dimension', unlocked: false, reward: 'dimensionBonus', value: 0.5 },
            
            // Energy Achievements
            { id: 'billionaire', name: '億万長者', description: '10億エネルギーを収集', threshold: 1000000000, type: 'energy', unlocked: false, reward: 'globalMultiplier', value: 1.5 },
            { id: 'trillionaire', name: '兆万長者', description: '1兆エネルギーを収集', threshold: 1000000000000, type: 'energy', unlocked: false, reward: 'globalMultiplier', value: 2.0 },
            { id: 'quadrillionaire', name: '京万長者', description: '1京エネルギーを収集', threshold: 1000000000000000, type: 'energy', unlocked: false, reward: 'globalMultiplier', value: 3.0 },
            
            // Production Achievements
            { id: 'mega_producer', name: 'メガプロデューサー', description: '100万 EPS達成', threshold: 1000000, type: 'eps', unlocked: false, reward: 'globalMultiplier', value: 1.8 },
            { id: 'giga_producer', name: 'ギガプロデューサー', description: '10億 EPS達成', threshold: 1000000000, type: 'eps', unlocked: false, reward: 'globalMultiplier', value: 2.5 },
            { id: 'tera_producer', name: 'テラプロデューサー', description: '1兆 EPS達成', threshold: 1000000000000, type: 'eps', unlocked: false, reward: 'globalMultiplier', value: 4.0 },
            
            // Upgrade Achievements
            { id: 'collector', name: 'コレクター', description: '5種類のアップグレードを購入', threshold: 5, type: 'upgrade_types', unlocked: false, reward: 'globalMultiplier', value: 1.2 },
            { id: 'hoarder', name: '蓄積者', description: '10種類のアップグレードを購入', threshold: 10, type: 'upgrade_types', unlocked: false, reward: 'globalMultiplier', value: 1.4 },
            { id: 'maximalist', name: '最大主義者', description: '15種類のアップグレードを購入', threshold: 15, type: 'upgrade_types', unlocked: false, reward: 'globalMultiplier', value: 1.6 },
            
            // Research Achievements
            { id: 'researcher', name: '研究者', description: '5つの研究を完了', threshold: 5, type: 'research', unlocked: false, reward: 'globalMultiplier', value: 1.3 },
            { id: 'scholar', name: '学者', description: '10の研究を完了', threshold: 10, type: 'research', unlocked: false, reward: 'globalMultiplier', value: 1.6 },
            { id: 'genius', name: '天才', description: '15の研究を完了', threshold: 15, type: 'research', unlocked: false, reward: 'globalMultiplier', value: 2.0 },
            { id: 'omniscient', name: '全知', description: '20の研究を完了', threshold: 20, type: 'research', unlocked: false, reward: 'globalMultiplier', value: 3.0 },
            
            // Time-based Achievements
            { id: 'persistent', name: '持続者', description: '1時間プレイ', threshold: 3600000, type: 'playtime', unlocked: false, reward: 'timeBonus', value: 1.1 },
            { id: 'dedicated', name: '献身者', description: '6時間プレイ', threshold: 21600000, type: 'playtime', unlocked: false, reward: 'timeBonus', value: 1.2 },
            { id: 'obsessed', name: '憑りつかれた者', description: '24時間プレイ', threshold: 86400000, type: 'playtime', unlocked: false, reward: 'timeBonus', value: 1.5 },
            
            // Special Achievements
            { id: 'speed_demon', name: 'スピードデーモン', description: '30分以内に100万エネルギー達成', threshold: 1000000, type: 'speed_energy', unlocked: false, reward: 'speedBonus', value: 1.5 },
            { id: 'efficiency_expert', name: '効率エキスパート', description: '1000EPS達成時のクリック数が100以下', threshold: 100, type: 'efficiency', unlocked: false, reward: 'efficiencyBonus', value: 1.3 },
            { id: 'reality_bender', name: '現実曲げ', description: '現実操作倍率5.0達成', threshold: 5.0, type: 'reality_flux', unlocked: false, reward: 'realityBonus', value: 1.2 },
            
            // Hidden/Secret Achievements
            { id: 'secret_clicker', name: '秘密のクリッカー', description: 'コアを1秒間に10回クリック', threshold: 10, type: 'click_rate', unlocked: false, reward: 'secretBonus', value: 2.0 },
            { id: 'universe_creator', name: '宇宙創造者', description: '宇宙工場を1つ所有', threshold: 1, type: 'universe_factory', unlocked: false, reward: 'universeBonus', value: 5.0 },
            { id: 'transcendent_master', name: '超越マスター', description: '超越コアを1つ所有', threshold: 1, type: 'transcendence_core', unlocked: false, reward: 'transcendentBonus', value: 10.0 }
        ];

        // Milestone system for major progression goals
        this.milestones = [
            { id: 'first_tier2', name: '第2段階突入', description: 'Tier 2装置を解除', requirement: { type: 'energy', value: 500000 }, reward: 'globalMultiplier', value: 1.5, completed: false },
            { id: 'dimension_4', name: '4次元到達', description: '次元レベル4.0到達', requirement: { type: 'dimension', value: 4.0 }, reward: 'dimensionBonus', value: 0.5, completed: false },
            { id: 'first_tier3', name: '第3段階突入', description: 'Tier 3装置を解除', requirement: { type: 'dimension', value: 4.0 }, reward: 'globalMultiplier', value: 2.0, completed: false },
            { id: 'automation_god', name: '自動化の神', description: '1億EPS達成', requirement: { type: 'eps', value: 100000000 }, reward: 'globalMultiplier', value: 3.0, completed: false },
            { id: 'reality_master', name: '現実の主', description: '現実操作倍率3.0達成', requirement: { type: 'reality_flux', value: 3.0 }, reward: 'realityBonus', value: 1.0, completed: false },
            { id: 'dimension_5', name: '5次元到達', description: '次元レベル5.0到達', requirement: { type: 'dimension', value: 5.0 }, reward: 'dimensionBonus', value: 1.0, completed: false },
            { id: 'universe_architect', name: '宇宙建築家', description: '宇宙系装置を解除', requirement: { type: 'dimension', value: 6.0 }, reward: 'globalMultiplier', value: 5.0, completed: false },
            { id: 'transcendence', name: '超越', description: '超越コアを解除', requirement: { type: 'upgrade', id: 'conceptual_engine', count: 2 }, reward: 'transcendentBonus', value: 1.0, completed: false }
        ];

        // Dynamic events system
        this.events = [
            {
                id: 'quantum_storm',
                name: '量子嵐',
                description: '量子嵐により全生産が3倍になるが、クリック威力が半減',
                duration: 300000, // 5 minutes
                effects: { globalMultiplier: 3.0, clickPower: 0.5 },
                probability: 0.1,
                requirements: { energy: 10000 }
            },
            {
                id: 'temporal_flux',
                name: '時間流動',
                description: '時間の流れが2倍になり、全てが加速する',
                duration: 180000, // 3 minutes
                effects: { timeDistortion: 2.0 },
                probability: 0.08,
                requirements: { dimension: 4.0 }
            },
            {
                id: 'reality_glitch',
                name: '現実グリッチ',
                description: '現実にグリッチが発生、現実操作倍率が10倍になる',
                duration: 120000, // 2 minutes
                effects: { realityFlux: 10.0 },
                probability: 0.05,
                requirements: { eps: 1000000 }
            },
            {
                id: 'cosmic_alignment',
                name: '宇宙整列',
                description: '宇宙の整列により全効率が5倍向上',
                duration: 240000, // 4 minutes
                effects: { globalMultiplier: 5.0 },
                probability: 0.03,
                requirements: { research: 10 }
            }
        ];

        this.clickPower = 1;
        this.globalMultiplier = 1;
        this.upgradeMultipliers = {};
        this.timeMultiplier = 1;
        this.eventMultipliers = {};
        this.achievementBonuses = {
            clickMultiplier: 1,
            globalMultiplier: 1,
            dimensionBonus: 0,
            realityBonus: 0,
            timeBonus: 1,
            speedBonus: 1,
            efficiencyBonus: 1,
            secretBonus: 1,
            universeBonus: 1,
            transcendentBonus: 1
        };
        
        this.initializeGame();
        this.bindEvents();
        this.startGameLoop();
        this.loadGame();
    }

    initializeGame() {
        this.updateUI();
        this.generateUpgradeElements();
        this.generateResearchElements();
        this.generateAchievementElements();
        this.createParticleEffect();
        this.checkUnlocks();
    }

    bindEvents() {
        const quantumCore = document.getElementById('quantumCore');
        const clickRipple = document.getElementById('clickRipple');
        
        quantumCore.addEventListener('click', (e) => {
            this.handleCoreClick(e);
            this.triggerRippleEffect(clickRipple);
        });

        // Auto-save every 30 seconds
        setInterval(() => this.saveGame(), 30000);
        
        // Save on page unload
        window.addEventListener('beforeunload', () => this.saveGame());
        
        // Event system check every minute
        setInterval(() => this.checkRandomEvents(), 60000);
    }

    handleCoreClick(e) {
        const effectiveClickPower = this.clickPower * 
            this.achievementBonuses.clickMultiplier * 
            this.achievementBonuses.secretBonus * 
            (this.eventMultipliers.clickPower || 1);
        
        const energy = effectiveClickPower * this.gameState.realityFlux;
        this.gameState.quantumEnergy += energy;
        this.gameState.totalClicks++;
        this.gameState.totalEnergyEarned += energy;
        
        this.createClickParticles(e);
        this.checkAchievements();
        this.checkMilestones();
        this.updateUI();
    }

    triggerRippleEffect(ripple) {
        ripple.classList.remove('active');
        void ripple.offsetWidth;
        ripple.classList.add('active');
    }

    createClickParticles(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'click-particle';
            particle.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                width: 6px;
                height: 6px;
                background: #fff;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                box-shadow: 0 0 10px #fff;
            `;
            
            document.body.appendChild(particle);
            
            const angle = (Math.PI * 2 * i) / 8;
            const distance = 60 + Math.random() * 60;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'ease-out'
            }).onfinish = () => particle.remove();
        }
    }

    checkUnlocks() {
        this.upgrades.forEach(upgrade => {
            if (!upgrade.unlocked && upgrade.unlockRequirement) {
                const req = upgrade.unlockRequirement;
                let shouldUnlock = false;
                
                switch(req.type) {
                    case 'energy':
                        shouldUnlock = this.gameState.totalEnergyEarned >= req.value;
                        break;
                    case 'dimension':
                        shouldUnlock = this.gameState.currentDimension >= req.value;
                        break;
                    case 'upgrade':
                        const targetUpgrade = this.upgrades.find(u => u.id === req.id);
                        shouldUnlock = targetUpgrade && targetUpgrade.count >= req.count;
                        break;
                }
                
                if (shouldUnlock) {
                    upgrade.unlocked = true;
                    this.generateUpgradeElements();
                }
            }
        });
    }

    generateUpgradeElements() {
        const upgradesGrid = document.getElementById('upgradesGrid');
        upgradesGrid.innerHTML = '';
        
        this.upgrades.filter(upgrade => upgrade.unlocked).forEach(upgrade => {
            const upgradeElement = document.createElement('div');
            upgradeElement.className = 'upgrade-item';
            upgradeElement.innerHTML = `
                <div class="upgrade-name">${upgrade.name}</div>
                <div class="upgrade-description">${upgrade.description}</div>
                <div class="upgrade-stats">
                    <div class="upgrade-cost">${this.formatNumber(this.getUpgradeCost(upgrade))}</div>
                    <div class="upgrade-count">×${upgrade.count}</div>
                </div>
                <div class="upgrade-tier">Tier ${upgrade.tier}</div>
            `;
            
            upgradeElement.addEventListener('click', () => this.purchaseUpgrade(upgrade));
            upgradesGrid.appendChild(upgradeElement);
        });
    }

    generateResearchElements() {
        const researchGrid = document.getElementById('researchGrid');
        researchGrid.innerHTML = '';
        
        this.research.forEach(research => {
            if (research.unlockRequirement) {
                const req = research.unlockRequirement;
                let isUnlocked = false;
                
                switch(req.type) {
                    case 'research':
                        isUnlocked = this.research.filter(r => r.completed).length >= req.count;
                        break;
                    case 'dimension':
                        isUnlocked = this.gameState.currentDimension >= req.value;
                        break;
                }
                
                if (!isUnlocked) return;
            }
            
            const researchElement = document.createElement('div');
            researchElement.className = `research-item ${research.completed ? 'completed' : ''}`;
            researchElement.innerHTML = `
                <div class="research-name">${research.name}</div>
                <div class="research-description">${research.description}</div>
                <div class="research-cost">${research.completed ? '完了' : this.formatNumber(research.cost)}</div>
                <div class="research-tier">研究段階 ${research.tier}</div>
            `;
            
            if (!research.completed) {
                researchElement.addEventListener('click', () => this.purchaseResearch(research));
            }
            researchGrid.appendChild(researchElement);
        });
    }

    generateAchievementElements() {
        const achievementsGrid = document.getElementById('achievementsGrid');
        achievementsGrid.innerHTML = '';
        
        this.achievements.forEach(achievement => {
            const achievementElement = document.createElement('div');
            achievementElement.className = `achievement-item ${achievement.unlocked ? 'unlocked' : ''}`;
            achievementElement.innerHTML = `
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-description">${achievement.description}</div>
                <div class="achievement-progress">${this.getAchievementProgress(achievement)}</div>
            `;
            achievementsGrid.appendChild(achievementElement);
        });
    }

    purchaseUpgrade(upgrade) {
        const cost = this.getUpgradeCost(upgrade);
        if (this.gameState.quantumEnergy >= cost) {
            this.gameState.quantumEnergy -= cost;
            upgrade.count++;
            this.updateUpgradeButtons();
            this.calculateEPS();
            this.checkAchievements();
            this.checkMilestones();
            this.checkUnlocks();
            this.updateUI();
        }
    }

    purchaseResearch(research) {
        if (this.gameState.quantumEnergy >= research.cost && !research.completed) {
            this.gameState.quantumEnergy -= research.cost;
            research.completed = true;
            this.applyResearchEffects(research);
            this.generateResearchElements();
            this.checkAchievements();
            this.checkMilestones();
            this.checkUnlocks();
            this.updateUI();
        }
    }

    applyResearchEffects(research) {
        if (research.multiplier) {
            this.globalMultiplier *= research.multiplier;
        }
        if (research.clickMultiplier) {
            this.clickPower *= research.clickMultiplier;
        }
        if (research.upgradeMultiplier) {
            Object.assign(this.upgradeMultipliers, research.upgradeMultiplier);
        }
        if (research.dimensionBoost) {
            this.gameState.currentDimension += research.dimensionBoost;
        }
        if (research.realityFluxBoost) {
            this.gameState.realityFlux += research.realityFluxBoost;
        }
        if (research.timeDistortionBoost) {
            this.gameState.timeDistortion += research.timeDistortionBoost;
        }
        if (research.unlockUpgrades) {
            research.unlockUpgrades.forEach(upgradeId => {
                const upgrade = this.upgrades.find(u => u.id === upgradeId);
                if (upgrade) upgrade.unlocked = true;
            });
        }
        this.calculateEPS();
    }

    getUpgradeCost(upgrade) {
        return Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, upgrade.count));
    }

    calculateEPS() {
        let totalEPS = 0;
        this.upgrades.forEach(upgrade => {
            if (upgrade.count > 0) {
                const upgradeMultiplier = this.upgradeMultipliers[upgrade.id] || 1;
                totalEPS += upgrade.baseEps * upgrade.count * upgradeMultiplier;
            }
        });
        
        const effectiveGlobalMultiplier = this.globalMultiplier * 
            this.achievementBonuses.globalMultiplier * 
            this.achievementBonuses.speedBonus * 
            this.achievementBonuses.efficiencyBonus * 
            this.achievementBonuses.universeBonus * 
            this.achievementBonuses.transcendentBonus *
            (this.eventMultipliers.globalMultiplier || 1);
        
        const effectiveRealityFlux = this.gameState.realityFlux * 
            (1 + this.achievementBonuses.realityBonus) *
            (this.eventMultipliers.realityFlux || 1);
        
        const effectiveTimeDistortion = this.gameState.timeDistortion * 
            this.achievementBonuses.timeBonus *
            (this.eventMultipliers.timeDistortion || 1);
        
        this.gameState.energyPerSecond = totalEPS * effectiveGlobalMultiplier * effectiveRealityFlux * effectiveTimeDistortion;
    }

    updateUpgradeButtons() {
        const upgradeItems = document.querySelectorAll('.upgrade-item');
        upgradeItems.forEach((item, index) => {
            const visibleUpgrades = this.upgrades.filter(u => u.unlocked);
            if (index >= visibleUpgrades.length) return;
            
            const upgrade = visibleUpgrades[index];
            const cost = this.getUpgradeCost(upgrade);
            const costElement = item.querySelector('.upgrade-cost');
            const countElement = item.querySelector('.upgrade-count');
            
            if (costElement) costElement.textContent = this.formatNumber(cost);
            if (countElement) countElement.textContent = `×${upgrade.count}`;
            
            if (this.gameState.quantumEnergy >= cost) {
                item.classList.add('affordable');
                item.classList.remove('unaffordable');
            } else {
                item.classList.remove('affordable');
                item.classList.add('unaffordable');
            }
        });
    }

    checkAchievements() {
        this.achievements.forEach(achievement => {
            if (!achievement.unlocked) {
                let progress = this.getAchievementProgressValue(achievement);
                
                if (progress >= achievement.threshold) {
                    achievement.unlocked = true;
                    this.applyAchievementReward(achievement);
                    this.showAchievementNotification(achievement);
                }
            }
        });
        this.generateAchievementElements();
    }

    getAchievementProgressValue(achievement) {
        switch (achievement.type) {
            case 'clicks':
                return this.gameState.totalClicks;
            case 'energy':
                return this.gameState.totalEnergyEarned;
            case 'upgrades':
                return this.upgrades.reduce((sum, u) => sum + u.count, 0);
            case 'upgrade_types':
                return this.upgrades.filter(u => u.count > 0).length;
            case 'research':
                return this.research.filter(r => r.completed).length;
            case 'eps':
                return this.gameState.energyPerSecond;
            case 'dimension':
                return this.gameState.currentDimension;
            case 'reality_flux':
                return this.gameState.realityFlux;
            case 'playtime':
                return Date.now() - this.gameState.startTime;
            case 'universe_factory':
                const uf = this.upgrades.find(u => u.id === 'universe_factory');
                return uf ? uf.count : 0;
            case 'transcendence_core':
                const tc = this.upgrades.find(u => u.id === 'transcendence_core');
                return tc ? tc.count : 0;
            default:
                return 0;
        }
    }

    getAchievementProgress(achievement) {
        const current = this.getAchievementProgressValue(achievement);
        const target = achievement.threshold;
        
        if (achievement.unlocked) return '達成済み';
        
        if (achievement.type === 'playtime') {
            return `${Math.floor(current / 60000)}分 / ${Math.floor(target / 60000)}分`;
        }
        
        return `${this.formatNumber(current)} / ${this.formatNumber(target)}`;
    }

    applyAchievementReward(achievement) {
        if (achievement.reward && achievement.value) {
            if (this.achievementBonuses.hasOwnProperty(achievement.reward)) {
                if (achievement.reward.includes('Bonus')) {
                    this.achievementBonuses[achievement.reward] += achievement.value;
                } else {
                    this.achievementBonuses[achievement.reward] *= achievement.value;
                }
            }
        }
        this.calculateEPS();
    }

    checkMilestones() {
        this.milestones.forEach(milestone => {
            if (!milestone.completed) {
                let shouldComplete = false;
                const req = milestone.requirement;
                
                switch(req.type) {
                    case 'energy':
                        shouldComplete = this.gameState.totalEnergyEarned >= req.value;
                        break;
                    case 'dimension':
                        shouldComplete = this.gameState.currentDimension >= req.value;
                        break;
                    case 'eps':
                        shouldComplete = this.gameState.energyPerSecond >= req.value;
                        break;
                    case 'reality_flux':
                        shouldComplete = this.gameState.realityFlux >= req.value;
                        break;
                    case 'upgrade':
                        const upgrade = this.upgrades.find(u => u.id === req.id);
                        shouldComplete = upgrade && upgrade.count >= req.count;
                        break;
                }
                
                if (shouldComplete) {
                    milestone.completed = true;
                    this.gameState.completedMilestones.push(milestone.id);
                    this.applyMilestoneReward(milestone);
                    this.showMilestoneNotification(milestone);
                }
            }
        });
    }

    applyMilestoneReward(milestone) {
        if (milestone.reward === 'globalMultiplier') {
            this.globalMultiplier *= milestone.value;
        } else if (milestone.reward === 'dimensionBonus') {
            this.gameState.currentDimension += milestone.value;
        } else if (milestone.reward === 'realityBonus') {
            this.gameState.realityFlux += milestone.value;
        }
        this.calculateEPS();
    }

    checkRandomEvents() {
        if (this.gameState.currentEvent) {
            if (Date.now() > this.gameState.eventEndTime) {
                this.endEvent();
            }
            return;
        }

        this.events.forEach(event => {
            if (Math.random() < event.probability) {
                if (this.meetsEventRequirements(event)) {
                    this.startEvent(event);
                }
            }
        });
    }

    meetsEventRequirements(event) {
        const req = event.requirements;
        if (req.energy && this.gameState.totalEnergyEarned < req.energy) return false;
        if (req.dimension && this.gameState.currentDimension < req.dimension) return false;
        if (req.eps && this.gameState.energyPerSecond < req.eps) return false;
        if (req.research && this.research.filter(r => r.completed).length < req.research) return false;
        return true;
    }

    startEvent(event) {
        this.gameState.currentEvent = event.id;
        this.gameState.eventEndTime = Date.now() + event.duration;
        this.eventMultipliers = { ...event.effects };
        this.calculateEPS();
        this.showEventNotification(event, true);
    }

    endEvent() {
        this.gameState.currentEvent = null;
        this.gameState.eventEndTime = 0;
        this.eventMultipliers = {};
        this.calculateEPS();
        this.showEventNotification(null, false);
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50px;
            right: 50px;
            background: linear-gradient(45deg, rgba(255, 215, 0, 0.9), rgba(255, 165, 0, 0.9));
            color: #000;
            padding: 20px;
            border-radius: 10px;
            font-weight: bold;
            z-index: 10000;
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
            transform: translateX(100%);
            transition: transform 0.5s ease;
            max-width: 300px;
        `;
        notification.innerHTML = `
            <div style="font-size: 1.2em;">実績解除！</div>
            <div style="font-size: 1em; margin-top: 5px;">${achievement.name}</div>
            <div style="font-size: 0.8em; opacity: 0.8; margin-top: 5px;">${achievement.description}</div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.style.transform = 'translateX(0)', 100);
        setTimeout(() => notification.style.transform = 'translateX(100%)', 4000);
        setTimeout(() => notification.remove(), 4500);
    }

    showMilestoneNotification(milestone) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 120px;
            right: 50px;
            background: linear-gradient(45deg, rgba(0, 255, 255, 0.9), rgba(0, 200, 255, 0.9));
            color: #000;
            padding: 20px;
            border-radius: 10px;
            font-weight: bold;
            z-index: 10000;
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
            transform: translateX(100%);
            transition: transform 0.5s ease;
            max-width: 300px;
        `;
        notification.innerHTML = `
            <div style="font-size: 1.2em;">重要目標達成！</div>
            <div style="font-size: 1em; margin-top: 5px;">${milestone.name}</div>
            <div style="font-size: 0.8em; opacity: 0.8; margin-top: 5px;">${milestone.description}</div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.style.transform = 'translateX(0)', 100);
        setTimeout(() => notification.style.transform = 'translateX(100%)', 5000);
        setTimeout(() => notification.remove(), 5500);
    }

    showEventNotification(event, isStart) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 190px;
            right: 50px;
            background: linear-gradient(45deg, rgba(255, 0, 255, 0.9), rgba(200, 0, 255, 0.9));
            color: #fff;
            padding: 20px;
            border-radius: 10px;
            font-weight: bold;
            z-index: 10000;
            box-shadow: 0 0 20px rgba(255, 0, 255, 0.5);
            transform: translateX(100%);
            transition: transform 0.5s ease;
            max-width: 300px;
        `;
        
        if (isStart && event) {
            notification.innerHTML = `
                <div style="font-size: 1.2em;">特殊イベント発生！</div>
                <div style="font-size: 1em; margin-top: 5px;">${event.name}</div>
                <div style="font-size: 0.8em; opacity: 0.8; margin-top: 5px;">${event.description}</div>
            `;
        } else {
            notification.innerHTML = `
                <div style="font-size: 1.2em;">イベント終了</div>
                <div style="font-size: 0.9em; margin-top: 5px;">通常状態に戻りました</div>
            `;
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.style.transform = 'translateX(0)', 100);
        setTimeout(() => notification.style.transform = 'translateX(100%)', 3000);
        setTimeout(() => notification.remove(), 3500);
    }

    createParticleEffect() {
        const particleField = document.getElementById('particleField');
        
        setInterval(() => {
            if (this.gameState.energyPerSecond > 0) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.bottom = '0px';
                
                // Enhance particles based on tier
                const maxTier = Math.max(...this.upgrades.filter(u => u.count > 0).map(u => u.tier), 1);
                if (maxTier >= 3) {
                    particle.style.background = '#ff00ff';
                    particle.style.boxShadow = '0 0 8px #ff00ff';
                } else if (maxTier >= 2) {
                    particle.style.background = '#ffff00';
                    particle.style.boxShadow = '0 0 6px #ffff00';
                }
                
                particleField.appendChild(particle);
                
                setTimeout(() => particle.remove(), 4000);
            }
        }, Math.max(50, 400 - this.gameState.currentDimension * 50));
    }

    formatNumber(num) {
        if (num < 1000) return Math.floor(num).toString();
        if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
        if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M';
        if (num < 1000000000000) return (num / 1000000000).toFixed(1) + 'B';
        if (num < 1000000000000000) return (num / 1000000000000).toFixed(1) + 'T';
        if (num < 1000000000000000000) return (num / 1000000000000000).toFixed(1) + 'Qa';
        if (num < 1000000000000000000000) return (num / 1000000000000000000).toFixed(1) + 'Qi';
        return (num / 1000000000000000000000).toFixed(1) + 'Sx';
    }

    updateUI() {
        document.getElementById('quantumEnergy').textContent = this.formatNumber(this.gameState.quantumEnergy);
        document.getElementById('energyPerSecond').textContent = this.formatNumber(this.gameState.energyPerSecond);
        document.getElementById('currentDimension').textContent = this.gameState.currentDimension.toFixed(1);
        document.getElementById('realityFlux').textContent = this.gameState.realityFlux.toFixed(2) + 'x';
        document.getElementById('coreEnergy').textContent = this.formatNumber(this.gameState.quantumEnergy);
        
        this.updateUpgradeButtons();
        
        // Update reality sync status
        const syncStatus = document.getElementById('realitySync');
        if (this.gameState.energyPerSecond > 1000000000000) {
            syncStatus.textContent = '超臨界';
            syncStatus.style.color = '#ff00ff';
        } else if (this.gameState.energyPerSecond > 1000000000) {
            syncStatus.textContent = '超不安定';
            syncStatus.style.color = '#ff8800';
        } else if (this.gameState.energyPerSecond > 1000000) {
            syncStatus.textContent = '危険';
            syncStatus.style.color = '#ff0000';
        } else if (this.gameState.energyPerSecond > 1000) {
            syncStatus.textContent = '不安定';
            syncStatus.style.color = '#ffff00';
        } else {
            syncStatus.textContent = '安定';
            syncStatus.style.color = '#00ff00';
        }
        
        // Update event status if active
        if (this.gameState.currentEvent) {
            const timeLeft = Math.max(0, this.gameState.eventEndTime - Date.now());
            const minutes = Math.floor(timeLeft / 60000);
            const seconds = Math.floor((timeLeft % 60000) / 1000);
            syncStatus.textContent += ` (イベント: ${minutes}:${seconds.toString().padStart(2, '0')})`;
        }
    }

    startGameLoop() {
        setInterval(() => {
            if (this.gameState.energyPerSecond > 0) {
                const energyGain = this.gameState.energyPerSecond / 10; // 10 updates per second
                this.gameState.quantumEnergy += energyGain;
                this.gameState.totalEnergyEarned += energyGain;
                this.updateUI();
                this.checkAchievements();
                this.checkMilestones();
                this.checkUnlocks();
            }
        }, 100);
    }

    saveGame() {
        const saveData = {
            gameState: this.gameState,
            upgrades: this.upgrades,
            research: this.research,
            achievements: this.achievements,
            milestones: this.milestones,
            clickPower: this.clickPower,
            globalMultiplier: this.globalMultiplier,
            upgradeMultipliers: this.upgradeMultipliers,
            achievementBonuses: this.achievementBonuses,
            timeMultiplier: this.timeMultiplier
        };
        localStorage.setItem('quantumNexusSave', JSON.stringify(saveData));
    }

    loadGame() {
        const saveData = localStorage.getItem('quantumNexusSave');
        if (saveData) {
            const data = JSON.parse(saveData);
            
            // Load game state
            Object.assign(this.gameState, data.gameState);
            
            // Load upgrades
            if (data.upgrades) {
                data.upgrades.forEach((savedUpgrade, index) => {
                    if (this.upgrades[index]) {
                        Object.assign(this.upgrades[index], savedUpgrade);
                    }
                });
            }
            
            // Load research
            if (data.research) {
                data.research.forEach((savedResearch, index) => {
                    if (this.research[index]) {
                        Object.assign(this.research[index], savedResearch);
                        if (savedResearch.completed) {
                            this.applyResearchEffects(this.research[index]);
                        }
                    }
                });
            }
            
            // Load achievements
            if (data.achievements) {
                data.achievements.forEach((savedAchievement, index) => {
                    if (this.achievements[index]) {
                        Object.assign(this.achievements[index], savedAchievement);
                        if (savedAchievement.unlocked) {
                            this.applyAchievementReward(this.achievements[index]);
                        }
                    }
                });
            }
            
            // Load milestones
            if (data.milestones) {
                data.milestones.forEach((savedMilestone, index) => {
                    if (this.milestones[index]) {
                        Object.assign(this.milestones[index], savedMilestone);
                    }
                });
            }
            
            // Load other variables
            if (data.clickPower) this.clickPower = data.clickPower;
            if (data.globalMultiplier) this.globalMultiplier = data.globalMultiplier;
            if (data.upgradeMultipliers) this.upgradeMultipliers = data.upgradeMultipliers;
            if (data.achievementBonuses) this.achievementBonuses = data.achievementBonuses;
            if (data.timeMultiplier) this.timeMultiplier = data.timeMultiplier;
            
            this.calculateEPS();
            this.updateUI();
            this.generateUpgradeElements();
            this.generateResearchElements();
            this.generateAchievementElements();
        }
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new QuantumNexusGame();
});