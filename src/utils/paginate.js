import lodash from "lodash";

//borrowed code from Code with Mosh React Tutorial
export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return lodash(items).slice(startIndex).take(pageSize).value();
}
