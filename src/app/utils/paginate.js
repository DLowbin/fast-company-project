export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  // зачем spred (...items)
  return [...items].splice(startIndex, pageSize);
}

// функцию не нужно импортировать ?
