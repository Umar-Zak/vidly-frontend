import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn: "https://0608ce02b06246b2b9af18866043b7dc@sentry.io/1885715"
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log
};
