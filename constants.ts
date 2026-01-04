
import { AnimalType, Question } from './types';

export const QUESTIONS: Question[] = [
  // TIGER (Dominance)
  { id: 1, text: "我喜欢在竞争中获胜。", category: AnimalType.TIGER },
  { id: 2, text: "我倾向于快速做出决定。", category: AnimalType.TIGER },
  { id: 3, text: "我善于直言不讳地表达意见。", category: AnimalType.TIGER },
  { id: 4, text: "我更看重结果而不是过程。", category: AnimalType.TIGER },
  { id: 5, text: "我喜欢承担风险和挑战。", category: AnimalType.TIGER },
  { id: 6, text: "在团队中，我通常是那个下达指令的人。", category: AnimalType.TIGER },
  
  // PEACOCK (Extroversion)
  { id: 7, text: "我喜欢成为注意力的焦点。", category: AnimalType.PEACOCK },
  { id: 8, text: "我擅长说服他人接受我的观点。", category: AnimalType.PEACOCK },
  { id: 9, text: "我有很强的社交能力，喜欢结交新朋友。", category: AnimalType.PEACOCK },
  { id: 10, text: "我通常表现得非常热情和乐观。", category: AnimalType.PEACOCK },
  { id: 11, text: "我喜欢公开演说或在团队中发言。", category: AnimalType.PEACOCK },
  { id: 12, text: "我倾向于用情感而非逻辑去影响他人。", category: AnimalType.PEACOCK },

  // KOALA (Patience)
  { id: 13, text: "我是一个很好的倾听者。", category: AnimalType.KOALA },
  { id: 14, text: "我倾向于保持现状而非轻易改变。", category: AnimalType.KOALA },
  { id: 15, text: "我性格温和，不喜欢与人发生冲突。", category: AnimalType.KOALA },
  { id: 16, text: "我非常有耐心，能够长时间专注于一件事情。", category: AnimalType.KOALA },
  { id: 17, text: "在工作中，我非常可靠且踏实。", category: AnimalType.KOALA },
  { id: 18, text: "我更喜欢在后台支持他人，而不是在前台表现。", category: AnimalType.KOALA },

  // OWL (Conformity)
  { id: 19, text: "我非常注重细节和准确性。", category: AnimalType.OWL },
  { id: 20, text: "我喜欢按部就班地按照计划行事。", category: AnimalType.OWL },
  { id: 21, text: "在做决定前，我会收集大量的数据和信息。", category: AnimalType.OWL },
  { id: 22, text: "我认为逻辑和事实比情感更重要。", category: AnimalType.OWL },
  { id: 23, text: "我追求完美，对自己和他人要求很高。", category: AnimalType.OWL },
  { id: 24, text: "我喜欢清晰的规则和流程。", category: AnimalType.OWL },

  // Note: Chameleon (Adaptability) is usually derived from balanced scores across categories, 
  // but some implementations add specific questions. For simplicity, we calculate it from balance.
  // We'll map these extra to Chameleon for scoring weighting.
  { id: 25, text: "我能够非常容易地适应各种不同的环境。", category: AnimalType.CHAMELEON },
  { id: 26, text: "在不同的场合，我会表现出完全不同的性格特质。", category: AnimalType.CHAMELEON },
  { id: 27, text: "我擅长调解团队中不同性格成员之间的矛盾。", category: AnimalType.CHAMELEON },
  { id: 28, text: "我没有明显的偏好，可以随遇而安。", category: AnimalType.CHAMELEON },
  { id: 29, text: "我通常能看清问题的多面性，而不只是坚持己见。", category: AnimalType.CHAMELEON },
  { id: 30, text: "我会根据具体情况灵活调整自己的行为方式。", category: AnimalType.CHAMELEON },
];

export const ANIMAL_INFO = {
  [AnimalType.TIGER]: {
    name: "老虎 (Dominance)",
    icon: "🐅",
    color: "#ef4444",
    traits: ["充满自信", "胸怀大志", "极具竞争力", "果断有力"],
    description: "老虎型性格的人通常具备极强的领导力和目标感。他们喜欢挑战，追求结果，行动迅速，但也可能因为过于强势而忽略他人的感受。",
    advice: "学习倾听他人的意见，适当放慢节奏，增加共情能力。"
  },
  [AnimalType.PEACOCK]: {
    name: "孔雀 (Extroversion)",
    icon: "🦚",
    color: "#8b5cf6",
    traits: ["热情洋溢", "极具魅力", "擅长交际", "乐观积极"],
    description: "孔雀型性格的人是天生的社交高手。他们拥有极强的感召力和说服力，擅长在团队中营造活跃的气氛，但有时可能缺乏对细节的关注和持久的执行力。",
    advice: "提高对细节的关注度，强化执行力和时间管理能力。"
  },
  [AnimalType.KOALA]: {
    name: "考拉 (Patience)",
    icon: "🐨",
    color: "#10b981",
    traits: ["温和包容", "稳定可靠", "善解人意", "追求和谐"],
    description: "考拉型性格的人是极佳的团队成员。他们踏实、有耐心，不喜欢冲突，能为团队提供持久的情感支持，但可能因为回避冲突而显得缺乏决断力。",
    advice: "勇敢地表达自己的需求和观点，在面对变化时提高适应速度。"
  },
  [AnimalType.OWL]: {
    name: "猫头鹰 (Conformity)",
    icon: "🦉",
    color: "#3b82f6",
    traits: ["逻辑严密", "注重细节", "谨言慎行", "客观专业"],
    description: "猫头鹰型性格的人是规则和品质的守护者。他们追求完美，凡事讲究逻辑和证据，是解决复杂问题的专家，但有时可能显得过于死板或吹毛求疵。",
    advice: "接受事物的不完美性，在非原则问题上增加灵活性，减少过度分析。"
  },
  [AnimalType.CHAMELEON]: {
    name: "变色龙 (Adaptability)",
    icon: "🦎",
    color: "#f59e0b",
    traits: ["灵活多变", "极具适应力", "中庸协调", "多才多艺"],
    description: "变色龙型性格的人拥有极强的适应能力。他们没有明显的性格棱角，可以根据环境的需要随时切换角色，是极佳的协调者，但有时可能让人觉得缺乏立场或真实性格模糊。",
    advice: "明确自己的核心价值观和立场，在关键时刻展现果断的一面。"
  }
};
