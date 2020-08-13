import React, { useState } from "react";
import Button from "./Button";
import Dropdown from "./Dropdown";
import { ReactComponent as SettingsIcon } from "../icons/settings.svg";
import { ReactComponent as SaveIcon } from "../icons/save.svg";
import "./FormHeader.css";

function FormHeader({ buttonText, onSearch }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  return (
    <div className="form-header">
      <input
        onChange={onSearch}
        type="search"
        className="search"
        placeholder="Search for properties..."
      />

      <div className="group">
        <Button
          variant="transparent"
          aria-haspopup="true"
          aria-expanded={isDropdownVisible}
          aria-label="Settings"
          onClick={() => setIsDropdownVisible(!isDropdownVisible)}
          active={isDropdownVisible}
        >
          <SettingsIcon width="22" height="22" />
        </Button>

        <Button disabled={buttonText !== "Save changes"} type="submit">
          <SaveIcon width="18" height="18" />

          {buttonText}
        </Button>

        <Dropdown
          isVisible={isDropdownVisible}
          onClose={() => setIsDropdownVisible(false)}
        />
      </div>
    </div>
  );
}

export default FormHeader;
