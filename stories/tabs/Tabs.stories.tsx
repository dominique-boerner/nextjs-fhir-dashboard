import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Tabs} from "components";
import {Tab} from "components/tabs/models/tab";
import {faAlignCenter, faAlignLeft, faAlignRight} from "@fortawesome/free-solid-svg-icons";

export default {
  title: "common/Tabs",
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Default = Template.bind({});
const defaultValues: Tab<string>[] = [
  {
    value: "1",
    label: "1"
  },
  {
    value: "2",
    label: "2"
  },
  {
    value: "3",
    label: "3"
  }
]
Default.args = {
  values: defaultValues,
  activeValue: "2",
};

export const Icons = Template.bind({});
const iconsValues: Tab<string>[] = [
  {
    value: "left",
    icon: faAlignLeft
  },
  {
    value: "center",
    icon: faAlignCenter
  },
  {
    value: "right",
    icon: faAlignRight
  }
]
Icons.args = {
  values: iconsValues,
  activeValue: "left",
};

export const IconsAndText = Template.bind({});
const withIconsAndTextValues: Tab<string>[] = [
  {
    value: "left",
    label: "Left",
    icon: faAlignLeft
  },
  {
    value: "center",
    label: "Center",
    icon: faAlignCenter
  },
  {
    value: "right",
    label: "Right",
    icon: faAlignRight
  }
]
IconsAndText.args = {
  values: withIconsAndTextValues,
  activeValue: "left",
};
