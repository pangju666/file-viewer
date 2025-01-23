import axios from "axios";
import { StringUtils } from "pangju-utils";
import { createDiscreteApi, lightTheme } from "naive-ui";

const binaryTypes = ["blob", "arraybuffer", "stream"];

const { notification } = createDiscreteApi(["message", "notification"], {
    configProviderProps: {
        theme: lightTheme,
    },
});

const apiAxiosConfig = {
    timeout: 60 * 1000,
    crossDomain: true,
};
const apiAxios = axios.create(apiAxiosConfig);

apiAxios.interceptors.request.use(
    (requestConfig) => {
        if (StringUtils.isBlank(requestConfig.url)) {
            return Promise.reject(new Error("请求缺少url"));
        }
        return requestConfig;
    },
    (error) => Promise.reject(error),
);
apiAxios.interceptors.response.use(
    (res) => {
        if (binaryTypes.includes(res.config.responseType)) {
            return res;
        }
        if (res.data?.code < 0) {
            notification.error({ content: res.data?.message });
            return Promise.reject(new Error(res.data?.message));
        }
        return res.data?.data;
    },
    (error) => {
        if (
            error.code === "ECONNABORTED" &&
            error.message.includes("timeout")
        ) {
            notification.warning({
                content: "请求超时, 请刷新重试",
            });
        } else {
            notification.error({ content: error.response.data?.message });
            return Promise.reject(error);
        }
    },
);

export function get(url, params = {}, headers = {}, callback = () => {}) {
    try {
        return apiAxios.get(url, { params, headers });
    } catch (error) {
        callback(error);
    }
}

export function post(
    url,
    data = {},
    params = {},
    headers = {},
    callback = () => {},
) {
    try {
        return apiAxios.post(url, data, { params, headers });
    } catch (error) {
        callback(error);
    }
}

export function timeoutPost(
    url,
    data = {},
    params = {},
    headers = {},
    timeout = 60 * 1000 * 10,
    callback = () => {},
) {
    try {
        return apiAxios.post(url, data, { params, headers, timeout });
    } catch (error) {
        callback(error);
    }
}

export function del(
    url,
    data = {},
    params = {},
    headers = {},
    callback = () => {},
) {
    try {
        return apiAxios.delete(url, { data, params, headers });
    } catch (error) {
        callback(error);
    }
}

export function put(
    url,
    data = {},
    params = {},
    headers = {},
    callback = () => {},
) {
    try {
        return apiAxios.put(url, data, { params, headers });
    } catch (error) {
        callback(error);
    }
}

const fileApiAxiosConfig = {
    // 请求超时时间设置
    timeout: 1000 * 60 * 60,
    crossDomain: true,
};
const fileAxios = axios.create(fileApiAxiosConfig);

export function getDownload(
    url,
    params = {},
    headers = {},
    onDownloadProgress,
) {
    return fileAxios.get(url, {
        params,
        headers,
        responseType: "blob",
        onDownloadProgress,
    });
}

export function postDownload(
    url,
    data = {},
    params = {},
    headers = {},
    onDownloadProgress,
) {
    return fileAxios.post(url, data, {
        responseType: "blob",
        params: params,
        headers,
        onDownloadProgress,
    });
}
