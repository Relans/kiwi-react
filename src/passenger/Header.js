import React from "react";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Kiwicom from "@kiwicom/orbit-components/lib/icons/Kiwicom";

function Header() {
  return (
    <Heading>
      <Kiwicom
        size="large"
        color={null}
        dataTest="test"
        ariaLabel="label"
        ariaHidden
      />{" "}
      Kiwi.com
    </Heading>
  );
}

export default Header;
