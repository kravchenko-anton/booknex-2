import { errorToast } from '@/utils/toast';
export var ReaderMessageType;
(function (ReaderMessageType) {
    ReaderMessageType["Scroll"] = "scroll";
    ReaderMessageType["SelectionLimitFail"] = "selection-limit-fail";
    ReaderMessageType["FinishLoading"] = "finish-loading";
    ReaderMessageType["FinishBook"] = "finishBook";
})(ReaderMessageType || (ReaderMessageType = {}));
export const useReaderMessage = ({ onFinishBookPress, onContentLoadEnd, onScroll, finishReadingLoading }) => {
    const onMessage = async (event) => {
        const parsedEvent = JSON.parse(event.nativeEvent.data);
        const { type, payload } = parsedEvent;
        console.log(type, payload);
        if (type === ReaderMessageType.FinishLoading) {
            console.log('Finish loading');
            onContentLoadEnd();
        }
        if (type === ReaderMessageType.SelectionLimitFail)
            errorToast('Selected text is too long');
        if (type === ReaderMessageType.Scroll)
            onScroll({
                scrollTop: payload.scrollTop,
                progress: payload.progress,
                chapter: {
                    chapterLink: payload.chapter.chapterLink,
                    chapterProgress: payload.chapter.chapterProgress
                }
            });
        if (type === ReaderMessageType.FinishBook) {
            if (finishReadingLoading)
                return;
            onFinishBookPress();
        }
    };
    return {
        onMessage
    };
};
//# sourceMappingURL=useReaderMessage.js.map