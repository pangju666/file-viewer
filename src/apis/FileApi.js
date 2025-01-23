import { get, post } from "@/apis/base.js";
import { StringUtils } from "pangju-utils";
import { computeApiSignature } from "@/utils/utils.js";

export class FileApi {
    static getInfo(fileMd5) {
        const timestamp = new Date().getTime();
        return get(
            `${import.meta.env.VITE_BASE_FILE_API_URL}/file/${fileMd5}`,
            {},
            {
                "Api-Signature": computeApiSignature(
                    import.meta.env.VITE_FILE_APP_ID,
                    import.meta.env.VITE_FILE_APP_SECRET_KEY,
                    `${import.meta.env.VITE_BASE_FILE_API_URL}/file/${fileMd5}`,
                    timestamp,
                ),
                "Api-App-Id": import.meta.env.VITE_FILE_APP_ID,
                "Api-Timestamp": timestamp,
            },
        );
    }

    static getDownloadUrl(fileMd5, placeholder = true) {
        if (StringUtils.isBlank(fileMd5)) {
            return "";
        }
        const url = `${import.meta.env.VITE_BASE_FILE_API_URL}/file/download/${fileMd5}?placeholder=${placeholder}`;
        const appId = import.meta.env.VITE_FILE_APP_ID;
        const secretKey = import.meta.env.VITE_FILE_APP_SECRET_KEY;
        return `${url}&apiAppId=${appId}&apiSignature=${computeApiSignature(appId, secretKey, url)}`;
    }

    static getImagePreviewUrl(fileMd5, placeholder = true) {
        if (StringUtils.isBlank(fileMd5)) {
            return "";
        }
        return `${import.meta.env.VITE_BASE_FILE_API_URL}/image/preview/${fileMd5}?placeholder=${placeholder}`;
    }

    static getModelDownloadCode() {
        const timestamp = new Date().getTime();
        return post(
            `${import.meta.env.VITE_BASE_FILE_API_URL}/model/download/code`,
            {},
            {},
            {
                "Api-Signature": computeApiSignature(
                    import.meta.env.VITE_FILE_APP_ID,
                    import.meta.env.VITE_FILE_APP_SECRET_KEY,
                    `${import.meta.env.VITE_BASE_FILE_API_URL}/model/download/code`,
                    timestamp,
                ),
                "Api-App-Id": import.meta.env.VITE_FILE_APP_ID,
                "Api-Timestamp": timestamp,
            },
        );
    }

    static getModelDownloadUrl(fileMd5, filename, downloadCode) {
        return `${import.meta.env.VITE_BASE_FILE_API_URL}/model/download/${encodeURIComponent(
            downloadCode,
        )}/${fileMd5}/${encodeURIComponent(filename)}`;
    }

    static getModelDownloadRootUrl(fileMd5, downloadCode) {
        return `${import.meta.env.VITE_BASE_FILE_API_URL}/model/download/${encodeURIComponent(
            downloadCode,
        )}/${fileMd5}/`;
    }

    static getSphereCubeUrl(fileMd5, direction, placeholder = true) {
        if (StringUtils.isBlank(fileMd5)) {
            return "";
        }
        const url = `${import.meta.env.VITE_BASE_FILE_API_URL}/sphere/cube/${fileMd5}/${direction}?placeholder=${placeholder}`;
        const appId = import.meta.env.VITE_SPHERE_FILE_APP_ID;
        const secretKey = import.meta.env.VITE_SPHERE_FILE_APP_SECRET_KEY;
        return `${url}&apiAppId=${appId}&apiSignature=${computeApiSignature(appId, secretKey, url)}`;
    }
}
