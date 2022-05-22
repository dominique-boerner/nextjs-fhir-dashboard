import { Button, Text } from "@nextui-org/react";
import React, { useState } from "react";
import { Tab } from "./models/tab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  values: Tab<any>[];
  activeValue: string;
  onTabClick: (value: string) => void;
}

export default function Tabs({
  onTabClick = () => {},
  values = [],
  activeValue,
}: Props) {
  const [value, setValue] = useState(activeValue);

  function isButtonActive(buttonValue: string) {
    return buttonValue === value;
  }

  function handleButtonClick(value: string) {
    setValue(value);
    onTabClick(value);
  }

  const textPaddingStyle = { paddingLeft: "4px" };

  return (
    <Button.Group>
      {values.map((tab) => (
        <Button
          key={tab.value}
          onClick={() => handleButtonClick(tab.value)}
          light={!isButtonActive(tab.value)}
        >
          {tab.icon ? <FontAwesomeIcon icon={tab.icon} /> : null}
          {tab.label ? (
            <Text
              color={!isButtonActive(tab.value) ? "black" : "white"}
              css={tab.icon ? textPaddingStyle : undefined}
            >
              {tab.label}
            </Text>
          ) : null}
        </Button>
      ))}
    </Button.Group>
  );
}
