export const DASHBOARD = 'dashboard';


// return default URL if isAdmin/isSuperAdmin == true;
export function HOME(bool: boolean){
  if (bool) {
    return '/dashboard/admin/user-details';
  } else {
    return '/dashboard/my-inspections';
  }
}
// menu links
export const LOGIN = 'login';
export const MY_REPORTS = 'my-inspections';
export const TEAM_REPORTS = 'team-inspections';
export const PROFILE = 'profile';
export const SETTINGS = 'settings';
export const SEARCH = 'search';

export const CHANGE = '/change';

// all admin routes
export const ADMIN_USERS = 'admin/user-details';
export const ADMIN_TEAMS = 'admin/team-details';
export const ADMIN_REPORTS = 'admin/inspections';
export const ARCHIVED_USERS = 'admin/user-details/archived-users';
export const ARCHIVED_TEAMS = 'admin/team-details/archived-teams';
export const ARCHIVED_INSPECTIONS = 'admin/inspections/archived-inspections';

export const MANAGE_TEAM_ID = '/manage-team/:id';
export const TEAM_ID = '/:id';
export const INSPECTION_DETAILS = '/inspection-details/:id';
export const ELEMENT_ID = '/element/:id';
