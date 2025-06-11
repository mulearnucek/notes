export function getSubjectSlug(sub:string): string {
  return sub.toLowerCase().replace(/\s+/g, '-');
}
