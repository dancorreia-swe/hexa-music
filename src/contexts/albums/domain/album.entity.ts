import { JsonValue } from '@prisma/client/runtime/library';
import { v4 as uuidv4 } from 'uuid';

export type AlbumType = 'SINGLE' | 'EP' | 'ALBUM';

export interface AlbumPrimitives {
  id: string;
  userId: string;
  name: string;
  type: AlbumType;
  albumPic: string;
  collaborations?: JsonValue;
  releasedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class Album {
  constructor(private attributes: AlbumPrimitives) {}

  static create(
    attributes: Omit<
      AlbumPrimitives,
      'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
    >,
  ): Album {
    return new Album({
      ...attributes,
      id: uuidv4(),
      releasedAt: attributes.releasedAt || null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
  }

  toPrimitives(): AlbumPrimitives {
    return { ...this.attributes };
  }
}
