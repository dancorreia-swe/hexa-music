import { Album } from './album.entity';

export abstract class AlbumRepository {
  abstract save(album: Album): Promise<void>;
  abstract findById(uuid: string): Promise<Album | null>;
  abstract delete(uuid: string): Promise<void>;
  abstract destroy(uuid: string): Promise<void>;
  abstract restore(uuid: string): Promise<void>;
}
