import { Routes } from '@angular/router';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { AccountEditComponent } from './components/account-edit/account-edit.component';
import { AccountComponent } from './components/account/account.component';
import { AccountAddComponent } from './components/account-add/account-add.component';
import { MoreComponent } from './pages/more/more.component';
import { FilterComponent } from './components/filter/filter.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { AuthComponent } from './pages/auth/auth.component';

export const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'authN', component: AuthComponent },
    // { path: 'account', component: AccountsComponent },
    {
        path: 'account',
        loadChildren: () => import('./pages/accounts.module').then(m => m.AccountsModule) // Lazy load the account module
    },
    { path: 'account/details/:id', component: AccountEditComponent },
    { path: 'account/:action/:id', component: AccountAddComponent },
    { path: 'more', component: MoreComponent },
    { path: 'filter', component: FilterComponent }
];
