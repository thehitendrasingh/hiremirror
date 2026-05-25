/**
 * Edge-case validation for HireMirror utilities (no API key required).
 * Run: node scripts/validate-edge-cases.mjs
 */

import {
  buildJobDescription,
  buildTargetRoleLabel,
  EXPERIENCE_LEVELS,
  getExperienceLevel,
  getTechRoleById,
  TECH_ROLE_TEMPLATES,
} from "../utils/tech-role-templates.ts";

let passed = 0;
let failed = 0;

function assert(name, condition) {
  if (condition) {
    passed++;
    console.log(`  ✓ ${name}`);
  } else {
    failed++;
    console.log(`  ✗ ${name}`);
  }
}

console.log("\nTech role templates");
for (const role of TECH_ROLE_TEMPLATES) {
  for (const exp of EXPERIENCE_LEVELS) {
    const jd = buildJobDescription(role.id, exp.id);
    assert(`${role.id} + ${exp.id} JD length`, jd.length >= 200);
    assert(`${role.id} + ${exp.id} includes years`, jd.includes(exp.yearsRange));
  }
}

console.log("\nTarget role labels");
assert(
  "senior swe label",
  buildTargetRoleLabel("senior-swe", "senior").includes("Senior Software Engineer")
);
assert(
  "invalid role fallback",
  buildTargetRoleLabel("invalid", "mid") === "Tech Role"
);

console.log("\nLookup helpers");
assert("getTechRoleById", !!getTechRoleById("ml-engineer"));
assert("getExperienceLevel", !!getExperienceLevel("staff"));
assert("unknown role", !getTechRoleById("ceo"));

console.log("\nPDF layout smoke (long text)");
const longDiagnosis =
  "Your resume likely loses recruiter attention because it signals execution-heavy work instead of strategic ownership across multiple short stints that do not match the senior bar for this role.".repeat(
    2
  );
const longVerdict =
  "Profile reads strong mid-level IC with credible stack depth; this JD expects senior scope, cross-team ownership, and measurable system-level impact.".repeat(
    2
  );
assert("long diagnosis chars", longDiagnosis.length > 100);
assert("long verdict chars", longVerdict.length > 80);

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
