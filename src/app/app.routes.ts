import { Routes } from '@angular/router';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { AccountEditComponent } from './components/account-edit/account-edit.component';
import { AccountComponent } from './components/account/account.component';
import { AccountAddComponent } from './components/account-add/account-add.component';
import { MoreComponent } from './pages/more/more.component';
import { FilterComponent } from './components/filter/filter.component';

export const routes: Routes = [
    { path: '', component: AccountsComponent },
    { path: 'account/details/:id', component: AccountEditComponent },
    { path: 'account/:action/:id', component: AccountAddComponent },
    { path: 'more', component: MoreComponent },
    { path: 'filter', component: FilterComponent }
];
