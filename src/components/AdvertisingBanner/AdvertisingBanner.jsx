import React, { useEffect } from "react";
import { Typography } from "@mui/material";

// INTERNAL IMPORT
import Style from "./AdvertisingBanner.module.css";

function AdvertisingBanner() {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  if (process.env.NODE_ENV !== "production") {
    return (
      <Typography
        className={`${Style.banner} ${Style.bannerDevelopment}`}
        variant="subtitle2"
        color="text.secondary"
      >
        광고 표시 영역
      </Typography>
    );
  }

  return (
    <div className={Style.bannerContainer}>
      <ins
        className={`adsbygoogle ${Style.banner}`}
        data-ad-client="ca-pub-1919598055512436"
        data-ad-slot="1678485541"
      />
    </div>
  );
}

export default AdvertisingBanner;
