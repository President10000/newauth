// utils/cookieUtils.js

export function clearCookies() {
  // Clear the "token" cookie by setting an expired date
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // Add more cookie clearing logic as needed for other cookies
}
