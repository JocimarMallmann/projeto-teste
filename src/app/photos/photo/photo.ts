export interface Photo {

    id: number;
    postDate: Date;
    url: string;
    description: string;
    allowComments: boolean;
    likes: number;
    comments: number;
    userId: number;
    // Rename Symbol MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANO
    // Renomeia a propriedade em todo o projeto de uma vez só, Refactor de uma vez só
}
