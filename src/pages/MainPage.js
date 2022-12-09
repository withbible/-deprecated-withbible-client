import React from "react";

//INTERNAL IMPORT
import { AppBar, Category, SearchBar, Wrapper } from "../components";

const MainPage = (_) => {
  return (
    <Wrapper>
      <Wrapper.Header>
        <AppBar />
      </Wrapper.Header>

      <Wrapper.Body>
        <SearchBar />

        <Category />
      </Wrapper.Body>
    </Wrapper>
  );
};

export default MainPage;
