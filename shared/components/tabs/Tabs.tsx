import { systems } from "../../../features/dashboard/models/system";
import { Button } from "@nextui-org/react";
import React, { useContext } from "react";
import { TranslationContext } from "../../../pages/_app";

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
  function isButtonActive(value: string) {
    return value === activeValue;
  }

  return (
    <Button.Group>
      {values.map((value) => (
        <Button
          key={value}
          onClick={() => onTabClick(value)}
          light={!isButtonActive(value)}
        >
          {value}
        </Button>
      ))}
    </Button.Group>
  );
}
