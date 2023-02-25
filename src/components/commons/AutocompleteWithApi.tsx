import { Autocomplete } from "@mantine/core";

function AutocompleteWithApi(props: any) {
  return (
    <Autocomplete
      label="Search"
      placeholder="Enter your search query"
      value={props.searchValue}
      data={props.options}
      onChange={props.handleSearch}
    />
  );
}

export default AutocompleteWithApi;
