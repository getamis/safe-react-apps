import React from "react";
import {
  Button,
  WidgetWrapper,
  Select,
  Title,
  Section,
  Text,
  TextField
} from "../../components";
import { ListItem } from "@material-ui/core";

const addressList = [
  { id: "sub1", label: "sub1.myname.eth" },
  { id: "sub2", label: "sub2.myname.eth" },
  { id: "sub3", label: "sub3.myname.eth" }
];

function ENS() {
  return (
    <div>
      <WidgetWrapper>
        <Title>ENS Manager</Title>
        <Text size="lg">My Company Safe</Text>
        <Text>0x2s...h1D8</Text>
        <Select
          size="lg"
          items={addressList}
          activeItemId="sub1"
          onItemClick={() => {}}
        />
      </WidgetWrapper>
      // Second screen
      <Title>ENS Manager</Title>
      <Text size="lg">myname.eth</Text>
      <Text>0x2s...h1D8</Text>
      <Text size="lg">Subdomain</Text>
      {/* <List>
        <ListItem>sub1.myname.eth</ListItem>
        <ListItem>sub2.myname.eth</ListItem>
        <ListItem>sub3.myname.eth</ListItem>
      </List> */}
    </div>
  );
}

export default ENS;
