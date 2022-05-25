//to declare all required variables
export class GridViewModel {
    imageName: string;
    fileName: string;
    fileSize: string;

    constructor(gridViewResponse?: GridViewModel) {
        Object.assign(this, gridViewResponse);
    }
}
