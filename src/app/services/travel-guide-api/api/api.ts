export * from './favorites.service';
import { FavoritesService } from './favorites.service';
export * from './publications.service';
import { PublicationsService } from './publications.service';
export * from './users.service';
import { UsersService } from './users.service';
export const APIS = [FavoritesService, PublicationsService, UsersService];
