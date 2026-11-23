// Demo data: WordPress connect na ho to ye dikhega
const fallback = [
  { title: "Modern Edge", projectDetails: { description: "Responsive business website designed and developed end to end.", tags: "WordPress, Elementor, HTML/CSS", liveUrl: "https://modernedge.in" } },
  { title: "Sunshine Seeds", projectDetails: { description: "Responsive layouts with a focus on a smooth user experience.", tags: "WordPress, UX, Responsive", liveUrl: "https://sunshineseeds.in" } },
  { title: "Upliquidation", projectDetails: { description: "Responsive web pages with custom-built Elementor sections.", tags: "Elementor, Custom sections", liveUrl: "https://upliquidation.com" } },
  { title: "Brand Builder Studio", projectDetails: { description: "Brand-led web presence for a creative studio.", tags: "Branding, Web design", liveUrl: "https://brandbuilder.studio" } },
];

export async function getProjects() {
  const url = process.env.WP_GRAPHQL_URL;
  if (!url) return fallback;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{ projects(first: 10, where:{orderby:{field:DATE, order:ASC}}) { nodes { title projectDetails { description tags liveUrl } } } }`,
      }),
      next: { revalidate: 60 },
    });
    const json = await res.json();
    const nodes = json?.data?.projects?.nodes;
    return nodes && nodes.length ? nodes : fallback;
  } catch (e) {
    return fallback;
  }
}
