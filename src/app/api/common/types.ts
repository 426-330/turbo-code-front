// 用户标识类型
export type UserIdentifier = {
  deviceId?: string;
  username?: string;
  token?: string;
};

// 订阅信息类型
export type SubscriptionInfo = {
  subscribed: boolean;
  details?: Record<string, any>;
};

// 查询订阅请求
export type CheckSubscriptionRequest = UserIdentifier;
export type CheckSubscriptionResponse = SubscriptionInfo;

// 查询价格请求
export type PricesRequest = {
  productId: string;
};
export type PricesResponse = {
  prices: Array<Record<string, any>>;
};

// 创建订阅请求
export type CreateSubscriptionRequest = {
  productId: string;
  user: UserIdentifier;
};
export type CreateSubscriptionResponse = {
  success: boolean;
  sessionUrl?: string;
  error?: string;
}; 