const graphQlEndpoint = 'http://localhost:3001/graphql';

const handleResponse = response => {
    if (response.ok) {
        return response.json();
    }
};

const executeGqlQuery = (query, variables = {}) => {
    return fetch(graphQlEndpoint, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables })
    }).then(handleResponse);
};

const executeAuthorizedGqlQuery = (token, query, variables = {}) => {
    return fetch(graphQlEndpoint, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ query, variables })
    }).then(handleResponse);
};

const refreshToken = () => {
    return fetch('http://localhost:3001/api/refreshtoken', {
        method: 'GET',
        credentials: 'include'
    }).then(handleResponse);
};

export { executeGqlQuery, executeAuthorizedGqlQuery, refreshToken };
