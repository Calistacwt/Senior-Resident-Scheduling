import { ParsedLocation } from "@tanstack/react-router";
import { RouteContext } from "@/types/route";

export default function (context: RouteContext, _location?: ParsedLocation) {
  return context;
}
