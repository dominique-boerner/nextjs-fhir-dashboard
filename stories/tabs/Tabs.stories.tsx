import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Tabs } from "components";

export default {
  title: "common/Tabs",
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Default = Template.bind({});
Default.args = {
  values: ["1", "2", "3"],
  activeValue: "2",
};
