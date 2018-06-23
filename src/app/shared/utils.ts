import {Params} from '@angular/router';

export interface RouterStateUrl {
  url: string;
  projectId: string;
  params: Params;
  queryParams: Params;
}
