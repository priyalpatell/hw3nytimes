import type { Article } from "../types/Article";

/**
 * Turns JSON news articles into Article object defined in Article.ts
 *
 * @params json - The Json object to be formated into Article object
 *
 * @returns A list of Articles object
 */

export function formatArticles(json: any): Article[] {
  const sections = ["main", "left", "right"];
  return json.map((item: any, index: number) => ({
    id: item.uri,
    section: sections[index % sections.length],
    headline: item.headline.main,
    snippet: item.snippet,
    image: item.multimedia?.default.url || undefined,
    caption: item.multimedia?.caption || undefined,
  }));
}
