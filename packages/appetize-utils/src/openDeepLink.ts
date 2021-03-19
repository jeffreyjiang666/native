import debounce from "lodash.debounce";
import { loadUrl } from "./iframeUtils";
import { sendMessage } from "./sessionUtils";

const undebouncedOpenDeepLink = (
    appetizeUrl: string,
    deepLinkUrl: string,
    storyParams: Record<string, any>
) => {
    loadUrl(appetizeUrl);
    const qsParams = new URLSearchParams(storyParams).toString();
    const newAppUrl = `${deepLinkUrl}?${qsParams}`;
    sendMessage({ type: "url", value: newAppUrl }, true);
};

export type OpenDeepLinkHandler = typeof undebouncedOpenDeepLink;
export const openDeepLink: OpenDeepLinkHandler = debounce(
    (
        appetizeUrl: string,
        deepLinkUrl: string,
        storyParams: Record<string, any>
    ) => {
        undebouncedOpenDeepLink(appetizeUrl, deepLinkUrl, storyParams);
    },
    400
);
