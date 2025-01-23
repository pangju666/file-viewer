import Crypto from "crypto-js";
import { ObjectUtils } from "pangju-utils";

export function computeApiSignature(appId, secretKey, url, timestamp) {
    if (ObjectUtils.nonNull(timestamp)) {
        return Crypto.SHA1(
            `${appId}&${secretKey}&${encodeURIComponent(url)}&${timestamp}`,
        );
    }
    return Crypto.SHA1(`${appId}&${secretKey}&${encodeURIComponent(url)}`);
}
