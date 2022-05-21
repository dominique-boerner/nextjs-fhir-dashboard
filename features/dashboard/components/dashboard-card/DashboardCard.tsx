import { Card, Loading, Text } from "@nextui-org/react";
import React from "react";
import Link from "next/link";

interface Props {
  title: string;
  count: number;
  isLoading: boolean;
}

function DashboardCard({ title, count, isLoading }: Props) {
  return (
    <Card cover css={{ borderRadius: 0, height: 200 }}>
      <Card.Header
        css={{
          height: "100%",
        }}
      >
        <div className="h-full w-full flex flex-col justify-between">
          <Link href="/">
            <Text h6 transform="uppercase" className="underline">
              {title}
            </Text>
          </Link>
          <Text h1 className="self-end">
            {isLoading ? (
              <Loading type="spinner" size="xl" color="primary" />
            ) : (
              count
            )}
          </Text>
        </div>
      </Card.Header>
    </Card>
  );
}

export default DashboardCard;
