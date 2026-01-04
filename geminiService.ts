
import { GoogleGenAI } from "@google/genai";
import { AnimalType, ScoreProfile } from "./types";

export const getDeepAnalysis = async (primaryType: AnimalType, scores: ScoreProfile) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const scoreSummary = Object.entries(scores)
    .map(([key, val]) => `${key}: ${val}`)
    .join(", ");

  const prompt = `
    作为一名资深心理学家和职业规划顾问，请根据以下 PDP 动物性格测试结果提供深度分析。
    
    用户的主要性格类型是：${primaryType}。
    各项原始得分（1-5分制平均分）：${scoreSummary}。
    
    请提供以下内容的详细分析（使用 Markdown 格式）：
    1. **性格深度剖析**：解释该用户性格的核心动力和潜在盲点。
    2. **职场表现预测**：在团队合作、压力处理和决策风格方面的表现。
    3. **人际关系建议**：如何更好地与不同性格类型（老虎、孔雀、考拉、猫头鹰）的人相处。
    4. **未来成长建议**：为了职业和个人成长，用户应该刻意练习哪些技能或态度。
    
    回复请亲切、客观、具有启发性，字数约 500 字左右。
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "抱歉，暂时无法获取 AI 深度分析。建议根据您的得分查看各动物性格的基础建议。";
  }
};
