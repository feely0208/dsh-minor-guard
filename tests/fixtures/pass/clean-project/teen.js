// 合规：先识别年龄，判定为儿童则走监护人同意
const teenMode = false;   // 默认关闭，用户主动开启

async function register(phone, birthday) {
  const age = calcAge(birthday);            // 年龄识别
  if (age < 14) {
    await requireGuardianConsent(phone);    // 监护人同意流程
    await saveConsentRecord(phone, 'guardian');  // 留存同意记录
  }
  await db.insert('users', { phone, birthday, teen_mode: false });
}

// 青少年模式需用户主动开启 + 监护人同意
async function enableTeenMode(userId) {
  await requireGuardianConsent(userId);
  await db.update('users').set({ teen_mode: true }).where({ id: userId });
}
