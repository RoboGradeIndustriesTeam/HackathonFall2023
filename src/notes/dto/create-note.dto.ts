export interface CreateNoteDto {
    name: string;
    body: string;
    subtitle: string;
    theme: string;
}

export interface CreateAnonymousNoteDto extends CreateNoteDto {
    authorName: string;
    burnable: boolean;

}