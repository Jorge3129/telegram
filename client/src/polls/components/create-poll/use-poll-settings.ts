import { useState } from "react";

export type PollSettingsState = {
  isAnonymous: boolean;
  isMultipleChoice: boolean;
  isQuiz: boolean;
};

export type PollSettingsKeys = keyof PollSettingsState;

export type PollSettingOption = {
  name: PollSettingsKeys;
  title: string;
};

export const usePollSettings = () => {
  const [pollSettings, setPollSettings] = useState<PollSettingsState>({
    isAnonymous: true,
    isMultipleChoice: false,
    isQuiz: false,
  });

  const toggleSetting = (name: PollSettingsKeys) => {
    setPollSettings((settings) => ({
      ...settings,
      [name]: !settings[name],
    }));
  };

  const settingOptions: PollSettingOption[] = [
    { name: "isAnonymous", title: "Anonymous voting" },
    { name: "isMultipleChoice", title: "Multiple answers" },
    { name: "isQuiz", title: "Quiz mode" },
  ];

  return {
    pollSettings,
    settingOptions,
    toggleSetting,
  };
};
