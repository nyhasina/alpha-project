import { Platform } from './platform.interface';

export interface Game {
    id: number;
    name: string;
    coverImage?: string;
    platforms?: Platform[];
}
