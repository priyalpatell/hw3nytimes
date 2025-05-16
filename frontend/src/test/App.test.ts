import { test, expect, it, describe, assert } from "vitest";
import { render } from "@testing-library/svelte";
import App from "../App.svelte";
import { formatArticles } from "../lib/utils/formatArticles";
import { articles } from "./content";
import { queryArticles } from "../lib/utils/queryArticles";
import * as dotenv from "dotenv";
import { JSDOM } from "jsdom";
import ArtComp from "../lib/components/ArtComp.svelte";
import "@testing-library/jest-dom";

dotenv.config({ path: "../.env" });
let apiKey = String(process.env.NYT_API_KEY);

test("check for first article that values returned match expected output", async () => {
  try {
    const result = await queryArticles(apiKey, "Davis CA");
    if (result !== undefined) {
      expect("docs" in result);
      expect(result["docs"].length).toBeGreaterThan(0);
      expect("snippet" in result["docs"][0]);
      expect("multimedia" in result["docs"][0]);
      expect("headline" in result["docs"][0]);
    }
  } catch (error) {
    console.log(error);
  }
});

describe("check is news article and for Davis", () => {
  it("should have the key and value", async () => {
    try {
      const result = await queryArticles(apiKey, "Davis CA");
      if (result != undefined) {
        expect("docs" in result);
        expect(result["docs"].length).toBeGreaterThan(0);
        expect(result["docs"][0]).toHaveProperty("type_of_material", "News");
        expect(result["docs"][0]["keywords"].length).toBeGreaterThan(0);
        const output = result["docs"][0]["keywords"].some((obj: string) =>
          Object.values(obj).some(
            (value) => typeof value === "string" && value.includes("Davis")
          )
        );
        expect(output).toBe(true);
      }
    } catch (error) {
      console.log(error);
    }
  });
});

describe("check does not proceed if bad key", () => {
  it("should have the key and value", async () => {
    const result = await queryArticles("Bad-key", "Davis CA");
    if (result == undefined) {
      console.log("Error check: bad input");
    }
  });
});

test("check articles with additional fields are being stored and formatted correctly", () => {
  const result = formatArticles(articles);
  expect(result.length).toBeGreaterThan(0);
  expect("snippet" in result[0]);
  expect("multimedia" in result[0]);
  expect("headline" in result[0]);
});

describe("ArtComp", () => {
  it("should render the component", () => {
    const data = {
      headline: "Test Headline",
      snippet: "Test snippet text.",
      image: "https://example.com/image.jpg",
      caption: "Test caption",
    };

    const { getByText } = render(ArtComp, {
      props: {
        data,
      },
    });

    console.log(typeof document);

    expect(getByText("Test Headline")).toBeInTheDocument();
    expect(getByText("Test snippet text.")).toBeInTheDocument();
  });
});

describe("ArtComp", () => {
  it("should not render image if undefined", () => {
    const data = {
      headline: "No Image Headline",
      snippet: "No image here.",
      image: undefined,
      caption: "This should not appear",
    };

    const { getByText, queryByRole } = render(ArtComp, {
      props: { data },
    });

    expect(getByText("No Image Headline")).toBeTruthy();
    expect(queryByRole("img")).toBeNull();
  });
});
