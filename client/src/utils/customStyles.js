export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#1A1A1A",
    borderColor: state.isFocused ? "#262626" : "#262626",
    boxShadow: state.isFocused ? "0 0 0 1px #262626" : "none",
    color: "#999999",
    "&:hover": {
      borderColor: "#262626",
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#1A1A1A",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#262626" : "#1A1A1A",
    color: "#999999",
    "&:hover": {
      backgroundColor: "#262626",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#999999",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "white",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#141414",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#999999",
    ":hover": {
      backgroundColor: "white",
      color: "#141414",
    },
  }),
};
