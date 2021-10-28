const ALBUMS_API_URL = '/api/albums';

function getAlbums() {
  return fetch(ALBUMS_API_URL)
    .then(resp => resp.json());
}

function getAlbumById(id) {
  return fetch(`${ALBUMS_API_URL}/${id}`)
    .then(resp => resp.json())
    .then(resp => resp[0]);
}

export {
  getAlbums,
  getAlbumById
};