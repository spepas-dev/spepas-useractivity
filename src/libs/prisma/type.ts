export enum Channel {
  USSD = 'USSD',
  MOBILE = 'MOBILE',
  WEBAPP = 'WEBAPP',
  WEBADMIN = 'WEBADMIN'
}

export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export type UserActivity = {
  id: string;
  userId?: string | null;
  userEmail: string;
  channel: Channel; // Replace with `string` if Channel is not an enum
  title: string;
  description: string;
  action: string;
  verb?: string | null;
  endpoint?: string | null;
  requestBody?: JsonValue | null;
  statusCode?: number | null;
  country: string;
  city: string;
  deviceIpAddress: string;
  deviceTpe: string;
  browserName?: string | null;
  createdAt: Date;
};
