import { useTheme } from "@material-ui/core";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
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
          {t("cookie.banner.accept")}
        </Button>
      )}
      location="bottom"
      overlay={true}
      cookieName={COOKIE_NAME}
    >
      <Typography variant="body1" display="inline">
        {t("cookie.banner.text")}
      </Typography>
    </CookieConsent>
  );
}
