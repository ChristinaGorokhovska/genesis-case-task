import React from "react";

export default function durationToMinutes(num: number) {
  return Math.ceil(num / 60);
}
