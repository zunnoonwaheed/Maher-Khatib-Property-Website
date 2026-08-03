import fs from "node:fs";

const file = ".output/server/wrangler.json";

const json = JSON.parse(fs.readFileSync(file, "utf8"));

if (json.assets?.binding === "ASSETS") {
  json.assets.binding = "STATIC_ASSETS";
  fs.writeFileSync(file, JSON.stringify(json, null, 2));
  console.log("✓ Changed ASSETS → STATIC_ASSETS");
} else {
  console.log("No ASSETS binding found.");
}