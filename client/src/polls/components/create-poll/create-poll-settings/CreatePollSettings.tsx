import { FC } from "react";
import "./CreatePollSettings.scss";
import {
  PollSettingOption,
  PollSettingsKeys,
  PollSettingsState,
} from "../use-poll-settings";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { classIf } from "../../../../utils/class-if";

interface Props {
  settingsOptions: PollSettingOption[];
  pollSettings: PollSettingsState;
  toggleSetting: (name: PollSettingsKeys) => void;
}

const CreatePollSettings: FC<Props> = ({
  settingsOptions,
  pollSettings,
  toggleSetting,
}) => {
  return (
    <div className="create_poll_section">
      <div className="create_poll_label">Settings</div>

      <FormGroup>
        {settingsOptions.map(({ name, title, disabled }) => (
          <FormControlLabel
            className="settings_form_label"
            key={name}
            control={
              <Checkbox
                className={
                  "settings_checkbox" + classIf(pollSettings[name], "checked")
                }
                checked={pollSettings[name]}
                disabled={disabled}
                onChange={() => toggleSetting(name)}
              />
            }
            label={title}
          />
        ))}
      </FormGroup>
    </div>
  );
};

export default CreatePollSettings;
