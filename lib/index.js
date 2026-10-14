import { createPlugin, pkgRootFrom } from '@deepwhale-cn/dsh-guard-core/plugin';

export const { name, inject, apply } = createPlugin({
  name: 'minor-guard',
  pkgRoot: pkgRootFrom(import.meta.url),
  skillFile: 'skill/minor-guard.md',
  binFile: 'bin/cli.mjs',
  description: '查不满 14 周岁个人信息有没有监护人同意、专门规则、年龄门槛 —— 个保法 31 条有硬要求',
  whenToUse: 'TODO：写清什么时候该用（用户会说的话也列上）',
});
