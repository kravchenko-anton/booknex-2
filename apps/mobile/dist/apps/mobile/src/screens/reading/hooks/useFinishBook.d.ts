interface FinishBookProperties {
    slug: string;
    onFinishComplete: () => void;
}
export declare const useFinishBook: ({ onFinishComplete, slug }: FinishBookProperties) => {
    onFinish: () => Promise<void>;
    finishReadingLoading: boolean;
};
export {};
