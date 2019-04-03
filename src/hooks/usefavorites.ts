import { AssetVersionItem } from '../containers/AssetVersionGenerator';
import useLocalStorage from './useLocalStorage';

export interface Favorite {
  id: string;
  title: string;
  date: Date;
  item: AssetVersionItem;
}

const useFavorites = () => {
  const [favorites, setFavorites] = useLocalStorage('__favorites__', []);

  const add = (data: Favorite) => setFavorites([...favorites, ...[data]]);

  const remove = (id: string) =>
    setFavorites(favorites.filter((x: Favorite) => x.id !== id));

  const updateById = (newData: Favorite, id: string) =>
    setFavorites(
      favorites.map((favorite: Favorite) =>
        favorite.id === id ? { ...favorite, ...newData } : favorite
      )
    );

  return [favorites, add, remove, updateById];
};

export default useFavorites;
