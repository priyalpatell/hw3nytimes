/**
 * Retrieves articles from the NY Times pertaining to Davis and Sacramento
 *
 * @params body - The new content for the comment
 *
 * @returns A string containing the redacted parts of the data
 */
export function redactComment(oldBody: string, newBody: string) {
  let result = "";
  const maxLen = Math.max(oldBody.length, newBody.length);
  for (let i = 0; i < maxLen; i++) {
    if (oldBody[i] === newBody[i]) {
      result += oldBody[i] || newBody[i];
    } else {
      result += "\u2588";
    }
  }
  return result;
}
