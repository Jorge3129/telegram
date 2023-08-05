import { useCallback, useEffect, useMemo, useState } from "react";

export type PollSettingsState = {
  isAnonymous: boolean;
  isMultipleChoice: boolean;
  isQuiz: boolean;
};

export type PollSettingsKeys = keyof PollSettingsState;

export type PollSettingOption = {
  name: PollSettingsKeys;
  title: string;
  disabled?: boolean;
};

export const usePollSettings = () => {
  const [pollSettings, setPollSettings] = useState<PollSettingsState>({
    isAnonymous: true,
    isMultipleChoice: false,
    isQuiz: false,
  });

  const toggleSetting = useCallback((name: PollSettingsKeys) => {
    setPollSettings((settings) => ({
      ...settings,
      [name]: !settings[name],
    }));
  }, []);

  useEffect(() => {
    if (pollSettings.isQuiz) {
      setPollSettings((settings) => ({
        ...settings,
        isMultipleChoice: false,
      }));
    }
  }, [pollSettings.isQuiz]);

  const settingsOptions: PollSettingOption[] = useMemo(
    () => [
      {
        name: "isAnonymous",
        title: "Anonymous voting",
      },
      {
        name: "isMultipleChoice",
        title: "Multiple answers",
        disabled: pollSettings.isQuiz,
      },
      { name: "isQuiz", title: "Quiz mode" },
    ],
    [pollSettings.isQuiz]
  );

  return {
    pollSettings,
    settingsOptions,
    toggleSetting,
  };
};
