import _omitBy from 'lodash/omitBy'
import _isNil from 'lodash/isNil'

const defaultParserOptions = {
  omitNil: true
}

/**
 * Parse stringified query in window.location.search into VueRouter#query.
 * Used to construct VueRouter#query object
 * only when user perform full page request whose URL contains querystring.
 *
 * @example
 * const queryString = { page: "1" }
 * const parsed = parseQuery(queryString, { page: Number })
 * // Expected output
 * { page: 1 }
 */
function parseQuery (routeQuery, querySchema, options = defaultParserOptions) {
  if (!routeQuery || !Object.keys(routeQuery).length) {
    return undefined
  }

  // remove nil values (null or undefined)
  const source = options.omitNil
    ? _omitBy(routeQuery, _isNil)
    : routeQuery

  const result = Object
    .entries(source)
    .reduce((obj, [key, value]) => {
      const ctor = querySchema[key]
      if (typeof ctor === 'function') {
        // construct property value using provided schema
        // e.g. Number('1') => 1
        obj[key] = ctor(value)
      } else {
        // use raw querystring value if constructor for this key
        // is not provided
        obj[key] = value
      }
      return obj
    }, {})

  return result
}

export {
  parseQuery
}
