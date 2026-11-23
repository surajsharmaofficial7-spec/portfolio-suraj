import { getProjects } from "../lib/wp";
import Portfolio from "./Portfolio";

export default async function Home() {
  const projects = await getProjects();
  return <Portfolio projects={projects} />;
}
