# @deepwhale-cn/dsh-minor-guard

**未成年人保护** —— 查不满 14 周岁个人信息有没有监护人同意、专门规则、年龄门槛。

## 不装它会怎样

你的 App 有注册、有青少年模式，代码里这样写：

```js
const teenMode = true;      // 默认开启
async function register(phone) {
  await db.insert('users', { phone, teen_mode: teenMode });
}
```

**看着挺贴心，实际踩了三条：**

```
《个人信息保护法》第三十一条
  —— 处理不满十四周岁未成年人个人信息的，
     应当取得父母或者其他监护人的同意，
     并制定【专门的】个人信息处理规则
```

1. **没有监护人同意** —— 同意必须来自监护人，不是孩子本人
2. **没有年龄识别** —— 你都不知道用户是不是儿童，怎么触发监护人同意？
3. **青少年模式默认开启** —— 用户什么都没做就进入了该模式

## 关键词
**关键词**：未成年人保护 · 儿童个人信息 · 监护人同意 · 青少年模式 · 年龄识别 · 个保法 31 条 · 儿童隐私
**Keywords**: minor protection · children privacy · guardian consent · parental consent · teen mode · PIPL

## 它查什么

| 级别 | 内容 |
|---|---|
| 🔴 高 | 有未成年人功能但**找不到监护人同意** · 找不到**专门的儿童保护规则** |
| 🟡 中 | 有注册但**找不到年龄识别** · 青少年模式**默认开启** |

## 一条规则只在特定项目上运行

**`MINOR-NO-GUARDIAN-CONSENT` 只在检测到未成年人相关功能时才跑**（识别标志：青少年模式 / teenMode / 儿童模式…）。

普通项目跑这条就是误报 —— 这是引擎的**条件规则**能力（`check.when`）。

## 安装

```bash
dsh plugin --profile web add @deepwhale-cn/dsh-minor-guard
# 或纯 CLI
npx @deepwhale-cn/dsh-minor-guard
```

![dsh-minor-guard 检查报告示例](https://www.deepwhale.org.cn/plugin-assets/dsh-minor-guard/report.png)

![dsh-minor-guard 演示模式输出](https://www.deepwhale.org.cn/plugin-assets/dsh-minor-guard/demo.png)

![dsh-minor-guard 规则与依据](https://www.deepwhale.org.cn/plugin-assets/dsh-minor-guard/rules.png)

## 用法

```bash
dsh-minor-guard --demo
dsh-minor-guard --list-rules
dsh-minor-guard --html r.html
```

## 边界

- **只看代码，不看实际产品** —— 监护人同意可能是线下短信流程，代码里看不到。
- **「默认开启」识别是启发式的** —— 它会**跳过已经实现监护人同意流程的文件**
  （那种情况下的开启是合规的）。文件级排除，粒度较粗。
- **年龄识别只认常见写法**（年龄字段 / 出生日期 / birthday）—— 自定义字段名会漏。
- **不覆盖行业特殊规定**（如游戏防沉迷的时长限制），只做个人信息保护维度。
- 与 [dsh-consent-guard](https://github.com/feely0208/dsh-consent-guard) 分工：
  那个查**一般用户**的同意机制，这个专查 **未成年人**的特殊要求。

本插件是一个工具。使用者必须遵守所在地区法律法规，**对使用本项目造成的任何后果自行承担责任。**

---

## 深鲸网安守护系列（共 31 个）

> 一个插件做一件事。**安全问题是链式的** —— 配套用才完整。

**国内合规** ｜ [等保对照](https://github.com/feely0208/dsh-cn-mlps) · [日志留存](https://github.com/feely0208/dsh-cn-log-retention) · [备案公示](https://github.com/feely0208/dsh-cn-filing) · [用户同意](https://github.com/feely0208/dsh-consent-guard) · [个人信息权利](https://github.com/feely0208/dsh-data-rights) · [**未成年人保护**](https://github.com/feely0208/dsh-minor-guard) · [影响评估](https://github.com/feely0208/dsh-pipia) · [数据分类分级](https://github.com/feely0208/dsh-data-classify) · [算法备案](https://github.com/feely0208/dsh-algorithm-filing) · [数据出境](https://github.com/feely0208/dsh-cn-data-export) · [国密合规](https://github.com/feely0208/dsh-cn-crypto) · [AI 内容标识](https://github.com/feely0208/dsh-cn-ai-labeling)

**AI 与 Agent 治理** ｜ [AI 输出信任](https://github.com/feely0208/dsh-ai-output-trust) · [外部内容信任](https://github.com/feely0208/dsh-content-trust) · [MCP 安全](https://github.com/feely0208/dsh-mcp-audit) · [Agent 权限](https://github.com/feely0208/dsh-agent-scope) · [策略核对](https://github.com/feely0208/dsh-agent-policy) · [可疑指令](https://github.com/feely0208/dsh-phishing-guard)

**数据与凭据** ｜ [敏感数据](https://github.com/feely0208/dsh-data-scan) · [密钥轮换](https://github.com/feely0208/dsh-key-rotate) · [数据留存](https://github.com/feely0208/dsh-data-lifecycle) · [配置审计](https://github.com/feely0208/dsh-env-audit) · [密钥扫描](https://github.com/feely0208/dsh-secret-scan)

**供应链与构建** ｜ [开源许可](https://github.com/feely0208/dsh-license-guard) · [依赖投毒](https://github.com/feely0208/dsh-dep-audit) · [CI 安全](https://github.com/feely0208/dsh-ci-guard) · [工具审查](https://github.com/feely0208/dsh-tool-vet) · [物料清单](https://github.com/feely0208/dsh-sbom)

**权限与应急** ｜ [最小权限](https://github.com/feely0208/dsh-least-privilege) · [告警外发](https://github.com/feely0208/dsh-alert-relay) · [应急证据包](https://github.com/feely0208/dsh-incident-package)

都在 DSH 插件市场（dsh-plugin.org）、npm 和 deepwhale.org.cn/guard.html 上。
