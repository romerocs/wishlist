
import supabase from "./supabase";
import cookie from "cookie";

export async function getUser(req) {

  const c = cookie.parse(req.headers.get('cookie') ?? "");
  if (!c.sbat) {
      return null
  }

  const { data: { user } } = await supabase.auth.getUser(c.sbat);

  if (!user || user.role !== "authenticated") {
      return null
  }
  return user
}

export async function isLoggedIn(req) {
  return await getUser(req) != null
}