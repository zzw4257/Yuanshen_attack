export const characters = [
  {
    id: 'anby-demara',
    name: '安比·德玛拉',
    rarity: 'S',
    faction: '狡兔屋',
    attribute: '电',
    weapon: '刃',
    bio: '冷静、干练的少女，总是高效地完成各种委托。认为“效率”是处理一切事务的准则，但似乎对某些“效率低下”的事情——比如看电影，也有着别样的执着。',
    icon: '/path/to/anby_icon.png', // Placeholder path
    stats: {
      level_60: { base_atk: 929, base_hp: 7673, base_def: 612, crit_rate: 0.194, crit_dmg: 0.50 }
    },
    abilities: {
      basic_attack: {
        name: '普通攻击',
        multipliers: [
          { level: 1, value: 0.40, label: '第一击' },
          { level: 1, value: 0.45, label: '第二击' },
          { level: 1, value: 0.60, label: '第三击' },
        ]
      },
      special_attack: {
        name: '特殊技',
        multipliers: [
          { level: 8, value: 3.50, label: '技能总伤害' } // Updated based on research
        ]
      }
    }
  },
  {
    id: 'hoshimi-miyabi',
    name: '星见雅',
    rarity: 'S',
    faction: '对空六课',
    attribute: '冰',
    weapon: '刃',
    bio: '对空六课的行动组组长，以高效的行事风格和卓越的领导力而闻名。',
    icon: '/path/to/miyabi_icon.png', // Placeholder path
    stats: {
      level_60: { base_atk: 880, base_hp: 7673, base_def: 606, crit_rate: 0.05, crit_dmg: 0.50 }
    },
    abilities: {
      basic_attack: { name: '普通攻击', multipliers: [{ level: 1, value: 0.50, label: '斩击' }] },
      special_attack: { name: '特殊技', multipliers: [{ level: 1, value: 2.80, label: '冰封之舞' }] }
    }
  },
  {
    id: 'nicole-demara',
    name: '妮可·德玛拉',
    rarity: 'A',
    faction: '狡兔屋',
    attribute: '以太',
    weapon: '炮',
    bio: '狡兔屋的创始人，表面上是个财迷，实际上非常关心自己的伙伴。总能接到各种各样、奇奇怪怪的委托，在业界有着“什么都敢接”的名声。',
    icon: '/path/to/nicole_icon.png', // Placeholder path
    stats: {
      level_60: { base_atk: 750, base_hp: 6800, base_def: 350, crit_rate: 0.05, crit_dmg: 0.50 } // Placeholder stats
    },
    abilities: {
      basic_attack: { name: '普通攻击', multipliers: [{ level: 1, value: 0.70, label: '单发' }] },
      special_attack: { name: '特殊技', multipliers: [{ level: 1, value: 2.20, label: '糖衣炮弹' }] }
    }
  },
  {
    id: 'billy-kid',
    name: '比利·奇德',
    rarity: 'A',
    faction: '狡兔屋',
    attribute: '物理',
    weapon: '枪',
    bio: '帅气、潇洒的半机械人，自称“星徽骑士”，将帅气作为自己的行动准则。虽然看起来有些轻浮，但作为“前辈”，在关键时刻相当可靠。',
    icon: '/path/to/billy_icon.png', // Placeholder path
    stats: {
      level_60: { base_atk: 780, base_hp: 7100, base_def: 380, crit_rate: 0.05, crit_dmg: 0.50 } // Placeholder stats
    },
    abilities: {
      basic_attack: { name: '普通攻击', multipliers: [{ level: 1, value: 0.35, label: '双枪连射' }] },
      special_attack: { name: '特殊技', multipliers: [{ level: 1, value: 2.0, label: '星徽冲击' }] }
    }
  }
];
