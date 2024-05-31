import React from "react"
import { capitalizeFirstLetter } from "../../utils/stringUtils"

const ListItem = ({ item, property }) => (
  <span className="pointer flex-container">
    <strong>{capitalizeFirstLetter(item[property])}</strong>
  </span>
)

export default ListItem
