import { Button } from "@nextui-org/react";
import React, { useState } from "react";

interface Props {
  values: string[];
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

  return (
    <Button.Group>
      {values.map((value) => (
        <Button
          key={value}
          onClick={() => handleButtonClick(value)}
          light={!isButtonActive(value)}
        >
          {value}
        </Button>
      ))}
    </Button.Group>
  );
}
