import { Button, Grid, Table, Text, useTheme } from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";
import { TranslationContext } from "../../pages/_app";
import DashboardCard from "./components/dashboard-card/DashboardCard";
import { MISSING_TRANSLATION } from "../../core/const";
import { DashboardCardTranslations } from "../../pages/api/translations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPencil,
  faRocket,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Bundle, CodeSystem } from "fhir/r4";
import { SearchSystem } from "./models/search-system";
import DashboardToolbar from "./components/dashboard-toolbar/DashboardToolbar";
import { CodeSystemService } from "../../core/services/code-system-service/code-system.service";
import { ValueSetService } from "../../core/services/value-set-service/value-set.service";
import { ConceptMapService } from "../../core/services/concept-map-service/concept-map.service";

const Dashboard = () => {
  const [searchSystem, setSearchSystem] = useState<SearchSystem>("codeSystem");
  const [searchString, setSearchString] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Bundle>();

  const [codeSystemCount, setCodeSystemCount] = useState<number>();
  const [valueSetCount, setValueSetCount] = useState<number>();
  const [conceptMapCount, setConceptMapCount] = useState<number>();

  const translations = useContext(TranslationContext);
  const currentTheme = useTheme();

  useEffect(() => {
    CodeSystemService.getInstance()
      .getCodeSystems()
      .then((bundle) => setCodeSystemCount(bundle.total));

    ValueSetService.getInstance()
      .getValueSets()
      .then((bundle) => setValueSetCount(bundle.total));

    ConceptMapService.getInstance()
      .getConceptMaps()
      .then((bundle) => setConceptMapCount(bundle.total));
  }, []);

  const getCardTranslation = (key: string) => {
    return (
      translations?.dashboard.cards[key as keyof DashboardCardTranslations] ??
      MISSING_TRANSLATION
    );
  };

  const search = async () => {
    setIsSearching(true);
    let result;
    switch (searchSystem) {
      case "codeSystem":
        result = await CodeSystemService.getInstance().getCodeSystem(
          searchString
        );
        break;
      case "valueSet":
        result = await ValueSetService.getInstance().getValueSet(searchString);
        break;
      case "conceptMap":
        result = await ConceptMapService.getInstance().getConceptMap(
          searchString
        );
        break;
    }
    setSearchResults(result);
    setIsSearching(false);
  };

  return (
    <div>
      <Grid.Container gap={2}>
        <Grid sm={7} alignItems="flex-start">
          <Grid.Container gap={2}>
            <Grid sm={12}>
              <Text h1 color="primary">
                Dashboard
              </Text>
            </Grid>
            <Grid sm={12}>
              <DashboardToolbar
                isSearching={isSearching}
                searchSystem={searchSystem}
                onSearchInput={(search) => setSearchString(search)}
                onSearchClick={() => search()}
                onSearchSystemChange={(searchSystem) =>
                  setSearchSystem(searchSystem)
                }
              />
            </Grid>
            <Grid sm={4}>
              <DashboardCard
                title={getCardTranslation("codeSystemTitle")}
                count={codeSystemCount ?? 0}
                isLoading={codeSystemCount === undefined}
              />
            </Grid>
            <Grid sm={4}>
              <DashboardCard
                title={getCardTranslation("conceptMapTitle")}
                count={conceptMapCount ?? 0}
                isLoading={conceptMapCount === undefined}
              />
            </Grid>
            <Grid sm={4}>
              <DashboardCard
                title={getCardTranslation("valueSetTitle")}
                count={valueSetCount ?? 0}
                isLoading={valueSetCount === undefined}
              />
            </Grid>
          </Grid.Container>
        </Grid>
        <Grid sm={5}>
          <Grid.Container>
            <Grid sm={12}>
              <Text h1 color="primary" className="text-center w-full">
                Daten
              </Text>
            </Grid>
            <Grid sm={12}>
              {searchResults?.entry ? (
                <Table
                  aria-label="Example table with static content"
                  containerCss={{
                    height: "auto",
                    width: "100%",
                    borderRadius: 0,
                  }}
                >
                  <Table.Header>
                    <Table.Column>ResourceType</Table.Column>
                    <Table.Column>Name</Table.Column>
                    <Table.Column>Status</Table.Column>
                    <Table.Column></Table.Column>
                  </Table.Header>
                  <Table.Body>
                    {searchResults.entry.map((bundleEntry) => {
                      const resource = bundleEntry.resource as CodeSystem;
                      return (
                        <Table.Row key={resource.id}>
                          <Table.Cell>{resource.resourceType}</Table.Cell>
                          <Table.Cell>{resource.name}</Table.Cell>
                          <Table.Cell>{resource.status}</Table.Cell>
                          <Table.Cell>
                            <div className="flex flex-row">
                              <Button auto light size="md">
                                <FontAwesomeIcon icon={faEye} />
                              </Button>
                              <Button auto light size="md">
                                <FontAwesomeIcon icon={faPencil} />
                              </Button>
                              <Button auto light size="md" color="error">
                                <FontAwesomeIcon icon={faTrash} />
                              </Button>
                            </div>
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
              ) : (
                <div className="text-center w-2/3 m-auto pt-16">
                  <FontAwesomeIcon
                    icon={faRocket}
                    color={currentTheme.theme?.colors.primary.value}
                    size="10x"
                  />
                  <Text h3>Keine Daten vorhanden</Text>
                  <Text h4>
                    Suche jetzt nach Daten über das Textfeld im Dashboard um die
                    Ergebnisse hier angezeigt zu bekommen.
                  </Text>
                </div>
              )}
            </Grid>
          </Grid.Container>
        </Grid>
      </Grid.Container>
    </div>
  );
};

export default Dashboard;
