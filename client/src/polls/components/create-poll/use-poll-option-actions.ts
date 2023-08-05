import _ from "lodash";
import { useState, useEffect, useCallback } from "react";
import { v4 as uuid } from "uuid";
import { PollOptionState } from "./create-poll-form/CreatePollForm";
import { StateTuple } from "../../../shared/types/state-tuple";

export const usePollOptionActions = () => {
  const [options, setOptions] = useState<PollOptionState[]>([]);
  const [addOptionText, setAddOptionText] = useState("");

  useEffect(() => {
    const addOption = (option: PollOptionState) => {
      setOptions((options) => [...options, option]);
    };

    if (!addOptionText) {
      return;
    }

    addOption({ id: uuid(), text: addOptionText });

    setAddOptionText("");
  }, [addOptionText]);

  const editOption = useCallback(
    (id: string, value: Partial<PollOptionState>) => {
      setOptions((options) => {
        const currentOption = _.find(options, { id });

        if (!currentOption) {
          return options;
        }

        return options.map((option) =>
          option.id === currentOption.id ? Object.assign(option, value) : option
        );
      });
    },
    []
  );

  const removeOption = useCallback((removedId: string) => {
    setOptions((options) => {
      return options.filter((option) => option.id !== removedId);
    });
  }, []);

  return {
    options,
    editOption,
    removeOption,
    addOptionState: [addOptionText, setAddOptionText] as StateTuple<string>,
  };
};
