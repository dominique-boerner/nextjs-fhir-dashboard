import { Loading, Table as NUITable, Text, useTheme } from "@nextui-org/react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";

interface Props {
  header: string[];
  rows: string[][];
  isLoading?: boolean;
  resultCount: number;
}

export default function Table({
  isLoading = false,
  rows = [[""]],
  header = [""],
  resultCount = 0,
}: Props) {
  const currentTheme = useTheme();

  function hasNoResults() {
    return resultCount === 0 || rows[0].length !== header.length;
  }

  if (isLoading) {
    return (
      <div className="text-center w-2/3 m-auto pt-16">
        <Loading type="default" size="xl" color="primary" />
        <Text h2 color="primary">
          Suchen
        </Text>
      </div>
    );
  }

  if (hasNoResults()) {
    return (
      <div className="text-center w-2/3 m-auto pt-16">
        <FontAwesomeIcon
          icon={faRocket}
          color={currentTheme.theme?.colors.primary.value}
          size="10x"
        />
        <Text h3>Keine Daten vorhanden</Text>
        <Text h4>Für Ihre Suche wurden leider keine Daten gefunden.</Text>
      </div>
    );
  }

  return (
    <NUITable
      containerCss={{
        height: "auto",
        width: "100%",
        borderRadius: 0,
      }}
    >
      <NUITable.Header>
        {header.map((item) => (
          <NUITable.Column key={item}>{item}</NUITable.Column>
        ))}
      </NUITable.Header>
      <NUITable.Body>
        {rows.map((row, i) => (
          <NUITable.Row key={i}>
            {row.map((col) => (
              <NUITable.Cell key={col}>{col}</NUITable.Cell>
            ))}
          </NUITable.Row>
        ))}
      </NUITable.Body>
    </NUITable>
  );
}
