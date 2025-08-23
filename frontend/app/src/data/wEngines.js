export const wEngines = [
  {
    id: 'steel-cushion',
    name: '钢蹦儿',
    rarity: 'S',
    base_atk: 550,
    passive: {
      name: '全领域适应',
      description: '装备者攻击力提高20%。对生命值百分比高于或等于装备者的敌人造成伤害时，暴击伤害提高40%。',
      effects: [
        { stat: 'atk_percent', value: 0.20 },
        // Conditional effect, will be handled by calculator logic
      ]
    }
  },
  {
    id: 'cannon-rotor',
    name: '加农转子',
    rarity: 'A',
    base_atk: 450,
    passive: {
      name: '高能整流',
      description: '造成属性异常伤害时，装备者的攻击力提高36%，持续10秒。',
      effects: [
        // Conditional effect
      ]
    }
  },
  {
    id: 'starlight-engine',
    name: '星徽引擎',
    rarity: 'A',
    base_atk: 480,
    passive: {
      name: '骑士的荣耀',
      description: '施放闪避反击或连携技时，暴击率提高16%，暴击伤害提高32%，持续12秒。',
      effects: [
        // Conditional effect
      ]
    }
  }
];
