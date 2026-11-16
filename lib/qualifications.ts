/**
 * Facts buyers check before they call: licence, bonding, insurance, safety record, references.
 * Only entries with a real value are shown. Leave a value empty until the real figure is confirmed;
 * never fill one in with an estimate.
 */
export const QUALIFICATIONS: { label: string; value: string }[] = [
  { label: "Repeat business", value: "80–90%" },
  { label: "Regions served", value: "Maryland, DC and Virginia" },
  { label: "Services under one roof", value: "Architecture, design-build and construction management" },
  // To be supplied by PDBS:
  { label: "Contractor licence numbers", value: "" },
  { label: "Years in business", value: "" },
  { label: "Bonding capacity", value: "" },
  { label: "Insurance limits", value: "" },
  { label: "Safety record (EMR)", value: "" },
  { label: "Certifications and memberships", value: "" },
];
