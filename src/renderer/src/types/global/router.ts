import type { TNode } from 'tdesign-vue-next';
import { RouteRecordRaw } from 'vue-router';

export type TRouter = RouteRecordRaw & {
  children?: TRouter[];
  meta?: Partial<{
    navigation: string;
    icon: TNode;
    requireAuth: boolean;
    activeMatched?: string;
    [key: string]: unknown;
  }>;
};
