import { PROJECTS } from '../src/data/projects.js';
import { PRODUCTS } from '../src/data/products.js';

function assertUnique(items, label) {
  const ids = items.map((item) => item.id);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length) throw new Error(`${label} duplicate ids: ${[...new Set(duplicates)].join(', ')}`);
}

function required(items, fields, label) {
  const failures = [];
  for (const item of items) {
    for (const field of fields) {
      if (!item[field]) failures.push(`${item.id || '(no id)'} missing ${field}`);
    }
  }
  if (failures.length) throw new Error(`${label} validation failed:\n${failures.join('\n')}`);
}

assertUnique(PROJECTS, 'PROJECTS');
assertUnique(PRODUCTS, 'PRODUCTS');
required(PROJECTS, ['id', 'name', 'category', 'location', 'cover', 'description'], 'PROJECTS');
required(PRODUCTS, ['id', 'brand', 'name', 'description'], 'PRODUCTS');

console.log(`Data OK: ${PROJECTS.length} projects, ${PRODUCTS.length} products.`);
