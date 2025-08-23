export const wEngines = [
  {
    id: 'steel-cushion',
    name: '钢蹦儿', // Placeholder name for a powerful S-Rank
    rarity: 'S',
    level: 60,
    base_atk: 680, // Higher placeholder value for S-rank
    mainStat: { type: 'CRIT_DMG', value: 0.30 }, // Placeholder main stat
    passive: {
      name: '全领域适应',
      description: '装备者攻击力提高20%。对生命值百分比高于或等于装备者的敌人造成伤害时，暴击伤害提高40%。',
      effects: [
        { stat: 'atk_percent', value: 0.20 },
        // Conditional effect for crit_dmg is handled by calculator logic
      ]
    }
  },
  {
    id: 'bashful-demon',
    name: '羞涩恶魔',
    rarity: 'A',
    level: 60,
    base_atk: 624,
    mainStat: { type: 'ATK_PERCENT', value: 0.25 },
    passive: {
      name: '冰亲和',
      description: '冰属性伤害提高15%。施放终结技时，全队攻击力提高2%，持续12秒，最多叠加4次。',
      effects: [
        { stat: 'ice_dmg_bonus', value: 0.15 },
        // Conditional squad ATK buff
      ]
    }
  },
  {
    id: 'big-cylinder',
    name: '大圆筒',
    rarity: 'A',
    level: 60,
    base_atk: 624,
    mainStat: { type: 'DEF_PERCENT', value: 0.40 },
    passive: {
      name: '反击架势',
      description: '受到的伤害降低7.5%。受到攻击后，下一次攻击必定暴击，并造成防御力600%的额外伤害。此效果每7.5秒最多触发一次。',
      effects: [
        // Conditional effects
      ]
    }
  }
];
