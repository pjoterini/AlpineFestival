import { t } from "i18next";

enum SpeechLength {
  min0_15 = "0-15",
  min15_30 = "15-30",
  min30_45 = "30-45",
  min45_60 = "45-60",
  min60_75 = "60-75",
  min75_90 = "75-90",
}

const { min0_15, min15_30, min30_45, min45_60, min60_75, min75_90 } =
  SpeechLength;

export const speechLengthOptions = {
  [min0_15]: t("guestForm.min0_15"),
  [min15_30]: t("guestForm.min15_30"),
  [min30_45]: t("guestForm.min30_45"),
  [min45_60]: t("guestForm.min45_60"),
  [min60_75]: t("guestForm.min60_75"),
  [min75_90]: t("guestForm.min75_90"),
};
