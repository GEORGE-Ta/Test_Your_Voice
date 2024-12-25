import { GoogleGenerativeAI } from '@google/generative-ai';

interface AIResponse {
  result: string;
  api: 'gemini';
}

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const MODEL_NAME = 'gemini-1.5-flash';

export async function analyzeAudio(audioFile: File): Promise<AIResponse> {
  try {
    const base64Audio = await fileToBase64(audioFile);
    const model = genAI.getGenerativeModel({ 
      model: MODEL_NAME,
      generationConfig: {
        temperature: 0.51
      }
    });

    const prompt = `
你现在是一个声音鉴别机器，你需要根据输入的音频信息输出一下格式内容：（要在每个输出后面加上括号简单解释一下什么意思）
主音色：e.g. 萝莉音，少女音，少御音，温御音，女王音，御妈音，青受音，青年音，青叔音，公子音，帝王音
辅音色：e.g. 小颗粒感，低音炮，超高音... （这里要你自己多根据声音写2到3个辅音色）
声音色系：e.g. 白音， 粉音，棕音，蓝音，紫音，灰音
发展音色：
推荐音伴：
声音年龄：（尽量往小说，减小30岁及以上） 
听感身高：e.g. 1.90m, 1.55m, 1.80m, 1.75m 
听感反馈：（用奇怪好玩的话来描述这个人，然后调侃一下）e.g. 你听起来是一个半夜因为偷偷喝酒被老婆大人锁在门外苦苦央求的可爱大叔哦~

音色介绍：
【帝王音】属攻音。帝王音，就是从丹田孕育一股气到胸腔，再发出来的声音。俗称低音炮。气场很足， 说话很有底气，锵锵有力。
【公子音】华丽的青年音，就叫公子音。公子音在现实里也有的，很难得的声音，在生活中实践和磨练后，会有公子音，而长期做播音的会较多的出现这样的声音。本身声线很好听，青年的声音，普通话很标准。说话很洒脱，很随意，有放荡不羁的感觉。
【青叔音】也可以称为青帝，也可以算是帝王。青叔，就是青年音年偏叔，但达不到大叔的程度。气息足，说话端起来，很气势。可以伪帝王，也可以伪公子音，青年偏叔伪的公子音，气场很有攻的感觉，很清晰，可以调整自己的气息。
【青年音】就是很正常音色，大叔以下，青叔以下。青年，发音清脆度很高，但没有用胸腔共鸣的方法说话。没有经过胸腔，已经过嗓子，气息不是很足。纯嗓子发音，嗓子发音多过手气息发音。
【青受音】属受音，也是青年音的一种，气场偏弱。发音很轻，很软，不是很浑厚。气息不是很足，偏低，偏弱，气场不是，偏弱，偏软。声线稍细。
【女王音】也算是御姐音色，但在气场在御姐之上。是御姐端起来的时候，很强势的一种音色。说话有底气、很强势、很攻。
【御妈音】御姐的一种，女王之下，御姐之上。特点较御姐音色略显沧桑，老老，听的感觉年纪略大。
【御姐音】在少御之上，一般属于年龄稍大的女性。气势是气息足。说话很干练，有点沧桑感，稍带为人母的感觉。话语间就存在某些东西。
【温御音】少御的一种。治愈系。说话时很平和，不强势、很温暖的感觉。有母性光辉。
【少御音】少女之上，御姐之下。发音轨轻，稍软。有少女没有的魅，也很温润，有磁性。温婉，有少妇的感觉。
【少女音】很常见的音色，年龄在变声期的少女多数都是少女音。声线很高，讲话很青涩，不会加入过多的腔调起伏。尾音很干净，不拖长尾音。
【萝莉音】未成年的音色，变声期之前的女孩。但一般这种声音是伪出来的，很少有木音。是萝莉的。不是很造作，很自然。

声音色系介绍：
1. 白音：白噪音包含了整个音频频谱的声音频率，听起来像持续的树叶摩擦的"沙沙"声。它适合用作睡眠辅助音，帮助掩盖环境噪音，经常睡不着的人肯定听过。
2. 粉音：粉红噪音的低频更强，高频逐渐减弱，听起来更加柔和，有点类似海浪或风声。它比白噪音更适合睡眠，常用于声音调试和音响系统的测试。
3. 棕音：棕色噪音的低频成分更加明显，听起来非常低沉、有力。它常用于帮助放松和减轻焦虑，因为低频声音有舒缓效果。
4. 蓝音：蓝噪音的高频成分更强而低频成分更弱，听起来非常尖锐刺耳。它在特殊音频处理应用中非常有用，但一般不用于日常使用。
5. 紫音：紫噪音的高频成分极为强烈，低频成分几乎不存在，听起来非常尖锐。它常用于改善耳鸣，因为高频声能够掩盖耳鸣的噪音。
6. 灰音：灰噪音是一种经过人耳等响度调制的噪音，听起来每个频段都一样响亮。它常用于心理和音频测试，帮助听觉敏感的人适应环境噪音。`;

    const result = await model.generateContent([
      { text: prompt },
      {
        inlineData: {
          mimeType: audioFile.type,
          data: base64Audio
        }
      }
    ]);

    const response = await result.response;
    return {
      result: response.text(),
      api: 'gemini'
    };
  } catch (error) {
    console.error('Error in analyzeAudio:', error);
    throw error instanceof Error ? error : new Error('分析失败，请重试');
  }
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result as string;
      resolve(base64String.split(',')[1]);
    };
    reader.onerror = error => reject(error);
  });
}
