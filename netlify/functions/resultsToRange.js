module.exports = function resultsToRange(results = []) {
  return results.reduce((range, result) => [...range, [...Object.values(result)]], [])
}
