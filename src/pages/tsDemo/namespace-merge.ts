class Album {
   public label: Album.AlbumLabel;
}

namespace Album {
    export class AlbumLabel {
        public id = 'inner';
    }
}

const album = new Album();
const label = album.label;
const id = label.id;
