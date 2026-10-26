const DEFAULT_COREOR_ID_URL = "https://id.coreor.net"
const DEFAULT_COREOR_API_URL = "https://api.coreor.net"

export const COREOR_ADMIN_PERMISSION = "*"

type CoreorUser = {
  id?: string | number
  username?: string
  email?: string
  permissions?: string[]
  [key: string]: unknown
}

type CoreorMeResponse = {
  status?: string
  data?: CoreorUser
  message?: string
}

export type CoreorAdminSession =
  | {
      status: "authorized"
      user: CoreorUser
      permissions: string[]
      identity: string | null
    }
  | {
      status: "forbidden"
      user: CoreorUser | null
      permissions: string[]
      identity: string | null
    }
  | { status: "unauthenticated" }
  | { status: "error" }

function normalizeBaseUrl(value: string | undefined, fallback: string) {
  return (value || fallback).replace(/\/$/, "")
}

export function getCoreorIdUrl() {
  return normalizeBaseUrl(process.env.COREOR_ID_URL, DEFAULT_COREOR_ID_URL)
}

export function getCoreorApiUrl() {
  return normalizeBaseUrl(
    process.env.COREOR_API_URL || process.env.COREOR_API_BASE,
    DEFAULT_COREOR_API_URL,
  )
}

export function getCoreorTokenUrl() {
  return process.env.COREOR_OAUTH_TOKEN_URL || `${getCoreorApiUrl()}/v2/oauth2/token`
}

export function sanitizeNextPath(value: string | null | undefined, fallback = "/admin/contact") {
  if (!value) return fallback

  try {
    const base = new URL("https://coreor.local")
    const resolved = new URL(value, base)

    if (resolved.origin !== base.origin || !resolved.pathname.startsWith("/")) {
      return fallback
    }

    return `${resolved.pathname}${resolved.search}${resolved.hash}`
  } catch {
    return fallback
  }
}

export async function getCoreorAdminSession(accessToken: string | null | undefined): Promise<CoreorAdminSession> {
  if (!accessToken) return { status: "unauthenticated" }

  try {
    const response = await fetch(`${getCoreorApiUrl()}/v1/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    })

    if (response.status === 401) {
      return { status: "unauthenticated" }
    }

    const json = (await response.json().catch(() => null)) as CoreorMeResponse | null

    if (response.status === 403) {
      return {
        status: "forbidden",
        user: json?.data || null,
        permissions: [],
        identity: null,
      }
    }

    if (!response.ok || json?.status !== "success" || !json.data) {
      return { status: "error" }
    }

    const permissions = Array.isArray(json.data.permissions)
      ? json.data.permissions.filter((permission): permission is string => typeof permission === "string")
      : []
    const identity =
      typeof json.data.username === "string" && json.data.username.trim()
        ? json.data.username
        : typeof json.data.email === "string" && json.data.email.trim()
          ? json.data.email
          : null

    if (!permissions.includes(COREOR_ADMIN_PERMISSION)) {
      return {
        status: "forbidden",
        user: json.data,
        permissions,
        identity,
      }
    }

    return {
      status: "authorized",
      user: json.data,
      permissions,
      identity,
    }
  } catch {
    return { status: "error" }
  }
}
