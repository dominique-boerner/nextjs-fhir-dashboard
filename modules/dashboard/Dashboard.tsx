import { Grid, Text } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import DashboardCard from "./components/dashboard-card/DashboardCard";
import { Bundle, CodeSystem, ConceptMap, ValueSet } from "fhir/r4";
import { systems, System } from "./models/system";
import DashboardToolbar from "./components/dashboard-toolbar/DashboardToolbar";
import {
  SearchService,
  ValueSetService,
  ConceptMapService,
  TranslationService,
  CodeSystemService,
} from "services";
import { Table } from "components";

export default function Dashboard() {
  const [system, setSystem] = useState<System>(systems[0]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<Bundle>();
  const [codeSystemCount, setCodeSystemCount] = useState<number>();
  const [valueSetCount, setValueSetCount] = useState<number>();
  const [conceptMapCount, setConceptMapCount] = useState<number>();
  const [tableRows, setTableRows] = useState<string[][]>([[""]]);

  const tableHeader = ["ResourceType", "Name", "Status", ""];

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

  useEffect(() => {
    setSearchTerm("");
    search("");
  }, [system]);

  useEffect(() => showResults(), [results]);

  function search(search = searchTerm) {
    setIsSearching(true);
    SearchService.getInstance()
      .search(system, search)
      .then((result) => {
        setResults(result);
      });
  }

  function showResults() {
    setIsSearching(false);
    if (results) {
      const tableRows = results?.entry?.map((bundleEntry) => {
        const resource = bundleEntry.resource as
          | CodeSystem
          | ConceptMap
          | ValueSet;
        return [resource?.resourceType, resource.name, resource.status, ""];
      }) ?? [[]];
      setTableRows(tableRows as string[][]);
    }
  }

  return (
    <div>
      <Grid.Container gap={2}>
        <Grid sm={12} alignItems="flex-start">
          <Grid.Container gap={2}>
            <Grid sm={12}>
              <Text h1 color="primary">
                Dashboard
              </Text>
            </Grid>
            <Grid sm={12}>
              <DashboardToolbar
                isSearching={isSearching}
                searchSystem={system}
                searchTerm={searchTerm}
                onSearchInput={(search) => setSearchTerm(search)}
                onSearchClick={() => search()}
                onSystemChange={(system) => setSystem(system)}
                onClearClick={() => search("")}
              />
            </Grid>
            <Grid sm={4}>
              <DashboardCard
                title={TranslationService.getInstance().getDashboardCardTranslations(
                  "codeSystemTitle"
                )}
                count={codeSystemCount ?? 0}
                isLoading={codeSystemCount === undefined}
              />
            </Grid>
            <Grid sm={4}>
              <DashboardCard
                title={TranslationService.getInstance().getDashboardCardTranslations(
                  "conceptMapTitle"
                )}
                count={conceptMapCount ?? 0}
                isLoading={conceptMapCount === undefined}
              />
            </Grid>
            <Grid sm={4}>
              <DashboardCard
                title={TranslationService.getInstance().getDashboardCardTranslations(
                  "valueSetTitle"
                )}
                count={valueSetCount ?? 0}
                isLoading={valueSetCount === undefined}
              />
            </Grid>
          </Grid.Container>
        </Grid>
      </Grid.Container>
      <Grid.Container gap={2}>
        <Grid sm={12}>
          <Text h1 color="primary">
            Daten
          </Text>
        </Grid>
        <Grid sm={12}>
          {results ? (
            <Table
              isLoading={isSearching}
              header={tableHeader}
              rows={tableRows}
              resultCount={results?.total ?? 0}
            />
          ) : null}
        </Grid>
      </Grid.Container>
    </div>
  );
}
