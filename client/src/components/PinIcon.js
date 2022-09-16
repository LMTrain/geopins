import React from "react";
import PlaceTwoTone from "@material-ui/icons/PlaceTwoTone";

export default ({ size, color, onClick}) => (
    <PlaceTwoTone onClick={onClick} styles={{ fontSize: size, color }} />

);
