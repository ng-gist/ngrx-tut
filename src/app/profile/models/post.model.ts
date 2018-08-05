import {PostMetaModel} from './postMeta.model';

export interface PostModel extends PostMetaModel {
  net_votes: number;
  pending_payout_value: string;
  body: string;
  title: string;
  category: string;
  active_votes: Object[];
}
