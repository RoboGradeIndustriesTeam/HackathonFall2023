export interface CreateNoteDto {
    name: string;
    body: string;
    subtitle: string;
}

export interface CreateAnonymousNoteDto extends CreateNoteDto {
    authorName: string;

}