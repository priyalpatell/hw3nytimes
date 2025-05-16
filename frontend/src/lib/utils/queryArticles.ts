/**
 * Retrieves articles from the NY Times pertaining to Davis and Sacramento
 *
 * @params key - The secret needed to access NY Times endpoint
 *
 * @returns A json object containing information for the all articles
 * @error Displays error code and message in the console
 */
export async function queryArticles(key: string, city: string) {
  let base_url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
  let filters = "fq=timesTag.location.contains:" + city;
  let query_url = base_url + filters + "&api-key=" + key;
  try {
    const response = await fetch(query_url);
    const result = await response.json();
    return result.response;
  } catch (error: any) {
    console.log("Error: ", error.message);
    return error;
  }
}
