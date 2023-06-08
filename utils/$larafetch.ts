import {$fetch, FetchOptions, FetchError} from 'ofetch';

const CSRF_COOKIE = 'XSRF-TOKEN';
const CSRF_HEADER = 'X-XSRF-TOKEN';

interface ResponseMap {
    blob: Blob;
    text: string;
    arrayBuffer: ArrayBuffer;
}

type ResponseType = keyof ResponseMap | 'json';

type LarafetchOptions<R extends ResponseType> = FetchOptions<R> & {
    redirectIfNotAuthenticated?: boolean;
    redirectIfNotVerified?: boolean;
};

export async function $larafetch<T, R extends ResponseType = 'json'>(
    path: RequestInfo,
    {
        redirectIfNotAuthenticated = true,
        redirectIfNotVerified = true,
        ...options
    }: LarafetchOptions<R> = {}
) {
    const {API_BASE_URL, BASE_URL} = useRuntimeConfig().public;

    let token = useCookie(CSRF_COOKIE).value;


    // On client initiate a csrf request and get it from the cookie set by laravel
    if (
        process.client
        && ['post', 'delete', 'put', 'patch'].includes(options?.method?.toLowerCase() as string)
    ) {
        await initCsrf();

        // Cannot use nuxt composables such as useCookie after an async operation:
        // https://github.com/nuxt/framework/issues/5238
        token = getCookie(CSRF_COOKIE);
    }

    let headers: any = {
        ...options?.headers,
        ...(token && {[CSRF_HEADER]: token}),
        accept: 'application/json'
    };

    // Only add type json if not form data.
    if (!(options.body instanceof FormData)) {
        headers = {
            ...headers,
            'Content-Type': 'application/json'
        }
    }

    if (process.server) {
        headers = {
            ...headers,
            ...useRequestHeaders(['cookie']),
            referer: BASE_URL,
        };
    }

    try {
        return await $fetch<T, R>(path, {
            baseURL: API_BASE_URL,
            ...options,
            headers,
            credentials: 'include',
        });
    } catch (error) {
        if (!(error instanceof FetchError)) throw error;

        if (redirectIfNotAuthenticated && [401, 419].includes(error?.response?.status as number)) {
            await navigateTo('/');
        }

        if (redirectIfNotVerified && [409].includes(error?.response?.status as number)) {
            await navigateTo('/auth/verify');
        }

        throw error;
    }
}

async function initCsrf() {
    const {API_BASE_URL} = useRuntimeConfig().public;

    await $fetch('sanctum/csrf-cookie', {
        baseURL: API_BASE_URL,
        credentials: 'include',
    });
}

// https://github.com/axios/axios/blob/bdf493cf8b84eb3e3440e72d5725ba0f138e0451/lib/helpers/cookies.js
function getCookie(name: string) {
    const match = document.cookie.match(
        new RegExp('(^|;\\s*)(' + name + ')=([^;]*)')
    );
    return match ? decodeURIComponent(match[3]) : null;
}
