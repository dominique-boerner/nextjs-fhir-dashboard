import { Button, Input, Loading } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { FunctionComponent, useContext } from "react";
import { SearchSystem, searchSystems } from "../../models/search-system";
import { TranslationContext } from "../../../../pages/_app";

export interface IDashboardToolbar {
  searchSystem: SearchSystem;
  isSearching: boolean;
  onSearchSystemChange: (searchSystem: SearchSystem) => void;
  onSearchInput: (search: string) => void;
  onSearchClick: () => void;
}

const DashboardToolbar: FunctionComponent<IDashboardToolbar> = ({
  searchSystem,
  isSearching,
  onSearchSystemChange,
  onSearchInput,
  onSearchClick,
}) => {
  const translations = useContext(TranslationContext);

  const buttonSearchSystemClick = (searchSystem: SearchSystem) => {
    onSearchSystemChange(searchSystem);
  };

  const isSearchSystemActive = (system: SearchSystem) => {
    return searchSystem === system;
  };

  return (
    <>
      <Button.Group>
        {searchSystems.map((searchSystem) => (
          <Button
            key={searchSystem}
            onClick={() => buttonSearchSystemClick(searchSystem)}
            light={!isSearchSystemActive(searchSystem)}
          >
            {translations?.common[searchSystem]}
          </Button>
        ))}
      </Button.Group>
      <Input
        clearable
        placeholder="Suchen..."
        contentRight={
          isSearching ? (
            <Loading type="spinner" size="sm" color="primary" />
          ) : (
            <Button auto onClick={() => onSearchClick()}>
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          )
        }
        onChange={(e) => onSearchInput(e.target.value)}
      />
    </>
  );
};

export default DashboardToolbar;
