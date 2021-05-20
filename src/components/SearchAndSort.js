import React, { Component } from "react";
import Sort from "./Sort";
import Search from "./Search";

class SearchAndSort extends Component {
  render() {
    return (
      <div className="row mt-15">
        <Search />
        <Sort />
      </div>
    );
  }
}

export default SearchAndSort;
