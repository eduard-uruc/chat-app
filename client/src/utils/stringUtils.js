import upperFirst from "lodash/upperFirst"
import toLower from "lodash/toLower"
import _ from "lodash"

export const capitalizeFirstLetter = (string) => {
  return upperFirst(toLower(string))
}

export const capitalizedFullString = (string) => {
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}

export const getAcronym = (name) => {
  return _.chain(name)
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpper()
    .value()
}
