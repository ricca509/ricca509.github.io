import React from "react";
import Cta from "./";

export default { title: "Cta" };

export const button = () => <Cta type={Cta.types.button}>Click me</Cta>;

export const link = () => <Cta type={Cta.types.link}>Click me</Cta>;
