# 新艾利都信标 (New Eridu Beacon)

一个为《绝区零》玩家打造的AI驱动型综合情报站。

## 概述

本项目旨在打造一个集数据查询、深度计算、智能分析与动态资讯于一体的，专为《绝区零》玩家设计的新一代综合服务平台。平台将以游戏独特的UI风格为基础，深度集成先进的AI大语言模型和多模态技术，成为玩家探索“新艾利都”时最智能、最可靠的“绳匠”助手。

## ✨ 已实现功能

- **UI框架**: 基于《绝区零》潮酷、动感风格的暗色主题UI界面。
- **数据百科**: 展示游戏角色、音擎、邦布等核心信息的图鉴。
- **伤害计算器**: 一款功能性的伤害模拟工具，允许用户选择角色并输入自定义属性来计算伤害。
- **用户共建**: 允许用户通过表单提交游戏中缺失的角色数据，并通过API进行添加。

## 🛠️ 技术栈

- **前端**: [Vue 3](https://vuejs.org/) (Vite), [Pinia](https://pinia.vuejs.org/), [Vue Router](https://router.vuejs.org/)
- **后端**: [Python 3](https://www.python.org/), [FastAPI](https://fastapi.tiangolo.com/)
- **代码风格**: ESLint, Prettier

## 📂 项目结构

```
.
├── backend/         # Python FastAPI 后端
│   ├── venv/        # 虚拟环境 (被 .gitignore 忽略)
│   ├── main.py      # API 应用主文件
│   └── requirements.txt
└── frontend/        # Vue 3 前端
    └── app/         # Vue 项目源码
        ├── src/
        └── package.json
```

## 🚀 本地运行指南

请确保您的系统中已安装 [Node.js](https://nodejs.org/) (v18+) 和 [Python](https://www.python.org/) (v3.9+)。

### 1. 启动后端服务

```bash
# 1. 进入后端目录
cd backend

# 2. 创建并激活Python虚拟环境
python3 -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

# 3. 安装依赖
pip install -r requirements.txt

# 4. 启动FastAPI服务
# 服务将运行在 http://localhost:8000
uvicorn main:app --reload
```

### 2. 启动前端开发服务器

```bash
# 1. (在另一个终端中) 进入前端应用目录
cd frontend/app

# 2. 安装npm依赖
npm install

# 3. 启动Vite开发服务器
# 应用将可以从 http://localhost:5173 访问
npm run dev
```

### 3. API 文档

当后端服务运行时，您可以通过浏览器访问自动生成的交互式API文档：

- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)
