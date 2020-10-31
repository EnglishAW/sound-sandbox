export const getSearchParameter = (location: Location, parameterName) => {
    const params = new URLSearchParams(location.search)
    const value = params.get(parameterName)

    return value
}
