import { GuestType } from '@/redux/guests/interfaces';
import { t } from 'i18next';

const { NORMAL, VIP } = GuestType;

export const guestTypeOptions = {
  [NORMAL]: t('common.normal'),
  [VIP]: t('common.vip'),
};
