export enum Channel {
  USSD = 'USSD',
  MOBILE = 'MOBILE',
  WEBAPP = 'WEBAPP',
  WEBADMIN = 'WEBADMIN',
  GATEWAY = 'GATEWAY'
}

export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export type UserActivity = {
  id: string;
  userId?: string | null;
  channel: Channel; // Replace with `string` if Channel is not an enum
  title: string;
  description: string;
  action: string;
  verb?: string | null;
  endpoint?: string | null;
  requestBody?: JsonValue | null;
  statusCode?: number | null;
  country?: string;
  city?: string;
  deviceIpAddress?: string;
  deviceOs?: string;
  deviceType?: string;
  browserName?: string | null;
  createdAt: Date;
};
