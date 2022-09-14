import { useDispatch } from "app/store";
import { rdxRemoveCookie, rdxSetCookie } from "features/cookies/cookiesSlice";

const useCookies = () => {
  const dispatch = useDispatch();

  const set = async (
    name: string,
    value: string,
    expire: string
  ): Promise<void> => {
    dispatch(rdxSetCookie({ name, value, expire }));
  };

  const get = async (name: string): Promise<string | undefined> => {
    const value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    return value ? unescape(value[2]) : undefined;
  };

  const remove = async (name: string): Promise<void> => {
    dispatch(rdxRemoveCookie(name));
  };

  return { set, get, remove };
};

export async function getCookies(name: string): Promise<string | undefined> {
  const value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return value ? unescape(value[2]) : undefined;
}
export default useCookies;
