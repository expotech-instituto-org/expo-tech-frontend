import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  let adminIsAuth = !!req.cookies.get("admin-token")?.value;
  let visitanteIsAuth = !!req.cookies.get("visitante-token")?.value;

  if (req.url.includes("/login")) {
    if (req.url.includes("/admin") && adminIsAuth) {
      return NextResponse.redirect(new URL("/admin/home", origin));
    }
    if (req.url.includes("/visitante") && visitanteIsAuth) {
      return NextResponse.redirect(new URL("/visitante/home", origin));
    }
    return NextResponse.next();
  }

  if (!visitanteIsAuth && pathname.includes("/visitante")) {
    const loginUrl = new URL("/visitante/login", origin);
    return NextResponse.redirect(loginUrl);
  }

  if (!adminIsAuth && pathname.includes("/admin")) {
    const homeUrl = new URL("/admin/login", origin);
    return NextResponse.redirect(homeUrl);
  }
}

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      const path = window.location.pathname;
      const loginPath = path.includes("/admin")
        ? "/admin/login"
        : "/visitante/login";
      NextResponse.redirect(new URL(loginPath));
    }
    return Promise.reject(error);
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
