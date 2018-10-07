export const JUMP_TO = "JUMP_TO";

export function jumpTo(routeName, params, successRoute = null, backRoute = null) {
    return {
        type: JUMP_TO,
        payload: {
            routeName,
            params,
            successRoute,
            backRoute
        }
    };
}