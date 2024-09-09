import { IsNotEmpty, IsUUID } from "class-validator";

export class DeleteAlbumHttpDto {
    @IsNotEmpty()
    @IsUUID()
    id: string;
}