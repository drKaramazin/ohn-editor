import { Profiles } from './profiles';

export interface User {
  profile?: any;
  username?: string;
  name?: string;
  smart_contract?: string;
  confirmed_at?: string;
  registered_at?: string;
  profiles?: Profiles;
  is_sms_allowed?: any;
  phone?: string;
  email?: string;
  roles?: string[];
  active?: boolean;
  apps_authorized?: string[];
  id?: string;
  permissions?: any[];
}
