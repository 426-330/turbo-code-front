import { UserIdentifier, SubscriptionInfo } from './types';

// 获取用户标识（优先级：token > username > deviceId）
export const getUserIdentifier = (body: { token?: string; username?: string; deviceId?: string }): UserIdentifier => {
  const { token, username, deviceId } = body || {};
  if (token) return { token };
  if (username) return { username };
  if (deviceId) return { deviceId };
  return {};
};

// 伪数据库：查询用户订阅
export const fakeDbCheckSubscription = async (user: UserIdentifier): Promise<SubscriptionInfo> => {
  // 这里用伪逻辑，实际应查询数据库
  if (user.token || user.username || user.deviceId) {
    return { subscribed: true, details: { plan: 'basic', until: '2099-12-31' } };
  }
  return { subscribed: false };
};

// 伪数据库：写入订阅
export const fakeDbCreateSubscription = async () => {
  // 这里用伪逻辑，实际应写入数据库
  return true;
}; 