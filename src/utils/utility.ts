export const transformFilters = (filters: Record<string, string[]>) => {
  const toSnakeCase = (str: string) =>
    str
    // Replace spaces and hyphens with underscores
    .replace(/[\s-]+/g, '_')
    // Insert underscore before uppercase letters (except the first letter)
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    // Convert the entire string to lowercase
    .toLowerCase();

  const flatFilters: Record<string, string[]> = {};
  for (const key in filters) {
    flatFilters[toSnakeCase(key)] = filters[key];
  }
  return flatFilters;
};

export function toSnakeCase(str: string): string {
  return str
    // Replace spaces and hyphens with underscores
    .replace(/[\s-]+/g, '_')
    // Insert underscore before uppercase letters (except the first letter)
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    // Convert the entire string to lowercase
    .toLowerCase();
}

export const toPascalCase = (input: string): string =>{
  console.log("check",input)
  return input
    .replace(/([a-z])([A-Z])/g, '$1 $2') // handle camelCase to separate words
    .replace(/[_\-\s]+/g, ' ')           // replace _, -, or multiple spaces with a single space
    .toLowerCase()                       // convert whole string to lowercase
    .split(' ')                          // split into words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize each word
    .join('');                           // join words to form PascalCase
}