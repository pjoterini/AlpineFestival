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

export const speechLengthOptions = [
  {
    [min0_15]: t("guestForm.min0_15"),
  },
  // {
  //   value: "0-15",
  //   label: "less than 15",
  // },
  // {
  //   value: "15-30",
  //   label: "15 to 30",
  // },
  // {
  //   value: "30-45",
  //   label: "30 to 45",
  // },
  // {
  //   value: "45-60",
  //   label: "45 to 60",
  // },
  // {
  //   value: "60-75",
  //   label: "60 to 75",
  // },
  // {
  //   value: "75-90",
  //   label: "75 to 90",
  // },
];
