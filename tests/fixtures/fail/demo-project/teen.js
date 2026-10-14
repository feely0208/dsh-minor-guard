// 反面样本：只开了个少年模式的开关，没有配套的同意流程
const teenMode = true;
async function register(phone) {
  await db.insert('users', { phone, teen_mode: teenMode });
}
