/// <reference types="react" />
import type { FlatListProperties } from '@/ui/flatlist/types';
interface BannerListProperties<T> extends FlatListProperties<T> {
    title: string;
}
declare const BannerList: <T>({ title, data, style, ...properties }: BannerListProperties<T>) => import("react").JSX.Element | null;
export default BannerList;
