import { useTheme } from "@material-ui/core";
import CookieConsent, {
  Cookies,
  getCookieConsentValue,
} from "react-cookie-consent";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button";
import { COOKIE_NAME } from "../../shared/utility";
import React, { useState } from "react";

export default function CookieConsentBanner(props) {
  const [cookieUseAccepted, setCookieUseAccepted] = useState(
    getCookieConsentValue(COOKIE_NAME) != null
  );
  const theme = useTheme();
  return cookieUseAccepted ? (
    null
  ) : (
    <CookieConsent
      ButtonComponent={() => (
        <Button
          style={{ margin: theme.spacing(2) }}
          onClick={() => {
            Cookies.set(COOKIE_NAME, true, { expires: 90 });
            setCookieUseAccepted(true);
          }}
          variant="contained"
          size="small"
        >
          Ok!
        </Button>
      )}
      location="bottom"
      overlay={true}
      cookieName={COOKIE_NAME}
    >
      <Typography variant="body1" display="inline">
        We use cookies
      </Typography>
    </CookieConsent>
  );
}
