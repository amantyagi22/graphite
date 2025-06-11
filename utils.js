const resolvers = {
  user: {
    name: "John Doe",
    mobile: "1234567890",
    email: "john@gmail.com",
    posts: [
      { title: "My First Post", author: "John" },
      { title: "Second Post", author: "John" },
    ],
  },
};

// Simple recursive parser that actually works
function parseQuery(query) {
  // Remove outer braces and whitespace
  const trimmed = query.trim().slice(1, -1).trim();

  const result = {};
  let i = 0;

  while (i < trimmed.length) {
    // Skip whitespace
    while (i < trimmed.length && /\s/.test(trimmed[i])) i++;
    if (i >= trimmed.length) break;

    // Get field name
    let fieldName = "";
    while (i < trimmed.length && /\w/.test(trimmed[i])) {
      fieldName += trimmed[i];
      i++;
    }

    // Skip whitespace
    while (i < trimmed.length && /\s/.test(trimmed[i])) i++;

    // Check if this field has nested fields
    if (i < trimmed.length && trimmed[i] === "{") {
      // Find matching closing brace
      let braceCount = 1;
      let start = i + 1;
      i++;

      while (i < trimmed.length && braceCount > 0) {
        if (trimmed[i] === "{") braceCount++;
        if (trimmed[i] === "}") braceCount--;
        i++;
      }

      // Recursively parse the nested part
      const nestedQuery = trimmed.slice(start, i - 1);
      result[fieldName] = parseQuery(`{${nestedQuery}}`);
    } else {
      // Simple field
      result[fieldName] = true;
    }
  }

  return result;
}

// Resolve the parsed query against data
function resolveQuery(parsedQuery, data) {
  const result = {};

  for (const [fieldName, fieldValue] of Object.entries(parsedQuery)) {
    if (!data || !data.hasOwnProperty(fieldName)) {
      continue;
    }

    const fieldData = data[fieldName];

    if (fieldValue === true) {
      // Simple field - just return the value
      result[fieldName] = fieldData;
    } else if (Array.isArray(fieldData)) {
      // Array field - resolve each item
      result[fieldName] = fieldData.map((item) =>
        resolveQuery(fieldValue, item),
      );
    } else if (typeof fieldData === "object") {
      // Object field - resolve nested
      result[fieldName] = resolveQuery(fieldValue, fieldData);
    }
  }

  return result;
}

// Main function that does everything
export const parseQueryString = (queryString) => {
  const parsed = parseQuery(queryString);
  return resolveQuery(parsed, resolvers);
};
