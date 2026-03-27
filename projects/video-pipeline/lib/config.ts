// API配置 - 从环境变量读取
export const config = {
  // MiniMax LLM
  minimax: {
    apiKey: process.env.MINIMAX_API_KEY || '',
    baseUrl: process.env.MINIMAX_BASE_URL || 'https://api.minimax.chat/v1',
    model: process.env.MINIMAX_MODEL || 'MiniMax-Text-01',
  },
  
  // 即梦AI (使用火山引擎)
  jimeng: {
    accessKey: process.env.JIMENG_ACCESS_KEY || '',
    secretKey: process.env.JIMENG_SECRET_KEY || '',
    region: process.env.JIMENG_REGION || 'cn-north-1',
    endpoint: 'https://visual.volcengineapi.com',
    action: 'CVSync2AsyncSubmitTask',
    version: '2022-08-31',
  },
  
  // 可灵AI
  kling: {
    accessKey: process.env.KLING_ACCESS_KEY || '',
    secretKey: process.env.KLING_SECRET_KEY || '',
    baseUrl: process.env.KLING_BASE_URL || 'https://api.klingai.com',
  },
  
  // 存储
  storage: {
    dataDir: process.env.DATA_DIR || './data',
    assetsDir: process.env.ASSETS_DIR || './assets',
  }
}

export function hasMinimaxKey(): boolean {
  return !!config.minimax.apiKey
}

export function hasJimengKey(): boolean {
  return !!config.jimeng.accessKey
}

export function hasKlingKey(): boolean {
  return !!config.kling.accessKey
}
