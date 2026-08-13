const REFERRAL_KEY = 'turingwings_referral';
const CAPTURE_KEY = 'turingwings_referral_captured';
const DEFAULT_ATTRIBUTION_DAYS = 30;

function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = `${name}=${encodeURIComponent(value || '')}${expires}; path=/; SameSite=Lax`;
}

function getCookie(name) {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
}

export function setReferralCode(code, creatorName = '', attributionDays = DEFAULT_ATTRIBUTION_DAYS) {
  if (!code) return;
  const cleanCode = code.trim().toUpperCase();
  const timestamp = Date.now();
  const expiryTimestamp = timestamp + attributionDays * 24 * 60 * 60 * 1000;

  const data = {
    code: cleanCode,
    creatorName,
    timestamp,
    expiryTimestamp,
  };

  try {
    localStorage.setItem(REFERRAL_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('[ReferralStorage] localStorage not available:', e);
  }

  setCookie(REFERRAL_KEY, cleanCode, attributionDays);
}

export function getReferralCode() {
  try {
    const raw = localStorage.getItem(REFERRAL_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (data && data.code && data.expiryTimestamp && Date.now() < data.expiryTimestamp) {
        return data.code;
      }
    }
  } catch (e) {
    // fallback to cookie
  }

  const cookieVal = getCookie(REFERRAL_KEY);
  return cookieVal || null;
}

export function markEmailCaptured(email) {
  try {
    localStorage.setItem(CAPTURE_KEY, JSON.stringify({ email, timestamp: Date.now() }));
  } catch (e) {}
  setCookie(CAPTURE_KEY, '1', 365);
}

export function isEmailCaptured() {
  try {
    const raw = localStorage.getItem(CAPTURE_KEY);
    if (raw) return true;
  } catch (e) {}
  return Boolean(getCookie(CAPTURE_KEY));
}

export function clearReferral() {
  try {
    localStorage.removeItem(REFERRAL_KEY);
  } catch (e) {}
  setCookie(REFERRAL_KEY, '', -1);
}
